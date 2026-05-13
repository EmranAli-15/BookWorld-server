import { Response } from "express";

export class BaseController {
    protected sendResponse(res: Response, data: any, message: string, statusCode: number = 200) {
        res.status(statusCode).json({
            message,
            data
        });
    }
}