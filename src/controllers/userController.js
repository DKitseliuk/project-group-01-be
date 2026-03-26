// src/controllers/userController.js

import userService from '../services/userService.js';
import { USER_LOCATIONS_PAGINATION } from '../constants/pagination.js';
import { getPagination } from '../helpers/pagination.js';

const getCurrentUser = (req, res) => {
  const user = req.user;

  res.status(200).json({ user });
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await userService.getUserById(userId);

  res.status(200).json({ user });
};

const getUserLocations = async (req, res) => {
  const { userId } = req.params;
  const { page, perPage, skip, limit } = getPagination(
    req.query,
    USER_LOCATIONS_PAGINATION,
  );

  const [userLocations, totalUserLocations] = await Promise.all([
    userService.getUserLocations(userId, skip, limit),
    userService.getUserLocationsCount(userId),
  ]);

  const totalPages = Math.ceil(totalUserLocations / perPage);

  res
    .status(200)
    .json({ page, perPage, totalPages, totalUserLocations, userLocations });
};

export { getCurrentUser, getUser, getUserLocations };
