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

const getBooksByCategory = async (id: string) => {
    const result = await Book.find({ category: id });
    return result;
}

const getAllBooks = async ({ pageNum, limitNum }: { pageNum: number, limitNum: number }) => {
    const limit = limitNum || 8;
    const result = await Book.find().skip(pageNum * limit).limit(limit).populate("category", "name").populate("writer", "name");
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
    ]);

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
}