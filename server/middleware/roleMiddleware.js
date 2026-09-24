export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('Authentication required before role authorization');
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `Access forbidden: Role '${req.user.role}' is not authorized to access this resource`
      );
    }

    next();
  };
};
