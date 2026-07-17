import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Book } from "../book/book.model";
import { TUserOrders } from "./users-orders.interface";
import { usersOrders } from "./users-orders.model";
import { orderedProducts } from "../ordered-products/ordered-products.model";

class UsersOrdersService {
    async createOrder(payload: TUserOrders) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const products = payload.products;
            const productIds = products.map(p => p.productId);

            const getProducts = await Book.find({ _id: { $in: productIds } }).session(session);

            if (getProducts.length !== products.length) {
                throw new AppError(404, "Some products are missing or unavailable.");
            }

            const userOrderData = {
                userId: payload.userId,
                status: "pending"
            };

            const userOrder = await usersOrders.create([userOrderData], { session });

            const orderedProductsData = getProducts.map(book => {
                const bookIdStr = book._id.toString();

                const matchedProduct = products.find(p => p.productId.toString() === bookIdStr);

                return {
                    orderedId: userOrder[0]?._id,
                    productId: book._id,
                    price: book.price,
                    quantity: matchedProduct ? matchedProduct.quantity : 0
                };
            });

            const createdOrderedProducts = await orderedProducts.insertMany(orderedProductsData, { session });

            await session.commitTransaction();

            return {
                order: userOrder[0],
                products: createdOrderedProducts
            };

        } catch (error: any) {
            await session.abortTransaction();
            throw new AppError(500, error.message || "Order submission failed.");
        } finally {
            await session.endSession();
        }
    };

    // async getMyOrder(userId: string) {
    //     const result = await usersOrders.aggregate([
    //         {
    //             $match: { userId: new mongoose.Types.ObjectId(userId) }
    //         },
    //         {
    //             $lookup: {
    //                 from: "orderedproducts",
    //                 localField: "_id",
    //                 foreignField: "orderedId",
    //                 as: "all_orders"
    //             }
    //         },
    //         {
    //             $unwind: {
    //                 path: "$all_orders"
    //             }
    //         },
    //         {
    //             $lookup: {
    //                 from: "books",
    //                 localField: "all_orders.productId",
    //                 foreignField: "_id",
    //                 as: "all_orders.product_details"
    //             }
    //         },
    //         {
    //             $unwind: {
    //                 path: "$all_orders.product_details"
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: "$_id",
    //                 status: { $first: "$status" },
    //                 createdAt: { $first: "$createdAt" },
    //                 all_orders: { $push: "$all_orders" },
    //             }
    //         },
    //         {
    //             $project: {
    //                 "status": 1,
    //                 "createdAt": 1,
    //                 "all_orders.price": 1,
    //                 "all_orders.quantity": 1,
    //                 "all_orders.productId": 1,
    //                 "all_orders.product_details.name": 1,
    //                 "all_orders.product_details.image": 1,
    //                 "all_orders.product_details.price": 1,
    //             }
    //         }
    //     ])

    //     return result;
    // };

    async getMyOrder(userId: string) {
        const result = await usersOrders.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "orderedproducts",
                    localField: "_id",
                    foreignField: "orderedId",
                    pipeline: [
                        {
                            $lookup: {
                                from: "books",
                                localField: "productId",
                                foreignField: "_id",
                                as: "product_details"
                            }
                        },
                        {
                            $unwind: { path: "$product_details" }
                        },
                        {
                            $project: {
                                price: 1,
                                quantity: 1,
                                productId: 1,
                                "product_details.name": 1,
                                "product_details.image": 1,
                                "product_details.price": 1
                            }
                        }
                    ],
                    as: "all_orders"
                }
            },
            {
                $sort: { createdAt: -1 } // -1 for Newest First, 1 for Oldest First
            },
            {
                $project: {
                    status: 1,
                    createdAt: 1,
                    all_orders: 1
                }
            }
        ]);

        return result;
    };

    async getPendingOrder(){
        const result = await usersOrders.find({status: "pending"});
        return result;
    }
}

export const usersOrdersService = new UsersOrdersService();