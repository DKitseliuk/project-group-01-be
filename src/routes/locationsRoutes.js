// Route
import express from 'express';
import { celebrate } from 'celebrate';
import { getAllLocations, updateLocation } from '../controllers/locationsController.js';
import { authenticate } from '../middleware/authenticate.js';

import { updateLocationSchema, getAllLocationsSchema } from '../validations/locationsValidation.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();
router.get(
  '/locations',
  celebrate(getAllLocationsSchema),
  getAllLocations,
);

router.patch(
  '/locations/:locationId',
  authenticate,
  upload.single('image'),
  celebrate(updateLocationSchema),
  updateLocation,
);
export default router;
