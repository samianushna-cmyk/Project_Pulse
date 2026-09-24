import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { logActivity } from '../utils/activityLogger.js';

// Helper to check if a user is in the project team (leader or member)
const isUserInProjectTeam = (project, userId) => {
  const userIdStr = userId.toString();
  if (project.leader.toString() === userIdStr) return true;
  if (Array.isArray(project.members)) {
    return project.members.some((m) => (m._id ? m._id.toString() : m.toString()) === userIdStr);
  }
  return false;
};

// @desc    Create a new task for a project
// @route   POST /api/projects/:projectId/tasks
// @access  Private (Leader only)
export const createTask = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { title, description, assignedTo, priority, dueDate, status } = req.body;

  if (!title || !title.trim()) {
    res.status(400);
    throw new Error('Task title is required');
  }

  if (!assignedTo) {
    res.status(400);
    throw new Error('Task must be assigned to a team member');
  }

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Authorization: Only the project leader can create tasks
  if (project.leader.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: Only the project leader can create tasks for this project');
  }

  // Verify that assignee exists and belongs to the project team (leader or member)
  const assignee = await User.findById(assignedTo);
  if (!assignee) {
    res.status(404);
    throw new Error('Assigned user not found');
  }

  if (!isUserInProjectTeam(project, assignedTo)) {
    res.status(400);
    throw new Error('Task can only be assigned to a current project team member or leader');
  }

  const validStatuses = ['Todo', 'In Progress', 'Completed'];
  const validPriorities = ['Low', 'Medium', 'High'];

  const taskStatus = status && validStatuses.includes(status) ? status : 'Todo';
  const taskPriority = priority && validPriorities.includes(priority) ? priority : 'Medium';

  const task = await Task.create({
    project: project._id,
    title: title.trim(),
    description: description ? description.trim() : '',
    assignedTo: assignee._id,
    createdBy: req.user._id,
    status: taskStatus,
    priority: taskPriority,
    dueDate: dueDate ? new Date(dueDate) : undefined,
  });

  const populatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email department skills')
    .populate('createdBy', 'name email');

  // Log Activity
  await logActivity(
    project._id,
    req.user._id,
    'Task created',
    `${req.user.name} created task "${task.title}" and assigned it to ${assignee.name}`
  );

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    task: populatedTask,
  });
});

// @desc    Get all tasks for a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private (Team members and Faculty)
export const getProjectTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { status, assignedTo } = req.query;

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Authorization: Faculty, Project Leader, or Project Members can access
  const isFaculty = req.user.role === 'faculty';
  const isMember = isUserInProjectTeam(project, req.user._id);

  if (!isFaculty && !isMember) {
    res.status(403);
    throw new Error('Forbidden: You must be a project team member or faculty to view project tasks');
  }

  const filter = { project: projectId };
  if (status) filter.status = status;
  if (assignedTo) filter.assignedTo = assignedTo;

  const tasks = await Task.find(filter)
    .populate('assignedTo', 'name email department skills')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

// @desc    Update a task (Leader can update all fields; assigned student can update status)
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, priority, dueDate, status } = req.body;

  const task = await Task.findById(id).populate('project');
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const project = await Project.findById(task.project._id || task.project);
  if (!project) {
    res.status(404);
    throw new Error('Associated project not found');
  }

  const isLeader = project.leader.toString() === req.user._id.toString();
  const isAssignee = task.assignedTo.toString() === req.user._id.toString();

  if (!isLeader && !isAssignee) {
    res.status(403);
    throw new Error('Forbidden: You are not authorized to update this task');
  }

  const previousStatus = task.status;

  if (isLeader) {
    // Leader can edit all attributes
    if (title !== undefined) {
      if (!title || !title.trim()) {
        res.status(400);
        throw new Error('Task title cannot be empty');
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (priority !== undefined) {
      const validPriorities = ['Low', 'Medium', 'High'];
      if (validPriorities.includes(priority)) {
        task.priority = priority;
      }
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate ? new Date(dueDate) : null;
    }

    if (assignedTo !== undefined && assignedTo !== task.assignedTo.toString()) {
      if (!isUserInProjectTeam(project, assignedTo)) {
        res.status(400);
        throw new Error('Cannot assign task to a user who is not on the project team');
      }
      task.assignedTo = assignedTo;
    }

    if (status !== undefined) {
      const validStatuses = ['Todo', 'In Progress', 'Completed'];
      if (validStatuses.includes(status)) {
        task.status = status;
      }
    }
  } else if (isAssignee) {
    // Assigned student can ONLY update status
    if (status !== undefined) {
      const validStatuses = ['Todo', 'In Progress', 'Completed'];
      if (validStatuses.includes(status)) {
        task.status = status;
      } else {
        res.status(400);
        throw new Error(`Invalid status '${status}'. Allowed: Todo, In Progress, Completed`);
      }
    }
  }

  await task.save();

  const updatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email department skills')
    .populate('createdBy', 'name email');

  // Log status change activity if marked Completed
  if (previousStatus !== 'Completed' && task.status === 'Completed') {
    await logActivity(
      project._id,
      req.user._id,
      'Task completed',
      `${req.user.name} completed task "${task.title}"`
    );
  }

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    task: updatedTask,
  });
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private (Leader only)
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const project = await Project.findById(task.project);
  if (!project) {
    res.status(404);
    throw new Error('Associated project not found');
  }

  // Authorization: Only project leader can delete tasks
  if (project.leader.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: Only the project leader can delete tasks');
  }

  await Task.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
});

// @desc    Get all tasks assigned to the current student
// @route   GET /api/tasks/my
// @access  Private (Student)
export const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id })
    .populate('project', 'title category status')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});
