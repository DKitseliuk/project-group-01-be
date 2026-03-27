import { Router } from 'express';
import { getLocationTypesController } from '../controllers/locationTypesController.js';

const router = Router();

router.get('/api/categories/location-types', getLocationTypesController);

export default router;
