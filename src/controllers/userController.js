// src/controllers/userController.js

import userService from '../services/userService.js';
import { USER_LOCATIONS_PAGINATION } from '../constants/pagination.js';
import { getPagination } from '../helpers/pagination.js';
import { FOLDERS } from '../constants/cloudinary.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import createHttpError from 'http-errors';

const getCurrentUser = async (req, res) => {
  const user = await userService.getUserById(req.user._id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const { password, ...userData } = user.toObject();
  res.status(200).json(userData);
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await userService.getUserById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const { password, ...userData } = user.toObject();
  res.status(200).json(userData);
};

const updateUser = async (req, res) => {
  if (!req.file && !req.body?.name) {
    throw createHttpError(400, 'No new avatar or new name');
  }

  const userId = req.user._id;
  const payload = { ...req.body };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer, {
      folder: FOLDERS.users,
      name: `user_${userId}`,
    });
    payload.avatarUrl = result.secure_url;
  }

  const user = await userService.updateUser(userId, payload);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const { password, ...userData } = user.toObject();
  res.status(200).json(userData);
};

const getUserLocations = async (req, res) => {
  const { userId } = req.params;
  const { page, perPage, skip, limit } = getPagination(
    req.query,
    USER_LOCATIONS_PAGINATION,
  );

  const [locations, totalItems] = await Promise.all([
    userService.getUserLocations(userId, skip, limit),
    userService.getUserLocationsCount(userId),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, locations });
};

export { getCurrentUser, getUser, getUserLocations, updateUser };
