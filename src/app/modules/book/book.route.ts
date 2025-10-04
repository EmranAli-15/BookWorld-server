import { Router } from "express";
import { validator } from "../../middlewares/validator";
import { bookValidation } from "./book.validation";
import { auth } from "../../middlewares/auth";
import { bookController } from "./book.controller";
const route = Router();

route.post("/book/createBook", validator(bookValidation.createBookValidation), auth("admin"), bookController.createBook);

route.put("/book/updateBook/:id", validator(bookValidation.updateBookValidation), auth("admin"), bookController.updateBook);

route.get("/book/getSingleBook/:id", bookController.getSingleBook);

route.get("/book/getCategoryBook/:id", bookController.getbooksByCategory);

route.get("/book/getAllBooks", bookController.getAllBook);

route.get("/book/searchBook", bookController.searchBook);

route.delete("/book/deleteBook/:id", bookController.deleteBook);



export const bookRoutes = route;