import { Task } from "@prisma/client";
import { string, z } from "zod";
import { TaskReturn } from "../interfaces/task.interface";
import { categorySchema } from "./category.schema";

const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1).max(45),
    content: z.string().min(1).max(75),
    categoryId: z.number().nullish(),
    finished: z.boolean().default(false)
})

const taskCreateSchema = taskSchema.omit({id: true, finished: true})
const taskUpdateSchema = taskSchema.omit({id: true, categoryId: true})
const taskReturnSchema = taskSchema.omit({categoryId: true}).extend({category: categorySchema.nullish()})

export {taskSchema, taskCreateSchema, taskUpdateSchema, taskReturnSchema}