// Route
import express from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  updateLocationSchema,
  locationIdSchema,
} from \../validations/locationsValidation.js';
import {
  updateLocation,
  getLocationById,
} from '../controllers/locationsController.js';


const locationsRouter = express.Router();

locationsRouter.get('/api/locations', getAllLocations);

locationsRouter.get('/api/locations/:locationId', celebrate(locationIdSchema), getLocationById);

locationsRouter.patch(
  '/api/locations/:locationId',
  authenticate,
  upload.single('image'),
  celebrate(updateLocationSchema),
  updateLocation,
);

export default locationsRouter;
