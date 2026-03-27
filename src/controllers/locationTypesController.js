import locationTypeService from '../services/locationTypesServices.js';

export const getLocationTypesController = async (req, res, next) => {
  try {
    const locationTypes = await locationTypeService.getAllLocationTypes();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched location types',
      data: locationTypes,
    });
  } catch (error) {
    next(error);
  }
};
