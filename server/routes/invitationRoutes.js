import express from 'express';
import {
  sendInvitation,
  getInvitations,
  acceptInvitation,
  rejectInvitation,
} from '../controllers/invitationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorizeRoles('leader'), sendInvitation)
  .get(protect, getInvitations);

router.route('/:id/accept').put(protect, authorizeRoles('student'), acceptInvitation);
router.route('/:id/reject').put(protect, authorizeRoles('student'), rejectInvitation);

export default router;
