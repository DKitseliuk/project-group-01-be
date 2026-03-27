import { Location } from '../models/location.js';

const getAllLocations = (filter, sort, skip, limit) => {
  return Location.find(filter).sort(sort).skip(skip).limit(limit);
};

const getAllLocationsCount = (filter) => {
  return Location.find(filter).countDocuments();
};

const getLocationById = (locationId) => {
  return Location.findById(locationId)
    .populate('ownerId', 'name')
    .populate('feedbacksId');
};

const createLocation = (payload) => {
  return Location.create(payload);
};

const updateLocation = (req, locationId) => {
  return Location.findOneAndUpdate(
    { _id: locationId, ownerId: req.user._id },
    req.body,
    { returnDocument: 'after' },
  );
};

export default {
  getAllLocations,
  getAllLocationsCount,
  getLocationById,
  createLocation,
  updateLocation,
};
