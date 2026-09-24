import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  getProjectMatch,
} from '../controllers/projectController.js';
import {
  createTask,
  getProjectTasks,
} from '../controllers/taskController.js';
import { sendInvitation } from '../controllers/invitationController.js';
import { getProjectProofs } from '../controllers/proofController.js';
import {
  addFeedback,
  getProjectFeedback,
} from '../controllers/feedbackController.js';
import { getProjectContributions } from '../controllers/contributionController.js';
import { getProjectActivities } from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Project Base Routes
router
  .route('/')
  .post(protect, authorizeRoles('leader'), createProject)
  .get(protect, getProjects);

router
  .route('/:id')
  .get(protect, getProjectById)
  .put(protect, authorizeRoles('leader'), updateProject);

// Skill Match Route
router.route('/:id/match').get(protect, getProjectMatch);

// Project Invitation Sub-routes
router
  .route('/:projectId/invitations')
  .post(protect, authorizeRoles('leader'), sendInvitation);

// Project Task Sub-routes
router
  .route('/:projectId/tasks')
  .post(protect, authorizeRoles('leader'), createTask)
  .get(protect, getProjectTasks);


// Project Proofs Sub-route
router.route('/:projectId/proofs').get(protect, getProjectProofs);

// Project Feedback Sub-routes
router
  .route('/:projectId/feedback')
  .post(protect, authorizeRoles('faculty'), addFeedback)
  .get(protect, getProjectFeedback);

// Project Contributions Sub-route
router.route('/:projectId/contributions').get(protect, getProjectContributions);

// Project Activities Sub-route
router.route('/:projectId/activities').get(protect, getProjectActivities);

export default router;
