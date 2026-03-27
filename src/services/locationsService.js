import { Location } from '../models/location.js';

const getAllLocations = () => {
  return Location.find();
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
  getLocationById,
  createLocation,
  updateLocation,
};
