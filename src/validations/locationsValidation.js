import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import {
  LOCATION_VALIDATION,
  SORT_ORDER,
  LOCATION_SORT_FIELDS,
} from '../constants/validation.js';
import { LOCATIONS_PAGINATION } from '../constants/pagination.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Invalid locationId format')
    : value;
};

export const getAllLocationsSchema = {
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
    locationId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createLocationValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .min(LOCATION_VALIDATION.nameMinLength)
      .max(LOCATION_VALIDATION.nameMaxLength)
      .trim()
      .required(),

    type: Joi.string()
      .max(LOCATION_VALIDATION.locationTypeMaxLength)
      .trim()
      .required(),

    region: Joi.string()
      .max(LOCATION_VALIDATION.regionMaxLength)
      .trim()
      .required(),

    description: Joi.string()
      .min(LOCATION_VALIDATION.descriptionMinLength)
      .max(LOCATION_VALIDATION.descriptionMaxLength)
      .required(),
  }).unknown(false),
};

export const updateLocationSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .min(LOCATION_VALIDATION.nameMinLength)
      .max(LOCATION_VALIDATION.nameMaxLength)
      .trim()
      .optional(),
    type: Joi.string()
      .max(LOCATION_VALIDATION.locationTypeMaxLength)
      .trim()
      .optional(),
    region: Joi.string()
      .max(LOCATION_VALIDATION.regionMaxLength)
      .trim()
      .optional(),
    description: Joi.string()
      .min(LOCATION_VALIDATION.descriptionMinLength)
      .max(LOCATION_VALIDATION.descriptionMaxLength)
      .optional(),
  }).unknown(false),
};
