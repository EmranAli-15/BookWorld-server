import { Router } from "express";
import { cartController } from "./cart.controller";

const route = Router();

route.post("/cart/addToCart", cartController.saveToCart);

route.delete("/cart/deleteProductFromCart", cartController.deleteProductFromCart);

route.get("/cart/myCart/:id", cartController.getMyCart);

export const cartRoutes = route;