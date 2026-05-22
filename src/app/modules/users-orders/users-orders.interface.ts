export type TUserOrders = {
    userId: String,
    status: String,
    products: {
        productId: string,
        quantity: number
    }[]
}