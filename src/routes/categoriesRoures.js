
import express from 'express';
import { getRegions, getLocationTypes } from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/regions', getRegions);
router.get('/location-types', getLocationTypes);

export default router;
