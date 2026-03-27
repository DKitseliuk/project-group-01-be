import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import locationsService from '../services/locationsService.js';

export const getAllLocations = async (req, res) => {
  const locations = await locationsService.getAllLocations();

  res.status(200).json({ locations });
};

export const getLocationById = async (req, res) => {
  const { locationId } = req.params;

  const location = await locationsService.getLocationById(locationId);

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  res.status(200).json({ location });
};

export const createLocation = async (req, res) => {
  const payload = { ...req.body, ownerId: req.user._id };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    payload.image = result.secure_url;
  } else {
    throw createHttpError(400, 'No file');
  }

  const location = await locationsService.createLocation(payload);

  res.status(201).json({ location });
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    req.body.image = result.secure_url;
  }

  const location = await locationsService.updateLocation(req, locationId);

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  res.status(200).json({ location });
};
