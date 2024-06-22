import Joi from 'joi';

export const createProductSchema = Joi.object({   
    categoryId: Joi.string().hex().length(24).required(),
    description: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    discount: Joi.number().optional(),
    mainImage: Joi.array().items({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required(),
    }).required(),
    subImages: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
            size: Joi.number().max(5000000).required(),
    })).max(5).optional(), 
});  

export const getPro_CSchema = Joi.object({
    categoryId: Joi.string().hex().length(24).required(),
    page: Joi.number(),
    limit: Joi.number(),
});

export const getAllSchema = Joi.object({
    page: Joi.number(),
    limit: Joi.number(),
});

export const productDetailsSchema = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    
});


export const updateProductSchema = Joi.object({   
    id: Joi.string().hex().length(24).required(),
    description: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    status: Joi.string().valid('Active','NotActive').required(),
    stock: Joi.number().min(0).default(1),
    mainImage: Joi.array().items({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required(),
    }).optional(),
    subImages: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
            size: Joi.number().max(5000000).required(),
    })).max(5).optional(), 
}); 

export const destroySchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    
});
