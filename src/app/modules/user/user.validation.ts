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
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string(),
    addresss: Joi.string(),
    image: Joi.string()
});


export const userValidation = {
    loginValidation,
    registerValidation,
    updateValidation
}