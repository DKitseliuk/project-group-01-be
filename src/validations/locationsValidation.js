import { Joi, Segments } from "celebrate";

export const createLocationValidation = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(3).max(96).required().trim().messages({
            'string.base': 'Name must be a string',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be less than 96 characters long',
            'string.empty': 'Name is required',
            'string.trim': 'Name cannot contain leading or trailing spaces',
        }),
        type: Joi.string().max(64).required().trim().messages({
            'string.base': 'Type must be a string',
            'string.max': 'Type must be less than 64 characters long',
            'string.empty': 'Type is required',
            'string.trim': 'Type cannot contain leading or trailing spaces',
        }),
        region: Joi.string().max(64).required().trim().messages({
            'string.base': 'Region must be a string',
            'string.max': 'Region must be less than 64 characters long',
            'string.empty': 'Region is required',
            'string.trim': 'Region cannot contain leading or trailing spaces',
        }),
        description: Joi.string().min(20).max(6000).required().trim().messages({
            'string.base': 'Description must be a string',
            'string.min': 'Description must be at least 20 characters long',
            'string.max': 'Description must be less than 6000 characters long',
            'string.empty': 'Description is required',
            'string.trim': 'Description cannot contain leading or trailing spaces',
        }),
        images: Joi.array().items(Joi.string()).required().messages({
            'array.base': 'Images must be an array',
            'array.empty': 'Images is required',
            'array.items': 'Each image must be a string',
        }),
    })
};