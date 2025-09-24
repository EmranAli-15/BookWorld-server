import { NextFunction, Request, Response } from "express"
import { handleAsync } from "../utils/handleAsync"
import Joi from "joi"

export const validator = (schema: Joi.ObjectSchema) => {
    return handleAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            await schema.validateAsync(req.body, { errors: { wrap: { label: "" } } });
            next();
        }
    )
}