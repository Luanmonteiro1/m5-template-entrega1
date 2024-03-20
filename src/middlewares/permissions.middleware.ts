import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

class PermissionMiddleware {
  public isAdminOrOwnerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userTokenId = Number(res.locals.decoded.sub);
    const userId = Number(res.locals.decoded.sub);

    const userToken = await prisma.user.findFirst({
      where: { id: userTokenId },
    });

    if (!userToken) {
      throw new AppError("Token owner not found", 403);
    }

    if (userToken.id || userId === userTokenId) {
      return next();
    }

    throw new AppError("Insuffient permission", 403);
  };
}

export const permission = new PermissionMiddleware();
