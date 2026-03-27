import categoriesService from '../services/categotiesService.js';
import { getRegionsQuerySchema } from '../validations/categoriesValidation.js';

export const getRegionsController = async (req, res, next) => {
  try {
    const { error, value } = getRegionsQuerySchema.validate(req.query);

    if (error) {
      return next({ status: 400, message: error.message });
    }

    const regions = await categoriesService.getAllRegions({ level: value.level });

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched regions',
      data: regions,
    });
  } catch (error) {
    next(error);
  }
};

export const getLocationTypesController = async (req, res, next) => {
  try {
    const locationTypes = await categoriesService.getAllLocationTypes();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched location types',
      data: locationTypes,
    });
  } catch (error) {
    next(error);
  }
};
