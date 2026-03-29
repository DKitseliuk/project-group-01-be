// src/middleware/notFoundHandler.js

export const notFoundHandler = (req, res, _next) => {
  res.status(404).json({
    message: 'Route not Found',
  });
};
