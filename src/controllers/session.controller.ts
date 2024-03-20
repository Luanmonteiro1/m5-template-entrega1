import { Request, Response } from "express";
import { sessionService } from "../services/session.services";

export class sessionController {
  private sessionService = new sessionService();

  public login = async (req: Request, res: Response): Promise<Response> => {
    const token = await this.sessionService.login(req.body);
    return res.status(200).json(token);
  };
}
