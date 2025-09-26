import AppError from "../../errors/AppError";
import { Category } from "./category.model"

const createCategory = async (category: string) => {
    const isExist = await Category.exists({ name: category });
    if (isExist) {
        throw new AppError(400, `${category} already exist.`);
    }

    const result = await Category.create({ name: category });
    return result;
};

const updateCategory = async ({ id, body }: { id: any, body: any }) => {
    const result = await Category.findByIdAndUpdate(id, body, { new: true });
    return result;
};

const getCategory = async() => {
    const result = await Category.find();
    return result;
}

export const categoryService = {
    createCategory,
    updateCategory,
    getCategory
}