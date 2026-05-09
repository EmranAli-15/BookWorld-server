import { Types } from "mongoose";
import { TBook } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (payload: TBook) => {
    const result = await Book.create(payload);
    return result;
};

const updateBook = async ({ id, payload }: { id: any, payload: TBook }) => {
    const result = await Book.findByIdAndUpdate(id, { $set: payload }, { new: true });
    return result;
};

const deleteBook = async (id: any) => {
    const result = Book.findByIdAndDelete(id);
    return result;
};

const getSilgleBook = async (id: any) => {
    const result = await Book.findById(id).populate("category", "name").populate("writer", "name");
    return result;
};

const getBooksByCategory = async ({ id, page }: { id: string, page: number }) => {
    const limit = 8;
    const result = await Book.find({ category: id }).skip(page * limit).limit(limit).populate("category", "name").populate("writer", "name");
    return result;
};

const getBooksByWriter = async ({ id }: { id: string}) => {
    const result = await Book.find({ writer: id }).populate("writer")
    return result;
}

const getAllBooks = async ({ pageNum, limitNum }: { pageNum: number, limitNum: number }) => {
    const limit = limitNum || 8;
    const result = await Book.find().skip(pageNum * limit).limit(limit).populate("category", "name").populate("writer", "name");
    // const result:any = await Book.find().populate("category", "name").populate("writer", "name");
    // console.log(result)
    // for(let i=0; i<result.length; i++){
    //     // console.log(`${i+1}) ${result[i]?.name} - (মূল্যঃ ${result[i]?.price} টাকা)`)
        
    //     const text1 = `আমাদের কাছে ${result[i]?.writer?.name}-এর লেখা ${result[i]?.name} বইটি আছে, ${result[i]?.name} বইটির মূল্য বা দাম (মূল্যঃ ${result[i]?.price} টাকা)। We have the *${result[i]?.name}* book by-*${result[i]?.writer?.name}* writer, price of *${result[i]?.name}* book is ${result[i]?.price}`

    //     const text2 = ` ${result[i]?.writer?.name}-এর লেখা ${result[i]?.name} বইটি পাওয়া যাবে। ${result[i]?.name} বইটির দাম (মূল্যঃ ${result[i]?.price} টাকা)। *${result[i]?.name}* by *${result[i]?.writer?.name}* book is in our stock, price of *${result[i]?.name}* book is ${result[i]?.price}`
    //     console.log(text1 + text2)
    // }

    return result;
};

const searchBook = async (text: string) => {
    const books = await Book.aggregate([
        {
            $lookup: {
                from: "writers",
                localField: "writer",
                foreignField: "_id",
                as: "writerData"
            }
        },
        { $unwind: "$writerData" },
        {
            $match: {
                $or: [
                    { name: { $regex: text, $options: "i" } },
                    { "writerData.name": { $regex: text, $options: "i" } }
                ]
            }
        },
        {
            $project: {
                "name": 1,
                "image": 1,
                "price": 1,
                "rating": 1,
                "writerData.name": 1
            }
        }
    ]).limit(4);

    return books;
}


export const bookService = {
    createBook,
    updateBook,
    deleteBook,
    getSilgleBook,
    getAllBooks,
    searchBook,
    getBooksByCategory,
    getBooksByWriter
}