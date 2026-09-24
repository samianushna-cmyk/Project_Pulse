import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// Helper to normalize frontend role strings to schema values
const normalizeRole = (role) => {
  if (!role) return 'student';
  const r = role.toLowerCase().trim();
  if (r.includes('leader')) return 'leader';
  if (r.includes('faculty') || r.includes('guide')) return 'faculty';
  return 'student';
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, role, department } = req.body;

  // 1. Validation: Required fields
  if (!name || !email || !password || !confirmPassword || !department) {
    res.status(400);
    throw new Error('Please fill in all required registration fields');
  }

  // 2. Validation: Passwords match
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords do not match');
  }

  // 3. Validation: Password length
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters long');
  }

  // 4. Validation: Email format
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error('Please provide a valid institutional email address');
  }

  // 5. Validation: Duplicate email check
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    res.status(400);
    throw new Error('An account with this email address already exists');
  }

  // 6. Role normalization
  const normalizedRole = normalizeRole(role);

  // 7. Create user in MongoDB
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: normalizedRole,
    department: department.trim(),
  });

  if (user) {
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        skills: user.skills,
        availability: user.availability,
        createdAt: user.createdAt,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data provided');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide both email and password');
  }

  // 2. Find user by normalized email
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  // 3. Check user existence and verify password
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        skills: user.skills,
        availability: user.availability,
        createdAt: user.createdAt,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get current logged in user details
// @route   GET /api/auth/me
// @access  Private (Protected by authMiddleware)
export const getCurrentUser = asyncHandler(async (req, res) => {
  // req.user is attached by protect middleware
  if (!req.user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      department: req.user.department,
      skills: req.user.skills,
      availability: req.user.availability,
      githubUrl: req.user.githubUrl,
      portfolioUrl: req.user.portfolioUrl,
      createdAt: req.user.createdAt,
    },
  });
});
