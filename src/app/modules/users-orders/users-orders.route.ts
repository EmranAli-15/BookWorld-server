import { Router } from "express";
import { validator } from "../../middlewares/validator";
import { usersOrdersValidation } from "./users-orders.validation";
import { usersOrdersController } from "./users-orders.controller";

const route = Router()

route.post("/users-orders/create-order", validator(usersOrdersValidation.usersOrders), usersOrdersController.createOrder)

export const usersOrdersRoutes = route;