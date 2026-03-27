import { Location } from '../models/location.js';

export const getAllLocations = async ({
  page,
  perPage,
  search,
  region,
  type,
  sortBy,
  sortOrder,
}) => {
  const skip = (page - 1) * perPage;

  const filter = {};

  if (region) {
    filter.region = region;
  }

  if (type) {
    filter.locationType = type;
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  const sort = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const [totalItems, locations] = await Promise.all([
    Location.countDocuments(filter),
    Location.find(filter).sort(sort).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: locations,
    page,
    perPage,
    totalItems,
    totalPages,
  };
};

export const getLocationById = async (locationId) => {
  return await Location.findById(locationId);
};

export const createLocation = async (payload) => {
  return await Location.create(payload);
};

export const updateLocation = async (filter, payload) => {
  return await Location.findOneAndUpdate(filter, payload, {
    new: true,
    runValidators: true,
  });
};
