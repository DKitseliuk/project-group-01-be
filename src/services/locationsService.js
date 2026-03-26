import { Location } from "../models/location.js";

const updateLocation = (req, locationId) => {
  return Location.findOneAndUpdate(
    { _id: locationId, ownerId: req.user._id },
    req.body,
    { returnDocument: "after" }
  );
};

const getLocationById = async (locationId) => {
  return await Location.findById(locationId)
    .populate('ownerId', 'name')
    .populate('feedbacksId');
};

export default { getLocationById, updateLocation };