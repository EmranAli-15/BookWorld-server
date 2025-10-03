import express from "express";
import { validator } from "../../middlewares/validator";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
const route = express.Router();


route.post("/user/loginUser", validator(userValidation.loginValidation), userController.loginUser);

route.post("/user/registerUser", validator(userValidation.registerValidation), userController.createUser);

route.get("/user/getUser/:id", userController.getUser);

route.post("/user/updateUser/:id", validator(userValidation.updateValidation), userController.updateUser);

export const userRoutes = route;