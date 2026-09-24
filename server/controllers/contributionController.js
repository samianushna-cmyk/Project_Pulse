import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

// @desc    Get transparent task contribution summary for all team members
// @route   GET /api/projects/:projectId/contributions
// @access  Private
export const getProjectContributions = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId)
    .populate('leader', 'name email department role skills')
    .populate('members', 'name email department role skills');

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Build list of all team members (leader + members)
  const teamMembers = [];
  if (project.leader) {
    teamMembers.push({
      _id: project.leader._id,
      name: project.leader.name,
      email: project.leader.email,
      department: project.leader.department,
      isLeader: true,
      role: 'Leader',
    });
  }

  if (Array.isArray(project.members)) {
    for (const member of project.members) {
      if (member && member._id) {
        // avoid duplicating leader if present in members
        if (!teamMembers.some((m) => m._id.toString() === member._id.toString())) {
          teamMembers.push({
            _id: member._id,
            name: member.name,
            email: member.email,
            department: member.department,
            isLeader: false,
            role: 'Member',
          });
        }
      }
    }
  }

  // Fetch all tasks for this project
  const allTasks = await Task.find({ project: projectId });

  // Calculate stats per member
  const memberContributions = teamMembers.map((member) => {
    const memberIdStr = member._id.toString();
    const assignedTasks = allTasks.filter(
      (t) => t.assignedTo && t.assignedTo.toString() === memberIdStr
    );
    const completedTasks = assignedTasks.filter((t) => t.status === 'Completed');

    const totalAssigned = assignedTasks.length;
    const totalCompleted = completedTasks.length;
    const completionPercentage =
      totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0;

    return {
      user: {
        _id: member._id,
        name: member.name,
        email: member.email,
        department: member.department,
        isLeader: member.isLeader,
        teamRole: member.role,
      },
      assignedTasksCount: totalAssigned,
      completedTasksCount: totalCompleted,
      inProgressCount: assignedTasks.filter((t) => t.status === 'In Progress').length,
      todoCount: assignedTasks.filter((t) => t.status === 'Todo').length,
      completionPercentage,
    };
  });

  // Overall project task completion stats
  const totalProjectTasks = allTasks.length;
  const totalCompletedProjectTasks = allTasks.filter((t) => t.status === 'Completed').length;
  const projectCompletionPercentage =
    totalProjectTasks > 0
      ? Math.round((totalCompletedProjectTasks / totalProjectTasks) * 100)
      : 0;

  res.status(200).json({
    success: true,
    projectId: project._id,
    label: 'Task Completion',
    disclaimer:
      'Task completion is calculated based on completed assigned tasks vs total assigned tasks and serves as a progress indicator.',
    totalTasks: totalProjectTasks,
    completedTasks: totalCompletedProjectTasks,
    overallCompletionPercentage: projectCompletionPercentage,
    contributions: memberContributions,
  });
});
