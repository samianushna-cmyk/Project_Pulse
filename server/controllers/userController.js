import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// URL validator helper
const isValidUrl = (urlString) => {
  if (!urlString || typeof urlString !== 'string' || urlString.trim() === '') return true;
  try {
    const url = new URL(urlString.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

// Deduplicate and sanitize string arrays (case-insensitive deduplication)
const sanitizeStringArray = (arr) => {
  if (!Array.isArray(arr)) return [];
  const seen = new Set();
  const result = [];

  for (const item of arr) {
    if (typeof item === 'string') {
      const trimmed = item.trim();
      const lower = trimmed.toLowerCase();
      if (trimmed.length > 0 && !seen.has(lower)) {
        seen.add(lower);
        result.push(trimmed);
      }
    }
  }

  return result;
};

// @desc    Get current authenticated user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User profile not found');
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      skills: user.skills || [],
      preferredRoles: user.preferredRoles || [],
      availability: user.availability || 'Available',
      githubUrl: user.githubUrl || '',
      portfolioUrl: user.portfolioUrl || '',
      createdAt: user.createdAt,
    },
  });
});

// @desc    Update authenticated user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User profile not found');
  }

  const {
    name,
    department,
    skills,
    preferredRoles,
    availability,
    githubUrl,
    portfolioUrl,
  } = req.body;

  // Validation: Name cannot be empty if provided
  if (name !== undefined) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.status(400);
      throw new Error('Name cannot be empty');
    }
    user.name = name.trim();
  }

  // Validation: Department cannot be empty if provided
  if (department !== undefined) {
    if (!department || typeof department !== 'string' || department.trim() === '') {
      res.status(400);
      throw new Error('Department cannot be empty');
    }
    user.department = department.trim();
  }

  // Update skills (case-insensitive deduplication)
  if (skills !== undefined) {
    user.skills = sanitizeStringArray(skills);
  }

  // Update preferred roles (deduplication)
  if (preferredRoles !== undefined) {
    user.preferredRoles = sanitizeStringArray(preferredRoles);
  }

  // Update availability
  if (availability !== undefined) {
    const validAvailabilities = ['Available', 'Partially Available', 'Not Available'];
    if (validAvailabilities.includes(availability)) {
      user.availability = availability;
    } else {
      res.status(400);
      throw new Error('Invalid availability status. Must be Available, Partially Available, or Not Available');
    }
  }

  // Update GitHub URL
  if (githubUrl !== undefined) {
    const trimmedGithub = typeof githubUrl === 'string' ? githubUrl.trim() : '';
    if (trimmedGithub && !isValidUrl(trimmedGithub)) {
      res.status(400);
      throw new Error('Please provide a valid GitHub URL (e.g., https://github.com/username)');
    }
    user.githubUrl = trimmedGithub;
  }

  // Update Portfolio URL
  if (portfolioUrl !== undefined) {
    const trimmedPortfolio = typeof portfolioUrl === 'string' ? portfolioUrl.trim() : '';
    if (trimmedPortfolio && !isValidUrl(trimmedPortfolio)) {
      res.status(400);
      throw new Error('Please provide a valid Portfolio URL (e.g., https://yourportfolio.com)');
    }
    user.portfolioUrl = trimmedPortfolio;
  }

  // Save updated user (Note: password, email, role, _id remain untouched)
  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      department: updatedUser.department,
      skills: updatedUser.skills,
      preferredRoles: updatedUser.preferredRoles,
      availability: updatedUser.availability,
      githubUrl: updatedUser.githubUrl,
      portfolioUrl: updatedUser.portfolioUrl,
      createdAt: updatedUser.createdAt,
    },
  });
});

// @desc    Get all students (for team recruitment & discovery)
// @route   GET /api/users/students
// @access  Private (Authenticated users)
export const getStudents = asyncHandler(async (req, res) => {
  const { search, department, skill } = req.query;
  const query = { role: 'student' };

  if (department) {
    query.department = new RegExp(department.trim(), 'i');
  }

  if (skill) {
    query.skills = { $regex: new RegExp(skill.trim(), 'i') };
  }

  if (search) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ name: searchRegex }, { email: searchRegex }, { skills: searchRegex }];
  }

  const students = await User.find(query)
    .select('-password')
    .sort({ name: 1 });

  res.status(200).json({
    success: true,
    count: students.length,
    students,
  });
});

