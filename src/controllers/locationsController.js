import createHttpError from 'http-errors';
import { Location } from '../models/location.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getLocationById as getLocationByIdService } from '../services/locationsService.js';

export const getLocationById = async (req, res) => {
  const { locationId } = req.params;

  const location = await getLocationByIdService(locationId);

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  res.status(200).json({ location });
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;


  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    req.body.image = result.secure_url;
  }

  const location = await Location.findOneAndUpdate(
    { _id: locationId, ownerId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!location) {
    throw createHttpError(404, "Location not found");
  }

  res.status(200).json({ location });
};
