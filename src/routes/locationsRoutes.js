// Route
import express from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  createLocationValidation,
  updateLocationSchema,
  locationIdValidator,
} from '../validations/locationsValidation.js';
import {
  createLocation,
  updateLocation,
  getLocationById,
  getAllLocations,
} from '../controllers/locationsController.js';

const locationsRouter = express.Router();

locationsRouter.get('/api/locations', getAllLocations);

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
  celebrate(updateLocationSchema),
  updateLocation,
);

export default locationsRouter;
