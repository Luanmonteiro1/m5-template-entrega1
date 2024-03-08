import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/category.services";

export class categoryController {
    private categoryService = new categoryService();

    public create = async (
        { body }: Request,
        res: Response
      ): Promise<Response> => {
        return res.status(201).json(await this.categoryService.create(body));
      };
      public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.categoryService.delete(Number(req.params.id))
        return res.status(204).json()
      } 
}