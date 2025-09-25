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

const updateCategory = async (id: string, name: string) => {
    const result = await Category.findByIdAndUpdate(id, { name }, { new: true });
    return result;
}

export const categoryService = {
    createCategory,
    updateCategory
}