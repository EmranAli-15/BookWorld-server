import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { cartService } from "./cart.service";

const saveToCart = handleAsync(
    async (req: Request, res: Response) => {
        const result = await cartService.saveProduct(req.body);

        res.status(201).json({
            message: "Product added to cart.",
            data: result
        });
    }
);

const deleteProductFromCart = handleAsync(
    async (req: Request, res: Response) => {
        const { userId, productId } = req.body;
        const result = await cartService.deleteProductFromCart({ userId, productId });

        res.status(200).json({
            message: "Product removed from cart.",
            data: result
        });
    }
);

const getMyCart = handleAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await cartService.getMyCart(id as string);

        res.status(200).json({
            message: "Cart retrieved.",
            data: result
        });
    }
);

export const cartController = {
    saveToCart,
    deleteProductFromCart,
    getMyCart
};