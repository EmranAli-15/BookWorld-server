import { Request, Response } from "express";
import { BaseController } from "../../utils/baseController";
import { handleAsync } from "../../utils/handleAsync";
import { usersOrdersService } from "./users-orders.service";

class UsersOrdersController extends BaseController {
    createOrder = handleAsync(
        async (req: Request, res: Response) => {
            const data = req.body;
            const result = await usersOrdersService.createOrder(data);

            this.sendResponse(res, result, "User order complete.", 201);
        }
    );

    getMyOrder = handleAsync(
        async (req: Request, res: Response) => {
            const { userId } = req.params;
            const result = await usersOrdersService.getMyOrder(userId as string);

            this.sendResponse(res, result, "User orders retrieved.", 200);
        }
    );

    getPendingOrder = handleAsync(
        async (req:Request, res:Response) => {
            const result = await usersOrdersService.getPendingOrder();

            this.sendResponse(res, result, "Pending orders retrieved.", 200);
        }
    )
};

export const usersOrdersController = new UsersOrdersController();