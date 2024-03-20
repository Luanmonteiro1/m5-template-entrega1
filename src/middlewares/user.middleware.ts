import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

class EnsureMiddleware {
  public emailUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;
    if (!email) return next();

    const foundUser = await prisma.user.findFirst({ where: { email } });

    if (foundUser) {
      throw new AppError("This email is already registered", 409);
    }

    return next();
  };
}

export const ensureUser = new EnsureMiddleware();