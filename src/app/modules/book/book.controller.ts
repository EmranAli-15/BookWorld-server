import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { bookService } from "./book.service";

const createBook = handleAsync(
    async (req: Request, res: Response) => {
        const result = await bookService.createBook(req.body);

        res.status(201).json({
            message: "Book uploaded.",
            data: result
        });
    }
);

const updateBook = handleAsync(
    async (req: Request, res: Response) => {
        const result = await bookService.updateBook(req.body);

        res.status(201).json({
            message: "Book updated.",
            data: result
        });
    }
);

const getSingleBook = handleAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await bookService.getSilgleBook(id);

        res.status(201).json({
            message: "Book retrived.",
            data: result
        });
    }
);

const getAllBook = handleAsync(
    async (req: Request, res: Response) => {
        const { page, limit } = req.query;
        const pageNum = Number(page)-1;
        const limitNum = Number(limit);

        const result = await bookService.getAllBooks({ pageNum, limitNum });

        res.status(201).json({
            message: "Books retrived.",
            data: result
        });
    }
);

const deleteBook = handleAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await bookService.deleteBook(id);

        res.status(201).json({
            message: "Book deleted.",
            data: result
        });
    }
);

export const bookController = {
    createBook,
    updateBook,
    getSingleBook,
    getAllBook,
    deleteBook,
}