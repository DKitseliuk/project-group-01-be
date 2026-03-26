// Route
import express from "express";
import { celebrate } from "celebrate";
import {
  updateLocation,
  getLocationById,
} from "../controllers/locationsController.js";
import { authenticate } from "../middleware/authenticate.js";

import {
  updateLocationSchema,
  locationIdSchema,
} from "../validations/locationsValidation.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/locations/:locationId", celebrate(locationIdSchema), getLocationById);

router.patch(
  "/locations/:locationId",
  authenticate,
  upload.single("image"),
  celebrate(updateLocationSchema),
  updateLocation
);
export default router;
