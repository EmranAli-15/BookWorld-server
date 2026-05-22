import { Request, Response } from "express";
import { BaseController } from "../../utils/baseController";
import { handleAsync } from "../../utils/handleAsync";
import { usersOrdersService } from "./users-orders.service";

class UsersOrdersController extends BaseController {
    createOrder = handleAsync(
        async (req:Request, res:Response) => {
            const data = req.body;
            const result = await usersOrdersService.createOrder(data);

            this.sendResponse(res, result, "User order complete.", 201)
        }
    )
};

export const usersOrdersController = new UsersOrdersController();