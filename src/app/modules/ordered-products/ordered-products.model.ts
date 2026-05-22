import { model, Schema, Types } from "mongoose";

const orderedProductsSchema = new Schema(
    {
        orderedId: {
            type: Types.ObjectId,
            required: true
        },
        productId: {
            type: Types.ObjectId,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    }
);

export const orderedProducts = model("orderedProduct", orderedProductsSchema);