import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    locationId: Joi.string().trim().custom(objectIdValidator).required(),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(10).default(3),
    sortBy: Joi.string().valid('createdAt', 'rate'),
    sortOrder: Joi.string().valid('asc', 'desc'),
  }),
};

export const createFeedbackSchema = {
  [Segments.QUERY]: Joi.object({
    locationId: Joi.string().trim().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    rate: Joi.number().min(1).max(5).required(),
    description: Joi.string().trim().min(1).max(200).required(),
  }),
};
