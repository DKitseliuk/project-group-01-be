import Joi from 'joi';
import { REGION_LEVEL } from '../constants/validation.js';

export const getRegionsQuerySchema = Joi.object({
  level: Joi.string()
    .valid(...REGION_LEVEL)
    .optional(),
});
