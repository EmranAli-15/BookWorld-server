import express from "express";
import { validator } from "../../middlewares/validator";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
const route = express.Router();


route.post("/user/loginUser", validator(userValidation.loginValidation), userController.loginUser);

route.post("/user/googleLogin", userController.googleLogin);

route.post("/user/registerUser", validator(userValidation.registerValidation), userController.createUser);

route.get("/user/getUser/:id", auth("user"), userController.getUser);

route.post("/user/updateUser/:id", auth("user"), validator(userValidation.updateValidation), userController.updateUser);

export const userRoutes = route;