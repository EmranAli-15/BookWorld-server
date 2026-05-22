import AppError from "../../errors/AppError";
import { Book } from "../book/book.model";
import { TUserOrders } from "./users-orders.interface";
import { usersOrders } from "./users-orders.model";

class UsersOrdersService {
    async createOrder(payload: TUserOrders) {
        const products = payload.products
        const getProducts = await Book.find({_id: {$in: products.map(p => p.productId)}});

        if(getProducts.length != products.length){
            throw new AppError(403, "Some products are missing.");
        }

        const result = await usersOrders.insertOne(payload);

        const data = [];

        for(const book of getProducts){
            const id = book._id.toString();
            const price = book.price;

            const product = products.find(p => p.productId === id);

            const obj = {
                orderedId: result._id,
                price: price,
                productId: id,
                quantity: product?.quantity
            }

            data.push(obj)
        }

        console.log(data)

        return true
    }
};


export const usersOrdersService = new UsersOrdersService();



// async function transferMoney(userId, amount) {
//   // ১. মঙ্গুজ কানেকশন থেকে একটি সেশন শুরু করুন
//   const session = await mongoose.startSession();

//   // ২. সেশনের ভেতরে ট্রানজেকশন শুরু করুন
//   session.startTransaction();

//   try {
//     // ক্রিটিক্যাল নোট: প্রতিটি ডাটাবেজ অপারেশনে অবশ্যই { session } অপশনটি পাস করতে হবে।
    
//     // ৩. প্রথম কালেকশনে অপারেশন (ব্যালেন্স আপডেট)
//     const updatedAccount = await Account.findOneAndUpdate(
//       { userId: userId },
//       { $inc: { balance: -amount } }, // টাকা কেটে নেওয়া হচ্ছে
//       { new: true, session: session } // এই সেশনের অধীনে অপারেশনটি যুক্ত হলো
//     );

//     if (!updatedAccount || updatedAccount.balance < 0) {
//       // পর্যাপ্ত ব্যালেন্স না থাকলে ম্যানুয়ালি এরর থ্রো করছি যেন ক্যাচ ব্লকে চলে যায়
//       throw new Error("Insufficient balance or Account not found!");
//     }

//     // ৪. দ্বিতীয় কালেকশনে অপারেশন (হিস্ট্রি ক্রিয়েট)
//     await TransactionHistory.create(
//       [
//         {
//           userId: userId,
//           amount: amount,
//           type: 'DEBIT',
//         }
//       ],
//       { session: session } // এই সেশনের অধীনে অপারেশনটি যুক্ত হলো
//     );

//     // ৫. দুটি অপারেশনই সফল হলে ডাটাবেজে পার্মানেন্টলি সেভ (Commit) করুন
//     await session.commitTransaction();
//     console.log("Transaction successfully committed!");

//   } catch (error) {
//     // ৬. কোনো এরর হলে পুরো প্রসেস বাতিল (Rollback/Abort) করুন
//     console.error("Transaction failed! Rolling back changes...", error.message);
//     await session.abortTransaction();
    
//   } finally {
//     // ৭. কাজ শেষ হলে (সফল বা ব্যর্থ যাই হোক) সেশনটি অবশ্যই বন্ধ করতে হবে
//     session.endSession();
//   }
// }