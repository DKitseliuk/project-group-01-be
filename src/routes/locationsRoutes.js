// Route
import express from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  createLocation,
  updateLocation,
  getLocationById,
  getAllLocations,
} from '../controllers/locationsController.js';
import { authenticate } from '../middleware/authenticate.js';

import {
  createLocationValidation,
  updateLocationSchema,
  locationIdValidator,
  getAllLocationsSchema,
} from '../validations/locationsValidation.js';
import { upload } from '../middleware/multer.js';

const locationsRouter = express.Router();

locationsRouter.get(
  '/locations',
  celebrate(getAllLocationsSchema),
  getAllLocations,
);

locationsRouter.get(
  '/api/locations/:locationId',
  celebrate(locationIdValidator),
  getLocationById,
);

locationsRouter.post(
  '/api/locations',
  authenticate,
  upload.single('image'),
  celebrate(createLocationValidation),
  createLocation,
);

locationsRouter.patch(
  '/locations/:locationId',
  authenticate,
  upload.single('image'),
  celebrate(updateLocationSchema),
  updateLocation,
);
export default router;
