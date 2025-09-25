import Joi from "joi";

const createWriterValidation = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().allow(''),
    summary: Joi.string().allow(''),
});

const updateWriterValidation = Joi.object({
    name: Joi.string(),
    image: Joi.string().allow(''),
    summary: Joi.string().allow(''),
});

export const writerValidation = {
    createWriterValidation,
    updateWriterValidation
};