// src/routes/userRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getCurrentUser,
  getUser,
  getUserLocations,
  updateUser,
} from '../controllers/userController.js';
import { celebrate } from 'celebrate';
import {
  getUserByIdSchema,
  getUserLocationsSchema,
} from '../validations/userValidation.js';

const userRoutes = Router();

userRoutes.get('/api/users/me', authenticate, getCurrentUser);
userRoutes.patch(
  '/api/users/me/edit',
  authenticate,
  upload.single('avatarUrl'),
  updateUser,
);

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
