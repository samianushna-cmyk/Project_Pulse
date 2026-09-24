import asyncHandler from 'express-async-handler';
import ProofSubmission from '../models/ProofSubmission.js';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import { logActivity } from '../utils/activityLogger.js';

// URL validator helper
const isValidUrl = (urlString) => {
  if (!urlString || typeof urlString !== 'string') return false;
  try {
    const url = new URL(urlString.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

// Helper to verify team membership
const isUserInProjectTeam = (project, userId) => {
  const userIdStr = userId.toString();
  if (project.leader && project.leader.toString() === userIdStr) return true;
  if (Array.isArray(project.members)) {
    return project.members.some((m) => (m._id ? m._id.toString() : m.toString()) === userIdStr);
  }
  return false;
};

// @desc    Submit proof for an assigned task
// @route   POST /api/tasks/:taskId/proofs or POST /api/proofs/task/:taskId
// @access  Private (Assigned student)
export const submitProof = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { proofUrl, description } = req.body;

  if (!proofUrl || !proofUrl.trim() || !isValidUrl(proofUrl)) {
    res.status(400);
    throw new Error('A valid proof URL (e.g. GitHub repo, commit, demo URL) is required');
  }

  if (!description || !description.trim()) {
    res.status(400);
    throw new Error('Proof description is required');
  }

  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const project = await Project.findById(task.project);
  if (!project) {
    res.status(404);
    throw new Error('Associated project not found');
  }

  // 1. Authorization: Task must be assigned to the authenticated student
  if (task.assignedTo.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: You can only submit proof for tasks assigned to you');
  }

  // 2. Authorization: Student must be a member of the project
  if (!isUserInProjectTeam(project, req.user._id)) {
    res.status(403);
    throw new Error('Forbidden: You must be an active project team member to submit proof');
  }

  // 3. Prevent duplicate active pending submissions for the same task
  const existingPending = await ProofSubmission.findOne({
    task: task._id,
    student: req.user._id,
    status: 'Pending',
  });

  if (existingPending) {
    res.status(400);
    throw new Error('An active proof submission for this task is already pending review');
  }

  // Create proof submission
  const proof = await ProofSubmission.create({
    task: task._id,
    project: task.project,
    student: req.user._id,
    proofUrl: proofUrl.trim(),
    description: description.trim(),
    status: 'Pending',
  });

  const populatedProof = await ProofSubmission.findById(proof._id)
    .populate('task', 'title status priority')
    .populate('student', 'name email department');

  // Log Activity
  await logActivity(
    task.project,
    req.user._id,
    'Proof submitted',
    `${req.user.name} submitted verification proof for task "${task.title}"`
  );

  res.status(201).json({
    success: true,
    message: 'Proof submitted successfully. Waiting for review.',
    proof: populatedProof,
  });
});

// @desc    Get proofs for a task
// @route   GET /api/tasks/:taskId/proofs or GET /api/proofs/task/:taskId
// @access  Private
export const getTaskProofs = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const proofs = await ProofSubmission.find({ task: taskId })
    .populate('student', 'name email department')
    .populate('reviewedBy', 'name email role')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: proofs.length,
    proofs,
  });
});

// @desc    Get all proofs for a project
// @route   GET /api/projects/:projectId/proofs
// @access  Private
export const getProjectProofs = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const proofs = await ProofSubmission.find({ project: projectId })
    .populate('task', 'title status priority')
    .populate('student', 'name email department')
    .populate('reviewedBy', 'name email role')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: proofs.length,
    proofs,
  });
});

// @desc    Review proof submission
// @route   PUT /api/proofs/:id/review
// @access  Private (Project Leader or Faculty)
export const reviewProof = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, feedback } = req.body;

  if (!status || !['Approved', 'Rejected'].includes(status)) {
    res.status(400);
    throw new Error("Review status must be either 'Approved' or 'Rejected'");
  }

  if (status === 'Rejected' && (!feedback || !feedback.trim())) {
    res.status(400);
    throw new Error('Feedback is required when rejecting a proof submission');
  }

  const proof = await ProofSubmission.findById(id).populate('project').populate('task');
  if (!proof) {
    res.status(404);
    throw new Error('Proof submission not found');
  }

  const project = await Project.findById(proof.project._id || proof.project);
  if (!project) {
    res.status(404);
    throw new Error('Associated project not found');
  }

  const isLeader = project.leader.toString() === req.user._id.toString();
  const isFaculty = req.user.role === 'faculty';

  if (!isLeader && !isFaculty) {
    res.status(403);
    throw new Error('Forbidden: Only the project leader or faculty can review proofs');
  }

  proof.status = status;
  proof.feedback = feedback ? feedback.trim() : '';
  proof.reviewedAt = new Date();
  proof.reviewedBy = req.user._id;
  await proof.save();

  // If approved, update task status to Completed
  if (status === 'Approved' && proof.task) {
    const task = await Task.findById(proof.task._id || proof.task);
    if (task && task.status !== 'Completed') {
      task.status = 'Completed';
      await task.save();
    }
  }

  const updatedProof = await ProofSubmission.findById(proof._id)
    .populate('task', 'title status priority')
    .populate('student', 'name email department')
    .populate('reviewedBy', 'name email role');

  // Log Activity
  const actionName = status === 'Approved' ? 'Proof approved' : 'Proof rejected';
  await logActivity(
    project._id,
    req.user._id,
    actionName,
    `${req.user.name} (${req.user.role}) marked proof as ${status} for task "${proof.task?.title || 'Task'}"`
  );

  res.status(200).json({
    success: true,
    message: `Proof successfully marked as ${status}`,
    proof: updatedProof,
  });
});
