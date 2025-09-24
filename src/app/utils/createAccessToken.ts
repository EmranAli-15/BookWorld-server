import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const createAccessToken = (jwtPayload: any) => {
    return jwt.sign(
        jwtPayload,
        process.env.TOKEN as string,
        {
            expiresIn: "360 days"
        }
    )
};