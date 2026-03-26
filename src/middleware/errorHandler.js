import { HttpError } from 'http-errors';
import { getEnvVar } from '../helpers/getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

export const errorHandler = (err, req, res, _next) => {
  console.log("Error Middleware:", err);


  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = getEnvVar(ENV_VARS.NODE_ENV) === "production";

  return res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
};
