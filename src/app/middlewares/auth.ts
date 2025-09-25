import { NextFunction, Request, Response } from "express";
import { handleAsync } from "../utils/handleAsync";
import { jwtDecode } from "jwt-decode";
import AppError from "../errors/AppError";

type TRole = "admin" | "user";

export const auth = (role: TRole) => {
    return handleAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            
            const token = req.headers.token as string;

            if (!token) { 
                throw new AppError(403, "Not authorized.")
            }

            const decoded = jwtDecode(token) as { role: string };

            if (decoded.role !== role) { 
                throw new AppError(403, "Not authorized.")
            }

            next();
        }
    )
}