import Joi from "joi";

export const chatSchema = Joi.object({
    message: Joi.string().min(2).required(),
});