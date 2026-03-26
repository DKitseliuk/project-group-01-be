import createHttpError from 'http-errors';
import { Feedback } from '../models/feedback.js';
import { Location } from '../models/location.js';

const attachLocation = (feedbacks, locationLean) =>
  feedbacks.map((f) => ({
    ...f,
    locationId: locationLean,
  }));

// sortBy path: feedbacks are linked via location.feedbacksId, so we sort the loaded set in memory before slicing the page
const sortFeedbacks = (items, sortBy, sortOrder) => {
  const mult = sortOrder === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    if (sortBy === 'rate') {
      return mult * (a.rate - b.rate);
    }
    const ta = new Date(a.createdAt || 0).getTime();
    const tb = new Date(b.createdAt || 0).getTime();
    return mult * (ta - tb);
  });
};

export const getFeedbacksByLocation = async (locationId, query = {}) => {
  const {
    page = 1,
    perPage = 3,
    sortBy,
    sortOrder = 'desc',
  } = query;

  const skip = (page - 1) * perPage;

  const location = await Location.findById(locationId).lean();
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  const ids = (location.feedbacksId || []).map((id) => String(id));

  let pageFeedbacks;
  let totalFeedbacks;

  if (sortBy) {
    const all = await Feedback.find({ _id: { $in: ids } }).lean();
    const sorted = sortFeedbacks(all, sortBy, sortOrder);
    totalFeedbacks = sorted.length;
    pageFeedbacks = sorted.slice(skip, skip + perPage);
  } else {
    totalFeedbacks = ids.length;
    const pageIds = ids.slice(skip, skip + perPage);
    const raw = await Feedback.find({ _id: { $in: pageIds } }).lean();
    const byId = new Map(raw.map((f) => [String(f._id), f]));
    pageFeedbacks = pageIds.map((id) => byId.get(id)).filter(Boolean);
  }

  const totalPages = Math.ceil(totalFeedbacks / perPage) || 0;

  return {
    page,
    perPage,
    totalFeedbacks,
    totalPages,
    feedbacks: attachLocation(pageFeedbacks, location),
  };
};

export const createFeedback = async (user, { locationId, rate, description }) => {
  const location = await Location.findById(locationId).lean();
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  const userName = user.name;

  const feedback = await Feedback.create({
    locationId,
    rate,
    description,
    userName,
  });

  // Keep location.feedbacksId in sync with DB seed shape; GET lists feedbacks from this array
  await Location.findByIdAndUpdate(locationId, {
    $push: { feedbacksId: feedback._id },
  });

  const created = await Feedback.findById(feedback._id).lean();
  
  const feedbackWithLocation = attachLocation([created], location)[0];

  return feedbackWithLocation;
};
