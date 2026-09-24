import asyncHandler from 'express-async-handler';
import ActivityLog from '../models/ActivityLog.js';
import Project from '../models/Project.js';

// @desc    Get activity logs for a project
// @route   GET /api/projects/:projectId/activities
// @access  Private
export const getProjectActivities = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const activities = await ActivityLog.find({ project: projectId })
    .populate('user', 'name email role department')
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({
    success: true,
    count: activities.length,
    activities,
  });
});
