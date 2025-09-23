import { NextFunction, Request, Response } from "express"

export const validator = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = await schema.validate(req.body, { errors: { wrap: { label: "" } } });
        if (result.error) {
            return res.status(500).json({
                message: "Joi error"
            })
        }
        next();
    }
}