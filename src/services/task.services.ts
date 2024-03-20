import { prisma } from "../database/prisma";
import {
  TaskCreate,
  TaskReturn,
  taskUpdate,
} from "../interfaces/task.interface";
import {
  taskCreateSchema,
  taskReturnSchema,
  taskSchema,
  taskUpdateSchema,
} from "../schemas/task.schema";

export class taskService {
  public create = async (tasks: TaskCreate, userId: number): Promise<TaskReturn> => {
    const task = await prisma.task.create({ data: {...tasks, userId} });
    return task;
  };

  public read = async (search?: string): Promise<Array<TaskReturn>> => {
    let query: any = { include: { category: true } };

    if (search != undefined) {
      query = {
        ...query,
        where: { category: { name: { equals: search, mode: "insensitive" } } },
      };
    }
    const tasks = await prisma.task.findMany(query);
    return taskReturnSchema.array().parse(tasks);
  };

  public readId = async (taskId: number): Promise<TaskReturn> => {
    const task = await prisma.task.findUnique({ where: { id: taskId }, include: {category: true} });
    return taskReturnSchema.parse(task);
  };

  public patch = async (
    taskId: number,
    data: taskUpdate
  ): Promise<TaskCreate> => {
    const taskUpdate = await prisma.task.update({
      where: { id: taskId },
      data,
    });
    return taskUpdate;
  };

  public delete = async (taskId: number): Promise<void> => {
    await prisma.task.delete({ where: { id: taskId } });
  };
}
