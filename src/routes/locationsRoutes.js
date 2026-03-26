// Route
import express from 'express';
import { celebrate } from 'celebrate';
import {
  createLocation,
  updateLocation,
} from '../controllers/locationsController.js';
import { authenticate } from '../middleware/authenticate.js';

import {
  createLocationValidation,
  updateLocationSchema,
} from '../validations/locationsValidation.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.post(
  '/locations',
  authenticate,
  upload.single('image'),
  celebrate(createLocationValidation),
  createLocation,
);
router.patch(
  '/locations/:locationId',
  authenticate,
  upload.single('image'),
  celebrate(updateLocationSchema),
  updateLocation,
);
export default router;
