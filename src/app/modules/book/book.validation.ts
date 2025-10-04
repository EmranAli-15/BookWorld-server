import Joi from "joi";

const createBookValidation = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().allow(''),
    writer: Joi.string().required(),
    rating: Joi.number(),
    quantity: Joi.number().required(),
    summary: Joi.string().allow('')
});


const updateBookValidation = Joi.object({
    name: Joi.string(),
    category: Joi.string(),
    price: Joi.number(),
    image: Joi.string().allow(''),
    writer: Joi.string(),
    rating: Joi.number(),
    quantity: Joi.number(),
    summary: Joi.string().allow('')
});

export const bookValidation = {
    createBookValidation,
    updateBookValidation
};

