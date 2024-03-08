import { NextFunction, Request, Response } from "express";
import { taskService } from "../services/task.services";
import { number } from "zod";

export class taskController {
  private taskService = new taskService();

  public create = async (
    { body }: Request,
    res: Response
  ): Promise<Response> => {
    return res.status(201).json(await this.taskService.create(body));
  };

  public read = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return res.status(200).json(await this.taskService.read(req.query.category? String(req.query.category): undefined));
  };

  public readId = async (req: Request,res: Response): Promise<Response> => {
    return res.status(200).json(await this.taskService.readId(Number(req.params.id)))
  }
  
  public update = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(await this.taskService.patch(Number(req.params.id),req.body));
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    await this.taskService.delete(Number(req.params.id))
    return res.status(204).json()
  } 
}
