import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { updateLocation as updateLocationService } from "../services/locationsService.js";

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;


  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    req.body.image = result.secure_url;
  }

  const location = await updateLocationService(req, locationId);
  if (!location) {
    throw createHttpError(404, "Location not found");
  }

  res.status(200).json(location);
};
