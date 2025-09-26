import { ObjectId } from "mongoose"

export type TCart = {
    userId: ObjectId,
    productId: ObjectId
};