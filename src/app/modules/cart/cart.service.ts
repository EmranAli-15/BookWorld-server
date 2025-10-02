import { Book } from "../book/book.model";
import { Cart } from "./cart.model"

const saveProduct = async (payload: { userId: string, productId: string }) => {
    const result = await Cart.create(payload);
    return result;
};

const deleteProductFromCart = async (payload: { userId: string, productId: string }) => {
    const result = await Cart.deleteOne({ userId: payload.userId, productId: payload.productId });
    return result;
};

const getMyCart = async (id: string) => {
    const result = await Cart.find({ userId: id }).populate("productId", "name image price quantity");
    return result
};


export const cartService = {
    saveProduct,
    deleteProductFromCart,
    getMyCart
}