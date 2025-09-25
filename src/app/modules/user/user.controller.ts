import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { userService } from "./user.service";


const loginUser = handleAsync(
    async (req: Request, res: Response) => {
        const result = await userService.loginUser(req.body);

        res.status(200).json({
            message: "User login complete.",
            data: result
        })
    }
);

const createUser = handleAsync(
    async (req: Request, res: Response) => {
        const result = await userService.registerUser(req.body);

        res.status(201).json({
            message: "User register complete.",
            data: result
        })
    }
);



export const userController = {
    createUser,
    loginUser
}