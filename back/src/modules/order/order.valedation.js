import Joi from 'joi';

export const createOrderSchema = Joi.object({
    address: Joi.string().min(3).max(20).required(),
    phone: Joi.number().required(),
});

export const OrderStatusSchema = Joi.object({
    status: Joi.string().valid('pending','cancelled','confirmed', 'onway', 'delivered').required(),
    orderId: Joi.string().hex().length(24),

});