import asyncHandler from 'express-async-handler';
import FacultyFeedback from '../models/FacultyFeedback.js';
import Project from '../models/Project.js';
import { logActivity } from '../utils/activityLogger.js';

// @desc    Add faculty feedback for a project
// @route   POST /api/projects/:projectId/feedback
// @access  Private (Faculty only)
export const addFeedback = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { rating, comments, studentId } = req.body;

  if (req.user.role !== 'faculty') {
    res.status(403);
    throw new Error('Forbidden: Only faculty members can provide faculty feedback');
  }

  const parsedRating = Number(rating);
  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    res.status(400);
    throw new Error('Rating must be a number between 1 and 5');
  }

  if (!comments || !comments.trim()) {
    res.status(400);
    throw new Error('Feedback comments are required');
  }

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const feedback = await FacultyFeedback.create({
    project: project._id,
    faculty: req.user._id,
    student: studentId || null,
    rating: parsedRating,
    comments: comments.trim(),
  });

  const populatedFeedback = await FacultyFeedback.findById(feedback._id)
    .populate('faculty', 'name email department')
    .populate('student', 'name email department');

  // Log Activity
  await logActivity(
    project._id,
    req.user._id,
    'Faculty feedback added',
    `Faculty ${req.user.name} (${req.user.department}) posted feedback (Rating: ${parsedRating}/5)`
  );

  res.status(201).json({
    success: true,
    message: 'Faculty feedback submitted successfully',
    feedback: populatedFeedback,
  });
});

// @desc    Get feedback for a project
// @route   GET /api/projects/:projectId/feedback
// @access  Private
export const getProjectFeedback = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const feedbacks = await FacultyFeedback.find({ project: projectId })
    .populate('faculty', 'name email department')
    .populate('student', 'name email department')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    feedbacks,
  });
});

// @desc    Update faculty feedback
// @route   PUT /api/feedback/:id
// @access  Private (Faculty author only)
export const updateFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comments } = req.body;

  const feedback = await FacultyFeedback.findById(id);
  if (!feedback) {
    res.status(404);
    throw new Error('Feedback not found');
  }

  // Authorization: Only the faculty author can update it
  if (feedback.faculty.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: You can only edit feedback that you authored');
  }

  if (rating !== undefined) {
    const parsedRating = Number(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      res.status(400);
      throw new Error('Rating must be a number between 1 and 5');
    }
    feedback.rating = parsedRating;
  }

  if (comments !== undefined) {
    if (!comments || !comments.trim()) {
      res.status(400);
      throw new Error('Feedback comments cannot be empty');
    }
    feedback.comments = comments.trim();
  }

  await feedback.save();

  const updatedFeedback = await FacultyFeedback.findById(feedback._id)
    .populate('faculty', 'name email department')
    .populate('student', 'name email department');

  res.status(200).json({
    success: true,
    message: 'Feedback updated successfully',
    feedback: updatedFeedback,
  });
});
