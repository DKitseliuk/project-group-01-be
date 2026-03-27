import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Invalid locationId format')
    : value;
};

export const getAllLocationsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(12),
    search: Joi.string().trim().allow('').optional(),
    region: Joi.string().trim().optional(),
    type: Joi.string().trim().optional(),

    sortBy: Joi.string()
      .valid('name', 'region', 'locationType', 'rate', 'createdAt', 'updatedAt')
      .default('createdAt'),

    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  }).unknown(false),
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
  }).unknown(false),
};
