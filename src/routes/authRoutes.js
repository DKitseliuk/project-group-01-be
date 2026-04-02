// src/routes/authRoutes.js

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { authenticateRefresh } from '../middleware/authenticateRefresh.js';
const router = Router();

router.post('/api/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/api/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/api/auth/logout', authenticate, logoutUser);
router.post('/api/auth/refresh', authenticateRefresh, refreshUserSession);

export default router;
