import express from 'express';
import { categoryController } from './category.controller';
import { validator } from '../../middlewares/validator';
import { categoryValidation } from './category.validation';
const route = express.Router();

route.post('/category/createCategory', validator(categoryValidation.createCategorySchema), categoryController.createGategory);


export const categoryRoutes = route;