import { Feedback } from '../models/feedback.js';
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

const updateLocation = (filter, payload) => {
  return Location.findOneAndUpdate(filter, payload, {
    returnDocument: 'after',
  });
};

const pushFeedbackId = (locationId, feedbackId) => {
  return Location.findByIdAndUpdate(locationId, {
    $push: { feedbacksId: feedbackId },
  });
};

const updateLocationAverageRate = async (locationId) => {
  const location = await Location.findById(locationId).select('feedbacksId');
  if (!location) {
    return;
  }
  const ids = location.feedbacksId || [];
  if (ids.length === 0) {
    return;
  }
  const [row] = await Feedback.aggregate([
    { $match: { _id: { $in: ids } } },
    { $group: { _id: null, avgRate: { $avg: '$rate' } } },
  ]);
  if (row == null || row.avgRate == null) {
    return;
  }
  const rounded = Math.round(row.avgRate * 2) / 2;
  await Location.findByIdAndUpdate(locationId, { rate: rounded });
};

export default {
  getAllLocations,
  getAllLocationsCount,
  getLocationById,
  createLocation,
  updateLocation,
  pushFeedbackId,
  updateLocationAverageRate,
};
