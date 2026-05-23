import Joi from "joi";

const usersOrders = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().required()
});


export const usersOrdersValidation = {
    usersOrders
};