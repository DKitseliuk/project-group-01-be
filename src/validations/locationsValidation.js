import { Joi, Segments } from 'celebrate';
import { objectIdValidator } from '../helpers/objectIdValidator.js';
import {
  LOCATION_VALIDATION,
  LOCATION_SORT_FIELDS,
  SORT_ORDER,
} from '../constants/validation.js';
import { LOCATIONS_PAGINATION } from '../constants/pagination.js';

export const getAllLocationsValidator = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
      .integer()
      .min(LOCATIONS_PAGINATION.minPage)
      .default(LOCATIONS_PAGINATION.defaultPage),
    perPage: Joi.number()
      .integer()
      .min(LOCATIONS_PAGINATION.minPerPage)
      .max(LOCATIONS_PAGINATION.maxPerPage)
      .default(LOCATIONS_PAGINATION.defaultPerPage),
    search: Joi.string().trim().allow('').optional(),
    region: Joi.string().trim().optional(),
    type: Joi.string().trim().optional(),
    sortBy: Joi.string()
      .valid(...LOCATION_SORT_FIELDS)
      .default('createdAt'),
    sortOrder: Joi.string()
      .valid(...SORT_ORDER)
      .default('desc'),
  }).unknown(false),
};

export const locationIdValidator = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required().messages({
      'string.base': 'locationId must be a string',
      'string.empty': 'locationId cannot be empty',
      'any.custom': 'locationId must be valid id format',
      'any.required': 'locationId is required',
    }),
  }),
};

export const createLocationValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .min(LOCATION_VALIDATION.nameMinLength)
      .max(LOCATION_VALIDATION.nameMaxLength)
      .required()
      .trim()
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be less than {#limit} characters long',
        'string.empty': 'Name cannot be empty',
        'string.trim': 'Name cannot contain leading or trailing spaces',
        'any.required': 'Name is required',
      }),
    type: Joi.string()
      .max(LOCATION_VALIDATION.locationTypeMaxLength)
      .required()
      .trim()
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
      .required()
      .trim()
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
      .trim()
      .messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at least {#limit} characters long',
        'string.max': 'Description must be less than {#limit} characters long',
        'string.empty': 'Description cannot be empty',
        'string.trim': 'Description cannot contain leading or trailing spaces',
        'any.required': 'Description is required',
      }),
  }).unknown(false),
};

export const updateLocationValidation = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required().messages({
      'string.base': 'locationId must be a string',
      'string.empty': 'locationId cannot be empty',
      'any.custom': 'locationId must be valid id format',
      'any.required': 'locationId is required',
    }),
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

    type: Joi.string()
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

    locationType: Joi.string()
      .max(LOCATION_VALIDATION.locationTypeMaxLength)
      .messages({
        'string.base': 'Location-Type must be a string',
        'string.min': 'Location-Type must be at least {#limit} characters long',
        'string.max':
          'Location-Type must be less than {#limit} characters long',
        'string.empty': 'Location-Type cannot be empty',
        'string.trim':
          'Location-Type cannot contain leading or trailing spaces',
      }),
  })
    .min(1)
    .unknown(false),
};
