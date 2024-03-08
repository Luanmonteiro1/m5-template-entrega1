import "express-async-errors"
import "reflect-metadata" 
import express, { json } from "express";
import helmet from "helmet";
import { taskRouter } from "./routers/task.router";
import { handleError } from "./middlewares/handleErrrors.middleware";
import { categoryRouter } from "./routers/category.router";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/tasks", taskRouter)

app.use("/categories", categoryRouter)

app.use(handleError);