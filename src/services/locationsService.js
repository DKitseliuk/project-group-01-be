import { Location } from '../models/location.js';

export const getLocationById = async (locationId) => {
  return await Location.findById(locationId)
    .populate('ownerId', 'name')
    .populate('feedbacksId');
};
