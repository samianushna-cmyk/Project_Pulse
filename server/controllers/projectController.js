import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import { calculateSkillMatch } from '../utils/skillMatcher.js';
import { logActivity } from '../utils/activityLogger.js';

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Leader only)
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, category, requiredSkills, maxTeamSize, status } = req.body;

  // Validate required title
  if (!title || !title.trim()) {
    res.status(400);
    throw new Error('Project title is required');
  }

  // Validate required description
  if (!description || !description.trim()) {
    res.status(400);
    throw new Error('Project description is required');
  }

  // Validate required category
  if (!category || !category.trim()) {
    res.status(400);
    throw new Error('Project category is required');
  }

  // Validate requiredSkills is a non-empty array
  if (!requiredSkills || !Array.isArray(requiredSkills) || requiredSkills.length === 0) {
    res.status(400);
    throw new Error('At least one required skill must be specified');
  }

  // Deduplicate required skills using case-insensitive comparison and trim whitespace
  const sanitizedSkills = [];
  const seenLowerSkills = new Set();

  for (const skill of requiredSkills) {
    if (typeof skill === 'string') {
      const trimmed = skill.trim();
      if (trimmed) {
        const lower = trimmed.toLowerCase();
        if (!seenLowerSkills.has(lower)) {
          seenLowerSkills.add(lower);
          sanitizedSkills.push(trimmed);
        }
      }
    }
  }

  if (sanitizedSkills.length === 0) {
    res.status(400);
    throw new Error('At least one valid required skill is required');
  }

  // Validate maxTeamSize
  const parsedTeamSize = Number(maxTeamSize);
  if (isNaN(parsedTeamSize) || parsedTeamSize <= 0) {
    res.status(400);
    throw new Error('Maximum team size must be a valid positive number');
  }

  // Validate status if provided
  const validStatuses = ['Open', 'In Progress', 'Completed'];
  let projectStatus = 'Open';
  if (status) {
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Invalid status '${status}'. Allowed: Open, In Progress, Completed`);
    }
    projectStatus = status;
  }

  // Ensure leader ID is taken strictly from authenticated user JWT
  const leaderId = req.user._id;

  const project = await Project.create({
    title: title.trim(),
    description: description.trim(),
    leader: leaderId,
    members: [],
    requiredSkills: sanitizedSkills,
    category: category.trim(),
    status: projectStatus,
    maxTeamSize: parsedTeamSize,
  });

  const populatedProject = await Project.findById(project._id)
    .populate('leader', 'name email department role skills availability githubUrl portfolioUrl')
    .populate('members', 'name email department role skills availability githubUrl portfolioUrl');

  // Log Activity
  await logActivity(
    project._id,
    req.user._id,
    'Project created',
    `${req.user.name} created the project "${project.title}"`
  );

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    project: populatedProject,
  });
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private (Authenticated users: student, leader, faculty)
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate('leader', 'name email department role skills availability')
    .populate('members', 'name email department role skills availability')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    projects,
  });
});

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private (Authenticated users: student, leader, faculty)
export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id)
    .populate('leader', 'name email department role skills availability githubUrl portfolioUrl')
    .populate('members', 'name email department role skills availability githubUrl portfolioUrl');

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// @desc    Update project (Leader only)
// @route   PUT /api/projects/:id
// @access  Private (Leader only)
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, category, requiredSkills, maxTeamSize, status } = req.body;

  const project = await Project.findById(id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Authorization: Only the project leader can update it
  if (project.leader.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: Only the project leader can update this project');
  }

  if (title !== undefined) project.title = title.trim();
  if (description !== undefined) project.description = description.trim();
  if (category !== undefined) project.category = category.trim();

  if (requiredSkills !== undefined) {
    if (!Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      res.status(400);
      throw new Error('At least one required skill is required');
    }
    const seen = new Set();
    const sanitized = [];
    for (const sk of requiredSkills) {
      if (typeof sk === 'string' && sk.trim()) {
        const lower = sk.trim().toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          sanitized.push(sk.trim());
        }
      }
    }
    if (sanitized.length === 0) {
      res.status(400);
      throw new Error('At least one valid required skill is required');
    }
    project.requiredSkills = sanitized;
  }

  if (maxTeamSize !== undefined) {
    const parsed = Number(maxTeamSize);
    if (isNaN(parsed) || parsed < 1) {
      res.status(400);
      throw new Error('Maximum team size must be at least 1');
    }
    const currentCount = 1 + (project.members?.length || 0);
    if (parsed < currentCount) {
      res.status(400);
      throw new Error(`Cannot reduce max team size below current team size (${currentCount})`);
    }
    project.maxTeamSize = parsed;
  }

  if (status !== undefined) {
    const validStatuses = ['Open', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Invalid status '${status}'`);
    }
    project.status = status;
  }

  await project.save();

  const populatedProject = await Project.findById(project._id)
    .populate('leader', 'name email department role skills availability githubUrl portfolioUrl')
    .populate('members', 'name email department role skills availability githubUrl portfolioUrl');

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    project: populatedProject,
  });
});

// @desc    Calculate and return skill match for authenticated student against a project
// @route   GET /api/projects/:id/match
// @access  Private (Authenticated users)
export const getProjectMatch = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Retrieve project
  const project = await Project.findById(id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Retrieve latest authenticated user to read saved skills
  const student = req.user;
  const studentSkills = Array.isArray(student.skills) ? student.skills : [];

  // Run transparent skill matching algorithm
  const matchResult = calculateSkillMatch(studentSkills, project.requiredSkills);

  res.status(200).json({
    success: true,
    projectId: project._id,
    score: matchResult.score,
    matchedSkills: matchResult.matchedSkills,
    missingSkills: matchResult.missingSkills,
    suggestedRole: matchResult.suggestedRole,
  });
});
