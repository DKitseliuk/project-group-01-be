import { getAllRegions } from '../services/regionsService.js';
import { getRegionsQuerySchema } from '../validations/regionsValidation.js';

export const getRegionsController = async (req, res, next) => {
  try {
    const { error, value } = getRegionsQuerySchema.validate(req.query);

    if (error) {
      return next({ status: 400, message: error.message });
    }

    const regions = await getAllRegions({ level: value.level });

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched regions',
      data: regions,
    });
  } catch (error) {
    next(error);
  }
};
