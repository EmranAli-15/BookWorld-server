import Joi from "joi";

const loginValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const registerValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
});

const updateValidation = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    image: Joi.string().optional()
});


export const userValidation = {
    loginValidation,
    registerValidation,
    updateValidation
}