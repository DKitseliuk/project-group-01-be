import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { LOCATION_VALIDATION } from '../constants/validation.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Invalid locationId format')
    : value;
};
export const updateLocationSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    name: Joi.string().min().max(96).trim().optional(),
    type: Joi.string().max(64).trim().optional(),
    region: Joi.string().max(64).trim().optional(),
    description: Joi.string().min(20).max(6000).optional(),
    image: Joi.string().optional(),
  })
    .min(1)
    .unknown(false),
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
        'string.base': 'Type must be a string',
        'string.max': 'Type must be less than {#limit} characters long',
        'string.empty': 'Type cannot be empty',
        'string.trim': 'Type cannot contain leading or trailing spaces',
        'any.required': 'Type is required',
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
    images: Joi.string().uri().required().messages({
      'string.base': 'Images must be an string',
      'string.empty': 'Images cannot be empty',
      'any.required': 'Images is required',
    }),
  }),
};
