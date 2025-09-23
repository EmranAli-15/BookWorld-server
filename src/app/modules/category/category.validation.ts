import Joi from 'joi';

const createCategorySchema = Joi.object({
    name: Joi.string()
});

const updateCategorySchema = Joi.object({
    name: Joi.string()
});


export const categoryValidation = {
    createCategorySchema,
    updateCategorySchema
}