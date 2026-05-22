import Joi from "joi";

const usersOrders = Joi.object({
    userId: Joi.string().required(),
    status: Joi.string().required()
});


export const usersOrdersValidation = {
    usersOrders
};