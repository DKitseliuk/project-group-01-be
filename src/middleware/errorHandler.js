//  src/middleware/errorHandler.js

import { isHttpError } from 'http-errors';
import { getEnvVar } from '../helpers/getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

export const errorHandler = (err, _req, res, _next) => {
  const isProd = getEnvVar(ENV_VARS.NODE_ENV) === 'production';

  console.log('Error Middleware:', isProd ? err.message : err);

  if (isHttpError(err)) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  return res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
