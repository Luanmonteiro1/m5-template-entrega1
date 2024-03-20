import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

class HandleErrorMiddleware {
    public static execute = (
      error: Error,
      _req: Request,
      res: Response,
      _next: NextFunction
    ): Response => {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
  
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors });
      }
  
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    };
  }
  
  export const handleError = HandleErrorMiddleware.execute;