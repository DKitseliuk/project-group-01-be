// src/validations/authValidation.js

import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name should have at least {#limit} characters',
      'string.max': 'Name should have at most {#limit} characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().max(64).required().messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be valid',
      'string.max': 'Email should have at most {#limit} characters',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).max(128).required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have at least {#limit} characters',
      'string.max': 'Password should have at most {#limit} characters',
      'any.required': 'Password is required',
    }),
  }),
};
export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
      email: Joi.string().email().max(64).required().messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be valid',
      'string.max': 'Email should have at most {#limit} characters',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).max(128).required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have at least {#limit} characters',
      'string.max': 'Password should have at most {#limit} characters',
      'any.required': 'Password is required',
    }),
  }),
};


export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
     email: Joi.string().email().max(64).required().messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be valid',
      'string.max': 'Email should have at most {#limit} characters',
      'any.required': 'Email is required',
    }),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).max(128).required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have at least {#limit} characters',
      'string.max': 'Password should have at most {#limit} characters',
      'any.required': 'Password is required',
    }),
    token: Joi.string().required().messages({
      'string.base': 'Token must be a string',
      'string.empty': 'Token cannot be empty',
      'any.required': 'Token is required',
    }),
  }),
};
