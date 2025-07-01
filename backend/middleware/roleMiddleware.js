// backend/middleware/roleMiddleware.js

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only.' });
  }
  next();
};

const isUser = (req, res, next) => {
  if (!req.user || req.user.role !== 'user') {
    return res.status(403).json({ message: 'User access only.' });
  }
  next();
};

module.exports = { isAdmin, isUser };
