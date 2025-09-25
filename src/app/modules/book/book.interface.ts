import { ObjectId } from "mongoose";

export type TBook = {
    name: string,
    category: ObjectId,
    price: number,
    image: string,
    writer: ObjectId,
    rating: number,
    summary: string
};