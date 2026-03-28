import createHttpError from 'http-errors';
import * as feedbackService from '../services/feedbackService.js';
import locationsService from '../services/locationsService.js';
import { FEEDBACK_PAGINATION } from '../constants/pagination.js';
import { getPagination } from '../helpers/pagination.js';

const normalizeFeedbackIdRefs = (feedbacksId) =>
  (feedbacksId || []).map((ref) => (ref && ref._id ? ref._id : ref));

// --- Optional in-memory sortBy (createdAt | rate) was out of original task scope; pagination only was required.
// Kept commented for potential future re-enable alongside query params. ---
// const attachLocation = (feedbacks, locationDoc) =>
//   feedbacks.map((f) => ({
//     ...f,
//     location: locationDoc,
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
//   const location = await locationsService.getLocationById(locationId);
//   if (!location) {
//     throw createHttpError(404, 'Location not found');
//   }
//   const ids = normalizeFeedbackIdRefs(location.feedbacksId).map((id) => String(id));
//   let pageFeedbacks;
//   let totalFeedbacks;
//   if (sortBy) {
//     const all = await feedbackService.findFeedbacks({
//       filter: { _id: { $in: ids } },
//       skip: 0,
//       limit: Math.max(ids.length, 1),
//     });
//     const sorted = sortFeedbacks(all, sortBy, sortOrder);
//     totalFeedbacks = sorted.length;
//     pageFeedbacks = sorted.slice(skip, skip + perPage);
//   } else {
//     totalFeedbacks = ids.length;
//     const pageIds = ids.slice(skip, skip + perPage);
//     const raw = await feedbackService.findFeedbacks({
//       filter: { _id: { $in: pageIds } },
//       skip: 0,
//       limit: pageIds.length,
//     });
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

export const getLocationFeedbacks = async (req, res) => {
  const { locationId } = req.params;
  const { page, perPage, skip, limit } = getPagination(
    req.query,
    FEEDBACK_PAGINATION,
  );

  const location = await locationsService.getLocationById(locationId);
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }
  const feedbacksIdRefs = normalizeFeedbackIdRefs(location.feedbacksId);
  const filter = { _id: { $in: feedbacksIdRefs } };

  const [feedbacks, totalFeedbacks] = await Promise.all([
    feedbackService.findFeedbacks({ filter, skip, limit }),
    feedbackService.countFeedbacks({ filter }),
  ]);

  const totalPages = Math.ceil(totalFeedbacks / perPage);

  res.status(200).json({
    page,
    perPage,
    totalPages,
    totalFeedbacks,
    feedbacks,
  });
};

export const getAllFeedbacks = async (req, res) => {
  const { page, perPage, skip, limit } = getPagination(
    req.query,
    FEEDBACK_PAGINATION,
  );

  const filter = {};

  const [feedbacks, totalFeedbacks] = await Promise.all([
    feedbackService.findFeedbacks({ filter, skip, limit }),
    feedbackService.countFeedbacks({ filter }),
  ]);

  const totalPages = Math.ceil(totalFeedbacks / perPage);

  res.status(200).json({
    page,
    perPage,
    totalPages,
    totalFeedbacks,
    feedbacks,
  });
};

export const createFeedback = async (req, res) => {
  const { locationId } = req.params;
  const location = await locationsService.getLocationById(locationId);
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  const payload = {
    rate: req.body.rate,
    description: req.body.description,
    userName: req.user.name,
    locationId,
  };

  const feedback = await feedbackService.createFeedback(payload);

  res.status(201).json(feedback);
};
