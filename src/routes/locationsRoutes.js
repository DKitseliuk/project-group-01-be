// Route
import express from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getAllLocationsValidator,
  locationIdValidator,
  createLocationValidation,
  updateLocationValidation,
} from '../validations/locationsValidation.js';

import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
} from '../controllers/locationsController.js';

const locationsRouter = express.Router();

locationsRouter.get(
  '/api/locations',
  celebrate(getAllLocationsValidator),
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
  '/api/locations/:locationId',
  authenticate,
  upload.single('image'),
  celebrate(updateLocationValidation),
  updateLocation,
);

export default locationsRouter;
