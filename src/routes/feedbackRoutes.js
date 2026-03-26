import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';
import {
  getFeedbacks,
  createFeedback,
} from '../controllers/feedbackController.js';
import {
  getFeedbacksSchema,
  createFeedbackSchema,
} from '../validations/feedbackValidation.js';

const router = Router();

router.get(
  '/api/feedbacks',
  celebrate(getFeedbacksSchema),
  getFeedbacks,
);

router.post(
  '/api/feedbacks',
  authenticate,
  celebrate(createFeedbackSchema),
  createFeedback,
);

export default router;
