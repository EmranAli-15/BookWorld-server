import { TUserOrders } from "./users-orders.interface";
import { usersOrders } from "./users-orders.model";

class UsersOrdersService {
    async createOrder(payload: TUserOrders) {
        const result = await usersOrders.insertOne(payload);
        return result
    }
};


export const usersOrdersService = new UsersOrdersService();