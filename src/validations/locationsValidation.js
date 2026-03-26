import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { LOCATION_VALIDATION } from "../constants/validation.js";

const {
  nameMinLength,
  nameMaxLength,
  locationTypeMaxLength,
  regionMaxLength,
  descriptionMinLength,
  descriptionMaxLength,
} = LOCATION_VALIDATION;

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
    name: Joi.string().min(nameMinLength).max(nameMaxLength).trim().optional(),
   locationType: Joi.string().max(locationTypeMaxLength).trim().optional(),
    region: Joi.string().max(regionMaxLength).trim().optional(),
    description: Joi.string()
      .min(descriptionMinLength)
      .max(descriptionMaxLength)
      .optional(),
    image: Joi.string().optional(),
  })
    .min(1)
    .unknown(false),
};

export const locationIdSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
}),
};
