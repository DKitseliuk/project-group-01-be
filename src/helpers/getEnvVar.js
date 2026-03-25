import 'dotenv/config';

const getEnvVar = (envName, defaultValue) => {
  const env = process.env[envName];

  if (env) return env;

  if (defaultValue) return defaultValue;

  throw new Error(`Env var ${envName} is not set!`);
};

export { getEnvVar };
