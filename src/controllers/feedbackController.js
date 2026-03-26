import * as feedbackService from '../services/feedbackService.js';

export const getFeedbacks = async (req, res) => {
  const { locationId, page, perPage, sortBy, sortOrder } = req.query;

  const data = await feedbackService.getFeedbacksByLocation(locationId, {
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.status(200).json(data);
};

export const createFeedback = async (req, res) => {
  const feedback = await feedbackService.createFeedback(req.user, {
    locationId: req.query.locationId,
    rate: req.body.rate,
    description: req.body.description,
  });

  res.status(201).json(feedback);
};
