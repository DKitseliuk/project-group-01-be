// src/validations/userValidation.js

import { Joi, Segments } from 'celebrate';
import { objectIdValidator } from '../helpers/objectIdValidator.js';
import { USER_LOCATIONS_PAGINATION } from '../constants/pagination.js';
import { USER_VALIDATION } from '../constants/validation.js';

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

const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .min(USER_VALIDATION.nameMinLength)
      .max(USER_VALIDATION.nameMaxLength)
      .trim()
      .messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have at least {#limit} characters',
        'string.max': 'Name should have at most {#limit} characters',
        'string.trim': 'Name cannot contain leading or trailing spaces',
      }),
  }),
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

export { getUserByIdSchema, getUserLocationsSchema, updateUserSchema };
