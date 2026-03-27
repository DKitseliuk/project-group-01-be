export const validateQuery = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.query);

  if (error) {
    return next(error);
  }

  req.query = value; 
  next();
};
