import { Router } from 'express';
import { getRegionsController, getLocationTypesController } from '../controllers/categoriesController.js';

const router = Router();

router.get('/api/categories/regions', getRegionsController);
router.get('/api/categories/location-types', getLocationTypesController);

export default router;
