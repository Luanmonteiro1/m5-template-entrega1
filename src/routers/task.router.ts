import { Router } from "express";
import { taskController } from "../controllers/task.controller";
import { ensure } from "../middlewares/task.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";

export const taskRouter = Router();
const controller = new taskController();

taskRouter.post(
  "/",
  ensure.bodyIsValid(taskCreateSchema),
  ensure.bodyCategoryExists,
  controller.create
);

taskRouter.get("/", controller.read)

taskRouter.get("/:id",ensure.bodyTaskExists, controller.readId)

taskRouter.patch("/:id",ensure.bodyTaskExists,ensure.bodyIsValid(taskUpdateSchema),controller.update)

taskRouter.delete("/:id",ensure.bodyTaskExists, controller.delete)
