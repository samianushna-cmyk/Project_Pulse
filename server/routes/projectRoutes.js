import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  getProjectMatch,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorizeRoles('leader'), createProject)
  .get(protect, getProjects);

router.route('/:id').get(protect, getProjectById);
router.route('/:id/match').get(protect, getProjectMatch);

export default router;
