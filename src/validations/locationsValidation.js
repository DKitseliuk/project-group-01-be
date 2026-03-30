import { Joi, Segments } from 'celebrate';
import { objectIdValidator } from '../helpers/objectIdValidator.js';
import { LOCATION_VALIDATION } from '../constants/validation.js';
import { LOCATIONS_PAGINATION } from '../constants/pagination.js';
import {
  DEFAULT_LOCATION_SORT_FIELD,
  DEFAULT_SORT_ORDER,
  LOCATION_SORT_FIELDS,
  SORT_ORDERS,
} from '../constants/sort.js';

export const getAllLocationsValidator = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
      .integer()
      .min(LOCATIONS_PAGINATION.minPage)
      .default(LOCATIONS_PAGINATION.defaultPage)
      .messages({
        'number.base': 'Page must be a number',
        'number.min': 'Page must be at least {#limit}',
      }),

    perPage: Joi.number()
      .integer()
      .min(LOCATIONS_PAGINATION.minPerPage)
      .max(LOCATIONS_PAGINATION.maxPerPage)
      .default(LOCATIONS_PAGINATION.defaultPerPage)
      .messages({
        'number.base': 'PerPage must be a number',
        'number.min': 'PerPage must be at least {#limit}',
        'number.max': 'PerPage must be at most {#limit}',
      }),

    search: Joi.string().trim().allow('').optional().messages({
      'string.base': 'Search query must be a string',
    }),

    region: Joi.string().trim().optional().messages({
      'string.base': 'Region must be a string',
    }),

    type: Joi.string().trim().optional().messages({
      'string.base': 'Type must be a string',
    }),

    sortBy: Joi.string()
      .valid(...Object.values(LOCATION_SORT_FIELDS))
      .default(DEFAULT_LOCATION_SORT_FIELD)
      .messages({
        'string.base': 'Sort field must be a string',
        'any.only': `Sort field must be one of: ${Object.values(LOCATION_SORT_FIELDS).join(', ')}`,
      }),

    sortOrder: Joi.string()
      .valid(...Object.values(SORT_ORDERS))
      .default(DEFAULT_SORT_ORDER)
      .messages({
        'string.base': 'Sort order must be a string',
        'any.only': `Sort order must be one of: ${Object.values(SORT_ORDERS).join(', ')}`,
      }),
  }).unknown(false),
};

export const locationIdValidator = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createLocationValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .min(LOCATION_VALIDATION.nameMinLength)
      .max(LOCATION_VALIDATION.nameMaxLength)
      .trim()
      .required()
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be less than {#limit} characters long',
        'string.empty': 'Name cannot be empty',
        'string.trim': 'Name cannot contain leading or trailing spaces',
        'any.required': 'Name is required',
      }),

    locationType: Joi.string()
      .max(LOCATION_VALIDATION.locationTypeMaxLength)
      .trim()
      .required()
      .messages({
        'string.base': 'Location type must be a string',
        'string.max':
          'Location type must be less than {#limit} characters long',
        'string.empty': 'Location type cannot be empty',
        'string.trim':
          'Location type cannot contain leading or trailing spaces',
        'any.required': 'Location type is required',
      }),

    region: Joi.string()
      .max(LOCATION_VALIDATION.regionMaxLength)
      .trim()
      .required()
      .messages({
        'string.base': 'Region must be a string',
        'string.max': 'Region must be less than {#limit} characters long',
        'string.empty': 'Region cannot be empty',
        'string.trim': 'Region cannot contain leading or trailing spaces',
        'any.required': 'Region is required',
      }),

    description: Joi.string()
      .min(LOCATION_VALIDATION.descriptionMinLength)
      .max(LOCATION_VALIDATION.descriptionMaxLength)
      .required()
      .messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at least {#limit} characters long',
        'string.max': 'Description must be less than {#limit} characters long',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required',
      }),
  }).unknown(false),
};

export const updateLocationValidation = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .min(LOCATION_VALIDATION.nameMinLength)
      .max(LOCATION_VALIDATION.nameMaxLength)
      .trim()
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be less than {#limit} characters long',
        'string.empty': 'Name cannot be empty',
        'string.trim': 'Name cannot contain leading or trailing spaces',
      }),

    locationType: Joi.string()
      .max(LOCATION_VALIDATION.locationTypeMaxLength)
      .trim()
      .messages({
        'string.base': 'Location type must be a string',
        'string.max':
          'Location type must be less than {#limit} characters long',
        'string.empty': 'Location type cannot be empty',
        'string.trim':
          'Location type cannot contain leading or trailing spaces',
      }),

    region: Joi.string()
      .max(LOCATION_VALIDATION.regionMaxLength)
      .trim()
      .messages({
        'string.base': 'Region must be a string',
        'string.max': 'Region must be less than {#limit} characters long',
        'string.empty': 'Region cannot be empty',
        'string.trim': 'Region cannot contain leading or trailing spaces',
      }),

    description: Joi.string()
      .min(LOCATION_VALIDATION.descriptionMinLength)
      .max(LOCATION_VALIDATION.descriptionMaxLength)
      .messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at least {#limit} characters long',
        'string.max': 'Description must be less than {#limit} characters long',
        'string.empty': 'Description cannot be empty',
        'string.trim': 'Description cannot contain leading or trailing spaces',
      }),
  }).unknown(false),
};
