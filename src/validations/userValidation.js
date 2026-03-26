// src/validations/userValidation.js

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { USER_LOCATIONS_PAGINATION } from '../constants/pagination.js';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

const userIdValidation = Joi.object({
  userId: Joi.string().custom(objectIdValidator).required().messages({
    'string.base': 'userId must be a string',
    'string.empty': 'userId cannot be empty',
    'any.custom': 'userId must be valid id format',
    'any.required': 'userId is required',
  }),
});

const getUserByIdSchema = {
  [Segments.PARAMS]: userIdValidation,
};

const getUserLocationsSchema = {
  [Segments.PARAMS]: userIdValidation,
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
      .integer()
      .min(USER_LOCATIONS_PAGINATION.minPage)
      .default(USER_LOCATIONS_PAGINATION.defaultPage)
      .messages({
        'number.base': 'Page must be a number',
        'number.min': 'Page must be at least {#limit}',
      }),
    perPage: Joi.number()
      .integer()
      .min(USER_LOCATIONS_PAGINATION.minPerPage)
      .max(USER_LOCATIONS_PAGINATION.maxPerPage)
      .default(USER_LOCATIONS_PAGINATION.defaultPerPage)
      .messages({
        'number.base': 'PerPage must be a number',
        'number.min': 'PerPage must be at least {#limit}',
        'number.max': 'PerPage must be at most {#limit}',
      }),
  }),
};

export { getUserByIdSchema, getUserLocationsSchema };
