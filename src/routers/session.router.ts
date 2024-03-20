import { Router } from "express";
import { sessionController } from "../controllers/session.controller";
import { ensure } from "../middlewares/task.middleware";
import { sessionCreateSchema } from "../schemas/session.schema";

export const sessioRouter = Router()
const controller = new sessionController();

sessioRouter.post('/login',ensure.bodyIsValid(sessionCreateSchema), controller.login )
