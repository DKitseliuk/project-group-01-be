// src/services/userService.js

import { Location } from '../models/location.js';
import { User } from '../models/user.js';

const getUserById = (userId) => {
  return User.findById(userId);
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const createUser = (payload) => {
  return User.create(payload);
};

const updateUser = (userId, payload) => {
  return User.findByIdAndUpdate(userId, payload, { returnDocument: 'after' });
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

export default {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  getUserLocations,
  getUserLocationsCount,
};
