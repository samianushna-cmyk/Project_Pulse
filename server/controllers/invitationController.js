import asyncHandler from 'express-async-handler';
import TeamInvitation from '../models/TeamInvitation.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { logActivity } from '../utils/activityLogger.js';

// @desc    Send a project team invitation to a student
// @route   POST /api/invitations
// @access  Private (Leader only)
export const sendInvitation = asyncHandler(async (req, res) => {
  const { projectId, recipientId, recipientEmail, message } = req.body;

  if (!projectId) {
    res.status(400);
    throw new Error('Project ID is required');
  }

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Authorization: Only the project leader can send an invitation
  if (project.leader.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: Only the project leader can send invitations for this project');
  }

  // Find recipient by ID or Email
  let recipient;
  if (recipientId) {
    recipient = await User.findById(recipientId);
  } else if (recipientEmail) {
    recipient = await User.findOne({ email: recipientEmail.trim().toLowerCase() });
  }

  if (!recipient) {
    res.status(404);
    throw new Error('Student recipient not found');
  }

  if (recipient.role !== 'student') {
    res.status(400);
    throw new Error('Invitations can only be sent to registered students');
  }

  // Check if student is already a member or leader
  const members = project.members ? project.members.map((m) => m.toString()) : [];
  if (project.leader.toString() === recipient._id.toString() || members.includes(recipient._id.toString())) {
    res.status(400);
    throw new Error('This student is already a member of the project team');
  }

  // Check current team size against maxTeamSize (leader counts as 1)
  const currentTeamSize = 1 + members.length;
  if (currentTeamSize >= project.maxTeamSize) {
    res.status(400);
    throw new Error(`Project has already reached its maximum team size of ${project.maxTeamSize}`);
  }

  // Check for duplicate pending invitation
  const existingPending = await TeamInvitation.findOne({
    project: project._id,
    recipient: recipient._id,
    status: 'Pending',
  });

  if (existingPending) {
    res.status(400);
    throw new Error('A pending invitation has already been sent to this student for this project');
  }

  const invitation = await TeamInvitation.create({
    project: project._id,
    sender: req.user._id,
    recipient: recipient._id,
    message: message ? message.trim() : '',
    status: 'Pending',
  });

  const populatedInvitation = await TeamInvitation.findById(invitation._id)
    .populate('project', 'title category status maxTeamSize')
    .populate('sender', 'name email department role')
    .populate('recipient', 'name email department skills availability');

  // Log Activity
  await logActivity(
    project._id,
    req.user._id,
    'Student invited',
    `${req.user.name} invited ${recipient.name} to join the project team`
  );

  res.status(201).json({
    success: true,
    message: 'Invitation sent successfully',
    invitation: populatedInvitation,
  });
});

// @desc    Get invitations for current user (or project)
// @route   GET /api/invitations
// @access  Private
export const getInvitations = asyncHandler(async (req, res) => {
  const { projectId, status } = req.query;
  let query = {};

  if (req.user.role === 'student') {
    // Student sees invitations sent to them
    query.recipient = req.user._id;
  } else if (req.user.role === 'leader') {
    if (projectId) {
      const project = await Project.findById(projectId);
      if (project && project.leader.toString() === req.user._id.toString()) {
        query.project = projectId;
      } else {
        query.sender = req.user._id;
      }
    } else {
      query.sender = req.user._id;
    }
  } else if (req.user.role === 'faculty') {
    if (projectId) {
      query.project = projectId;
    }
  }

  if (status) {
    query.status = status;
  }

  const invitations = await TeamInvitation.find(query)
    .populate('project', 'title category status maxTeamSize leader')
    .populate('sender', 'name email department')
    .populate('recipient', 'name email department skills availability')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: invitations.length,
    invitations,
  });
});

// @desc    Accept team invitation
// @route   PUT /api/invitations/:id/accept
// @access  Private (Invited Student only)
export const acceptInvitation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const invitation = await TeamInvitation.findById(id).populate('project');
  if (!invitation) {
    res.status(404);
    throw new Error('Invitation not found');
  }

  // Authorization: Only the invited recipient can accept
  if (invitation.recipient.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: You can only accept invitations addressed to you');
  }

  if (invitation.status !== 'Pending') {
    res.status(400);
    throw new Error(`Cannot accept an invitation with status '${invitation.status}'`);
  }

  const project = await Project.findById(invitation.project._id || invitation.project);
  if (!project) {
    res.status(404);
    throw new Error('Associated project no longer exists');
  }

  const currentMembers = project.members ? project.members.map((m) => m.toString()) : [];
  const currentTeamSize = 1 + currentMembers.length;

  if (currentTeamSize >= project.maxTeamSize) {
    res.status(400);
    throw new Error(`Project team is already full (maximum capacity: ${project.maxTeamSize})`);
  }

  // Add student to members if not already present
  if (!currentMembers.includes(req.user._id.toString())) {
    project.members = project.members || [];
    project.members.push(req.user._id);
    await project.save();
  }

  invitation.status = 'Accepted';
  await invitation.save();

  // Log Activity
  await logActivity(
    project._id,
    req.user._id,
    'Invitation accepted',
    `${req.user.name} accepted the invitation and joined the project team`
  );

  res.status(200).json({
    success: true,
    message: 'Invitation accepted successfully. You are now part of the project team!',
    invitation,
  });
});

// @desc    Reject team invitation
// @route   PUT /api/invitations/:id/reject
// @access  Private (Invited Student only)
export const rejectInvitation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const invitation = await TeamInvitation.findById(id);
  if (!invitation) {
    res.status(404);
    throw new Error('Invitation not found');
  }

  // Authorization: Only the invited recipient can reject
  if (invitation.recipient.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: You can only reject invitations addressed to you');
  }

  if (invitation.status !== 'Pending') {
    res.status(400);
    throw new Error(`Cannot reject an invitation with status '${invitation.status}'`);
  }

  invitation.status = 'Rejected';
  await invitation.save();

  // Log Activity
  await logActivity(
    invitation.project,
    req.user._id,
    'Invitation rejected',
    `${req.user.name} declined the project invitation`
  );

  res.status(200).json({
    success: true,
    message: 'Invitation declined',
    invitation,
  });
});
