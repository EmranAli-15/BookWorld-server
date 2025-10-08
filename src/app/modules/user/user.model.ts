import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export const User = model('User', userSchema);