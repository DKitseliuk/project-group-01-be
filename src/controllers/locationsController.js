import { Location } from '../models/location.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getAllLocations as getAllLocationsService } from '../services/locationsService.js';

export const getAllLocations = async (req, res) => {
  const { page, perPage, search, region, type, sortBy, sortOrder } = req.query;
  const locations = await getAllLocationsService({
    page,
    perPage,
    search,
    region,
    type,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found locations!',
    data: locations.data,
    page: locations.page,
    perPage: locations.perPage,
    totalItems: locations.totalItems,
    totalPages: locations.totalPages,
  });
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    req.body.image = result.secure_url;
  }

  const updatePayload = { ...req.body };

  if (updatePayload.type) {
    updatePayload.locationType = updatePayload.type;
    delete updatePayload.type;
  }

  const location = await Location.findOneAndUpdate(
    { _id: locationId, ownerId: req.user._id },
    updatePayload,
    { new: true, runValidators: true },
  );

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated location!',
    data: location,
  });
};
