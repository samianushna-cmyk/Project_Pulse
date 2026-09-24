import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from 'Bearer <token>'
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        res.status(401);
        throw new Error('Not authorized, token missing in Authorization header');
      }

      // Verify token
      const secret = process.env.JWT_SECRET || 'projectpulse_jwt_secure_secret_key_2026';
      const decoded = jwt.verify(token, secret);

      // Fetch user from DB (excluding password)
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user belonging to this token no longer exists');
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error(error.message || 'Not authorized, token failed verification');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no Bearer token provided');
  }
});
