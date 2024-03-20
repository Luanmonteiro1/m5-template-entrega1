import { Request, Response } from "express";
import { userService } from "../services/user.services";
export class userController {
  private userService = new userService();

  public create = async ({body}: Request, res: Response): Promise<Response> => {
    return res.status(201).json(await this.userService.create(body))
  }

  public readId = async (req: Request,res: Response) => {
    const teste = Number(res.locals)
    console.log("entrou", teste)
    // return res.status(200).json(await this.userService.getUserById(Number(res.locals.decoded.sub)))
  }
  public retrieve = async (_req: Request, res: Response): Promise<Response> => {
    const { decoded } = res.locals;
    const user = await this.userService.retrieve(decoded);
    return res.status(200).json(user);
  };
}