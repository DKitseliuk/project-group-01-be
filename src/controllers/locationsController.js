import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import locationsService from '../services/locationsService.js';
import { LOCATIONS_PAGINATION } from '../constants/pagination.js';
import { getPagination } from '../helpers/pagination.js';
import { FOLDERS } from '../constants/cloudinary.js';
import userService from '../services/userService.js';

export const getAllLocations = async (req, res) => {
  const { search, region, type, sortBy, sortOrder } = req.query;

  const { page, perPage, skip, limit } = getPagination(
    req.query,
    LOCATIONS_PAGINATION,
  );

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (region) {
    filter.region = region;
  }

  if (type) {
    filter.locationType = type;
  }

  const sort = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const [locations, totalItems] = await Promise.all([
    locationsService.getAllLocations(filter, sort, skip, limit),
    locationsService.getAllLocationsCount(filter),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    locations,
  });
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
  const ownerId = req.user._id;
  const payload = { ...req.body, ownerId };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer, {
      folder: FOLDERS.locations,
      name: `location_${Date.now()}`,
    });
    payload.image = result.secure_url;
  } else {
    throw createHttpError(400, 'No file');
  }

  const location = await locationsService.createLocation(payload);

  const articlesAmount = await locationsService.getAllLocationsCount({
    ownerId,
  });

  await userService.updateUser(ownerId, { articlesAmount });

  res.status(201).json(location);
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;

  const filter = {
    _id: locationId,
    ownerId: req.user._id,
  };

  const payload = { ...req.body };

  if (Object.keys(payload).length === 0 && !req.file) {
    throw createHttpError(400, 'Must be at least one change');
  }

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer, {
      folder: FOLDERS.locations,
      name: `location_${locationId}`,
    });
    payload.image = result.secure_url;
  }

  const location = await locationsService.updateLocation(filter, payload);

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  res.status(200).json(location);
};
