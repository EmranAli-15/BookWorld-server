import { Request, Response } from "express"
import AppError from "../../errors/AppError"
import { handleAsync } from "../../utils/handleAsync"

const createGategory = handleAsync((req: Request, res: Response) => {
    throw new AppError(404, "No way chance")
})



export const categoryController = {
    createGategory
}