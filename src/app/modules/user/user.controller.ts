import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { userService } from "./user.service";
import { BaseController } from "../../utils/baseController";



class UserController extends BaseController {

    loginUser = handleAsync(
        async (req: Request, res: Response) => {
            const result = await userService.loginUser(req.body);
            this.sendResponse(res, result, "User login complete.");
        }
    );

    googleLogin = handleAsync(
        async (req: Request, res: Response) => {
            const result = await userService.googleLogin(req.body);
            this.sendResponse(res, result, "User login complete.");
        }
    );

    createUser = handleAsync(
        async (req: Request, res: Response) => {
            const result = await userService.registerUser(req.body);
            this.sendResponse(res, result, "User register complete.", 201);
        }
    );

    getUser = handleAsync(
        async (req: Request, res: Response) => {
            const { id } = req.params;
            const result = await userService.getUser(id as string);
            this.sendResponse(res, result, "User retrieved successfully.");
        }
    );

    updateUser = handleAsync(
        async (req: Request, res: Response) => {
            const { id } = req.params;
            const data = req.body
            const result = await userService.updateUser({ id, data });
            this.sendResponse(res, result, "User data update successfully.");
        }
    );
}

export const userController = new UserController();