import express from 'express';
import { categoryController } from './category.controller';
import { validator } from '../../middlewares/validator';
import { categoryValidation } from './category.validation';
import { auth } from '../../middlewares/auth';
const route = express.Router();

route.post('/category/createCategory', validator(categoryValidation.createCategorySchema), auth('admin'), categoryController.createCategory);


export const categoryRoutes = route;