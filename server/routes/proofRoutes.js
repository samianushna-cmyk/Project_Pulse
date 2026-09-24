import express from 'express';
import {
  submitProof,
  getTaskProofs,
  getProjectProofs,
  reviewProof,
} from '../controllers/proofController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/:id/review', protect, reviewProof);
router.get('/task/:taskId', protect, getTaskProofs);
router.post('/task/:taskId', protect, submitProof);
router.get('/project/:projectId', protect, getProjectProofs);

export default router;
