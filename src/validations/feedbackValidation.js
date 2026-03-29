import { Joi, Segments } from 'celebrate';
import { FEEDBACK_PAGINATION } from '../constants/pagination.js';
import { locationIdValidator } from './locationsValidation.js';
import { FEEDBACK_VALIDATION } from '../constants/validation.js';

const feedbackListQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(FEEDBACK_PAGINATION.minPage)
    .default(FEEDBACK_PAGINATION.defaultPage)
    .messages({
      'number.base': 'Page must be a number',
      'number.min': 'Page must be at least {#limit}',
    }),
  perPage: Joi.number()
    .integer()
    .min(FEEDBACK_PAGINATION.minPerPage)
    .max(FEEDBACK_PAGINATION.maxPerPage)
    .default(FEEDBACK_PAGINATION.defaultPerPage)
    .messages({
      'number.base': 'PerPage must be a number',
      'number.min': 'PerPage must be at least {#limit}',
      'number.max': 'PerPage must be at most {#limit}',
    }),
});

export const getFeedbacksByLocationSchema = {
  ...locationIdValidator,
  [Segments.QUERY]: feedbackListQuerySchema,
};

export const getAllFeedbacksSchema = {
  [Segments.QUERY]: feedbackListQuerySchema,
};

export const createFeedbackSchema = {
  ...locationIdValidator,
  [Segments.BODY]: Joi.object({
    rate: Joi.number()
      .min(FEEDBACK_VALIDATION.rateMin)
      .max(FEEDBACK_VALIDATION.rateMax)
      .required()
      .messages({
        'number.base': 'Rate must be a number',
        'number.min': 'Rate must be at least {#limit}',
        'number.max': 'Rate must be at most {#limit}',
        'any.required': 'Rate is required',
      }),
    description: Joi.string()
      .trim()
      .min(FEEDBACK_VALIDATION.descriptionMinLength)
      .max(FEEDBACK_VALIDATION.descriptionMaxLength)
      .required()
      .messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at least {#limit} characters long',
        'string.max': 'Description must be at most {#limit} characters long',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required',
      }),
  }),
};
