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


export const userValidation = {
    loginValidation,
    registerValidation
}