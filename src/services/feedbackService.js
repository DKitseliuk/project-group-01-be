import createHttpError from 'http-errors';
import { Feedback } from '../models/feedback.js';
import { Location } from '../models/location.js';

const FEEDBACK_SORT_BY_CREATED_AT = { createdAt: -1 };

// --- Optional in-memory sortBy (createdAt | rate) was out of original task scope; pagination only was required.
// Kept commented for potential future re-enable alongside query params. ---
// const attachLocation = (feedbacks, locationLean) =>
//   feedbacks.map((f) => ({
//     ...f,
//     locationId: locationLean,
//   }));
//
// const sortFeedbacks = (items, sortBy, sortOrder) => {
//   const mult = sortOrder === 'asc' ? 1 : -1;
//   return [...items].sort((a, b) => {
//     if (sortBy === 'rate') {
//       return mult * (a.rate - b.rate);
//     }
//     const ta = new Date(a.createdAt || 0).getTime();
//     const tb = new Date(b.createdAt || 0).getTime();
//     return mult * (ta - tb);
//   });
// };
//
// export const getFeedbacksByLocation = async (locationId, query = {}) => {
//   const {
//     page = 1,
//     perPage = 3,
//     sortBy,
//     sortOrder = 'desc',
//   } = query;
//   const skip = (page - 1) * perPage;
//   const location = await Location.findById(locationId).lean();
//   if (!location) {
//     throw createHttpError(404, 'Location not found');
//   }
//   const ids = (location.feedbacksId || []).map((id) => String(id));
//   let pageFeedbacks;
//   let totalFeedbacks;
//   if (sortBy) {
//     const all = await Feedback.find({ _id: { $in: ids } }).lean();
//     const sorted = sortFeedbacks(all, sortBy, sortOrder);
//     totalFeedbacks = sorted.length;
//     pageFeedbacks = sorted.slice(skip, skip + perPage);
//   } else {
//     totalFeedbacks = ids.length;
//     const pageIds = ids.slice(skip, skip + perPage);
//     const raw = await Feedback.find({ _id: { $in: pageIds } }).lean();
//     const byId = new Map(raw.map((f) => [String(f._id), f]));
//     pageFeedbacks = pageIds.map((id) => byId.get(id)).filter(Boolean);
//   }
//   const totalPages = Math.ceil(totalFeedbacks / perPage) || 0;
//   return {
//     page,
//     perPage,
//     totalFeedbacks,
//     totalPages,
//     feedbacks: attachLocation(pageFeedbacks, location),
//   };
// };

export const getLocation = async (locationId) => {
  const location = await Location.findById(locationId);
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }
  return location;
};

// Legacy feedbacks may omit locationId and only appear on location.feedbacksId; new rows set locationId.
const buildLocationFeedbacksFilter = (locationId, feedbacksIdRefs = []) => ({
  $or: [{ locationId }, { _id: { $in: feedbacksIdRefs } }],
});

export const getFeedbacksForLocation = (
  locationId,
  feedbacksIdRefs,
  skip,
  limit,
) => {
  return Feedback.find(buildLocationFeedbacksFilter(locationId, feedbacksIdRefs))
    .sort(FEEDBACK_SORT_BY_CREATED_AT)
    .skip(skip)
    .limit(limit);
};

export const countFeedbacksForLocation = (locationId, feedbacksIdRefs) => {
  return Feedback.countDocuments(
    buildLocationFeedbacksFilter(locationId, feedbacksIdRefs),
  );
};

export const getLatestFeedbacks = (skip, limit) => {
  return Feedback.find({})
    .sort(FEEDBACK_SORT_BY_CREATED_AT)
    .skip(skip)
    .limit(limit);
};

export const countAllFeedbacks = () => {
  return Feedback.countDocuments({});
};

export const createFeedback = async (user, { locationId, rate, description }) => {
  const location = await Location.findById(locationId);
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

  await Location.findByIdAndUpdate(locationId, {
    $push: { feedbacksId: feedback._id },
  });

  return Feedback.findById(feedback._id);
};
