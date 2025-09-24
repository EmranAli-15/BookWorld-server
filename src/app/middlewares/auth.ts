import { NextFunction, Request, Response } from "express";
import { handleAsync } from "../utils/handleAsync";

type TRole = "admin" | "user";

export const auth = (role: TRole) => {
    return handleAsync(
        async (req: Request, res: Response, next: NextFunction) => {

        }
    )
}