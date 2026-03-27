import { Router } from 'express';
import { getRegionsController } from '../controllers/regionsController.js';

const router = Router();

router.get('/api/categories/regions', getRegionsController);

export default router;
