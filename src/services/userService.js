// src/services/userService.js

import { Location } from '../models/location.js';
import { User } from '../models/user.js';

const getUserById = (userId) => {
  return User.findById(userId);
};

const getUserLocations = (userId, skip, limit) => {
  return Location.find({
    ownerId: userId,
  })
    .skip(skip)
    .limit(limit);
};

const getUserLocationsCount = (userId) => {
  return Location.find({
    ownerId: userId,
  }).countDocuments();
};

export default { getUserById, getUserLocations, getUserLocationsCount };
