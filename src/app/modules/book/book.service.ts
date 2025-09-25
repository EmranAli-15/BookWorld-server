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

const getAllBooks = async (page: number) => {
    const limit = 8;
    const result = await Book.find().skip(page * limit).limit(limit).populate("category").populate("writer");
};


export const bookService = {
    createBook,
    updateBook,
    deleteBook,
    getSilgleBook,
    getAllBooks,
}