import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { ensureUser } from "../middlewares/user.middleware";
import { ensure } from "../middlewares/task.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { permission } from "../middlewares/permissions.middleware";

export const userRouter = Router();
const controller = new userController();

userRouter.post("/",ensureUser.emailUnique, ensure.bodyIsValid(userCreateSchema),controller.create)

userRouter.get("/profile",permission.isAdminOrOwnerUser, controller.retrieve)
