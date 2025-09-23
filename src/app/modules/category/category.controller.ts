import { Request, Response } from "express"
import AppError from "../../errors/AppError"

const createGategory = async (req: Request, res: Response) => {
    try {
        throw new AppError(500, "no way")
    } catch (error:any) {
        return res.status(500).json({
            message: error.message
        })
    }
}



export const categoryController = {
    createGategory
}