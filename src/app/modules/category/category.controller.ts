import { Request, Response } from "express"
import AppError from "../../errors/AppError"
import { handleAsync } from "../../utils/handleAsync"
import { categoryService } from "./category.service"

const createCategory = handleAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await categoryService.createCategory(name);
    res.status(201).json({
        message: "Category created.",
        data: result
    })
})



export const categoryController = {
    createCategory
}