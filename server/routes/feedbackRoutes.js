import express from 'express';
import {
  addFeedback,
  getProjectFeedback,
  updateFeedback,
} from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protect, authorizeRoles('faculty'), addFeedback)
  .get(protect, getProjectFeedback);

router.route('/:id').put(protect, authorizeRoles('faculty'), updateFeedback);

export default router;
