import AppError from "../../errors/AppError";
import { Category } from "./category.model"

const createCategory = async (category: string) => {
    const isExist = await Category.exists({ name: category });
    if (isExist) {
        throw new AppError(400, `${category} already exist.`);
    }

    const result = await Category.create({ name: category });
    return result;
}

export const categoryService = {
    createCategory
}