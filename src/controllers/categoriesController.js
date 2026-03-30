import categoriesService from '../services/categoriesService.js';

export const getAllRegions = async (req, res) => {
  const regions = await categoriesService.getAllRegions();

  res.status(200).json({ regions });
};

export const getAllLocationTypes = async (req, res) => {
  const locationTypes = await categoriesService.getAllLocationTypes();

  res.status(200).json({ locationTypes });
};
