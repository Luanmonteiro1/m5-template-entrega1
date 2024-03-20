import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/category.services";

export class categoryController {
    private categoryService = new categoryService();

    public create = async (
        { body }: Request,
        res: Response
      ): Promise<Response> => {
        const userId = Number(res.locals.sub)
        return res.status(201).json(await this.categoryService.create(body, userId));
      };
      public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.categoryService.delete(Number(req.params.id))
        return res.status(204).json()
      } 
}