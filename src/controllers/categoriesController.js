
import { regionSchema } from "../models/region.js";

export const getRegions = async (req, res) => {
  const regions = await regionSchema.find().sort({ region: 1 });

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved regions',
    data: regions,
  });
};


import { locationTypeSchema } from '../models/locationType.js';

export const getLocationTypes = async (req, res, next) => {
  try {
    const types = await locationTypeSchema
      .find()
      .sort({ type: 1 });

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved location types',
      data: types,
    });
  } catch (error) {
    next(error);
  }
};

