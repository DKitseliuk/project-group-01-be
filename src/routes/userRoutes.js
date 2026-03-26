// src/routes/userRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getCurrentUser,
  getUser,
  getUserLocations,
} from '../controllers/userController.js';
import { celebrate } from 'celebrate';
import {
  getUserByIdSchema,
  getUserLocationsSchema,
} from '../validations/userValidation.js';

const userRoutes = Router();

userRoutes.get('/api/users/me', authenticate, getCurrentUser);
userRoutes.get(
  '/api/users/:userId',
  celebrate(getUserByIdSchema, { abortEarly: false }),
  getUser,
);
userRoutes.get(
  '/api/users/:userId/locations',
  celebrate(getUserLocationsSchema, { abortEarly: false }),
  getUserLocations,
);

export default userRoutes;
