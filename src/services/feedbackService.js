import { Feedback } from '../models/feedback.js';

export const findFeedbacks = ({ filter, sort, skip, limit }) => {
  return Feedback.find(filter).sort(sort).skip(skip).limit(limit);
};

export const countFeedbacks = ({ filter }) => {
  return Feedback.countDocuments(filter);
};

export const createFeedback = (payload) => {
  return Feedback.create(payload);
};
