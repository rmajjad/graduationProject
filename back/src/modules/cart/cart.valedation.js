import Joi from 'joi';

export const createCartSchema = Joi.object({
    productId: Joi.string().hex().length(24),
    
});

export const updateQuantitySchema = Joi.object({
    productId: Joi.string().hex().length(24),
    quantity: Joi.number().required(),
    op: Joi.string().optional(),
});

export const removeSchema = Joi.object({
    productId: Joi.string().hex().length(24),
});