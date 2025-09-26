import { Request, Response } from "express"
import { handleAsync } from "../../utils/handleAsync"
import { categoryService } from "./category.service"

const createCategory = handleAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await categoryService.createCategory(name);
    res.status(201).json({
        message: "Category created.",
        data: result
    })
});

const updateCategory = handleAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const result = await categoryService.updateCategory({ id, body });

    res.status(201).json({
        message: "Category updated.",
        data: result
    })
});

const getCategory = handleAsync(async (req: Request, res: Response) => {
    const result = await categoryService.getCategory();

    res.status(200).json({
        message: "Category retrieved.",
        data: result
    })
});


export const categoryController = {
    createCategory,
    updateCategory,
    getCategory
}