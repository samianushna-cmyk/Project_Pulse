import express from 'express';
import {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  getMyTasks,
} from '../controllers/taskController.js';
import {
  submitProof,
  getTaskProofs,
} from '../controllers/proofController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router({ mergeParams: true });

router.get('/my', protect, getMyTasks);

router
  .route('/:taskId/proofs')
  .post(protect, submitProof)
  .get(protect, getTaskProofs);

router
  .route('/:id')
  .put(protect, updateTask)
  .delete(protect, authorizeRoles('leader'), deleteTask);

export default router;

