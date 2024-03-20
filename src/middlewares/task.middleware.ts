import e, { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { prisma } from "../database/prisma";
import { NotFoundError } from "../errors/NotFoundError";
import { AppError } from "../errors/AppError";

class EnsureMiddleware {
  public bodyIsValid =
    (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };

  public bodyCategoryExists = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    if(!req.body.categoryId) {
      return next()
    }
    const foundCategory = await prisma.category.findFirst({
      where: { id: req.body.categoryId },
    });
    if (!foundCategory) throw new AppError("Category not found", 404);
    return next();
  };

  
  public bodyTaskExists = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
 
    const foundTask = await prisma.task.findFirst({
      where: { id: Number(req.params.id) },
      include: {category: true}
    });
    if (!foundTask) throw new AppError("Task not found", 404);
    return next();
  };

  public findCategoryId = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
 
    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(req.params.id) },
    });
    if (!foundCategory) throw new AppError("Category not found", 404);
    return next();
  };

  // public validateTaskId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   const taskId = await prisma.task.findFirst({ where: { id: Number(req.body.taskId) } })
  //   if (!taskId) throw new AppError("")
    
  // }
}



export const ensure = new EnsureMiddleware();
