import { model, Schema, Types } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        category: {
            type: Types.ObjectId,
            required: true,
            ref: "Category"
        },
        price: {
            type: Number,
            required: true
        },
        writer: {
            type: Types.ObjectId,
            required: true,
            ref: "Writer"
        },
        rating: {
            type: Number,
            required: false,
            default: 4.5,
            max: 5,
            min: 1
        },
        summary: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const Book = model("Book", bookSchema);