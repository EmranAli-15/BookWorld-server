import express from 'express';
import { categoryController } from './category.controller';
import { validator } from '../../middlewares/validator';
import { categoryValidation } from './category.validation';
import { auth } from '../../middlewares/auth';
const route = express.Router();

route.get('/category/getCategory', categoryController.getCategory);

route.post('/category/createCategory', validator(categoryValidation.createCategorySchema), auth('admin'), categoryController.createCategory);

route.put('/category/updateCategory/:id', validator(categoryValidation.updateCategorySchema), auth('admin'), categoryController.updateCategory);


export const categoryRoutes = route;