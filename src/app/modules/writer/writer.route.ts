import express from "express";
import { validator } from "../../middlewares/validator";
import { writerValidation } from "./writer.validation";
import { auth } from "../../middlewares/auth";
import { writerController } from "./writer.controller";
const route = express.Router();

route.post("/writer/createWriter", validator(writerValidation.createWriterValidation), auth("admin"), writerController.createWriter);

route.put("/writer/updateWriter/:id", validator(writerValidation.updateWriterValidation), auth("admin"), writerController.updateWriter);

export const writerRoutes = route;
