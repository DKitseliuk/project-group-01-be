import * as feedbackService from '../services/feedbackService.js';
import { FEEDBACK_PAGINATION } from '../constants/pagination.js';
import { getPagination } from '../helpers/pagination.js';

export const getLocationFeedbacks = async (req, res) => {
  const { locationId } = req.params;
  const { page, perPage, skip, limit } = getPagination(
    req.query,
    FEEDBACK_PAGINATION,
  );

  const location = await feedbackService.getLocation(locationId);
  const feedbacksIdRefs = location.feedbacksId || [];

  const [feedbacks, totalFeedbacks] = await Promise.all([
    feedbackService.getFeedbacksForLocation(
      locationId,
      feedbacksIdRefs,
      skip,
      limit,
    ),
    feedbackService.countFeedbacksForLocation(locationId, feedbacksIdRefs),
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

  const [feedbacks, totalFeedbacks] = await Promise.all([
    feedbackService.getLatestFeedbacks(skip, limit),
    feedbackService.countAllFeedbacks(),
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
  const feedback = await feedbackService.createFeedback(req.user, {
    locationId: req.params.locationId,
    rate: req.body.rate,
    description: req.body.description,
  });

  res.status(201).json(feedback);
};
