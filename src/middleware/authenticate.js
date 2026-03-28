// src/middleware/authenticate.js

import createHttpError from 'http-errors';
import { findSession } from '../services/authService.js';
import userService from '../services/userService.js';

export const authenticate = async (req, _res, next) => {
  if (!req.cookies.accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  const session = await findSession({ accessToken: req.cookies.accessToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await userService.getUserById(session.userId);

  if (!user) {
    throw createHttpError(401);
  }

  req.user = user;

  next();
};
