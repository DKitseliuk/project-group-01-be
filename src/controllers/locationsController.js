import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import {
  getAllLocations as getAllLocationsService,
  getLocationById as getLocationByIdService,
  createLocation as createLocationService,
  updateLocation as updateLocationService,
} from '../services/locationsService.js';

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

export const getLocationById = async (req, res) => {
  const { locationId } = req.params;

  const location = await getLocationByIdService(locationId);

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

  if (payload.type) {
    payload.locationType = payload.type;
    delete payload.type;
  }

  const location = await createLocationService(payload);

  res.status(201).json({ location });
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;
  const payload = { ...req.body };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    payload.image = result.secure_url;
  }

  if (payload.type) {
    payload.locationType = payload.type;
    delete payload.type;
  }

  const location = await updateLocationService(
    { _id: locationId, ownerId: req.user._id },
    payload,
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
