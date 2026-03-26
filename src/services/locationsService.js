import { Location } from "../models/location.js";

const updateLocation = (req, locationId) => {

  return Location.findOneAndUpdate(
    { _id: locationId, ownerId: req.user._id },
    req.body,
    { returnDocument: "after" }
  );
};

export { updateLocation };
