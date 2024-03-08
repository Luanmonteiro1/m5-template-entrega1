import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import { ensure } from "../middlewares/task.middleware";
import { categoryCreateSchema } from "../schemas/category.schema";

export const categoryRouter = Router();
const controller = new categoryController();

categoryRouter.post("/",ensure.bodyIsValid(categoryCreateSchema),controller.create)

categoryRouter.delete("/:id",ensure.findCategoryId, controller.delete)