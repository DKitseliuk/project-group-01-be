import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

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
  name: Joi.string().min(3).max(96).trim().optional(),
  type: Joi.string().max(64).trim().optional(),
  region: Joi.string().max(64).trim().optional(),
  description: Joi.string().min(20).max(6000).optional(),
  image: Joi.string().optional(),

  }).min(1).unknown(false),
};
