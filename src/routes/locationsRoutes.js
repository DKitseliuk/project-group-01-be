// Route
import express from "express";
import { celebrate } from "celebrate";
import {
  updateLocation,
} from "../controllers/locationsController.js";
import { authenticate } from "../middleware/authenticate.js";

import {
  updateLocationSchema,
} from "../validations/locationsValidation.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.patch(
  "/locations/:locationId",
  authenticate,
  upload.single("image"),
  celebrate(updateLocationSchema),
  updateLocation
);
export default router;
