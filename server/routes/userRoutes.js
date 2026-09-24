import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getStudents,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/students', protect, getStudents);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

