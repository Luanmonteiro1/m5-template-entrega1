import { z } from "zod";
import { taskCreateSchema, taskSchema, taskUpdateSchema } from "../schemas/task.schema";

type TaskCreate = z.infer<typeof taskCreateSchema>
type taskUpdate = z.infer<typeof taskUpdateSchema>
type TaskReturn = z.infer<typeof taskSchema>

export { TaskCreate, TaskReturn, taskUpdate }