import Joi from 'joi';

export const createReviewSchema = Joi.object({
    comment: Joi.string().min(3).max(30).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    productId: Joi.string().hex().length(24),
});