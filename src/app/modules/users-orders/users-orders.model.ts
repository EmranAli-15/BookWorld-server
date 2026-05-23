import { model, Schema, Types } from "mongoose";
import { TUserOrders } from "./users-orders.interface";

const userOrderSchema = new Schema<TUserOrders>(
    {
        userId: {
            type: Types.ObjectId,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const usersOrders = model("UsersOrder", userOrderSchema);