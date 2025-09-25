import Joi from 'joi';

const createCategorySchema = Joi.object({
    name: Joi.string().required()
});

const updateCategorySchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required()
});


export const categoryValidation = {
    createCategorySchema,
    updateCategorySchema
}