import createHttpError from 'http-errors';

export const authenticateRefresh = async (req, _res, next) => {
  if (!req.cookies.refreshToken) {
    throw createHttpError(401, 'Missing refresh token');
  }

  if (!req.cookies.sessionId) {
    throw createHttpError(401, 'Missing session ID');
  }

  next();
};
