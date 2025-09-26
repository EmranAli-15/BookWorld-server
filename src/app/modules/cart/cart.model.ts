import { model, Schema, Types } from "mongoose";
import { TCart } from "./cart.interface";

const cartSchema = new Schema<TCart>(
    {
        userId: {
            type: Types.ObjectId,
            required: true
        },
        productId: {
            type: Types.ObjectId,
            required: true,
            ref: "Book"
        }
    },
    {
        timestamps: true
    }
);

export const Cart = model("Cart", cartSchema);