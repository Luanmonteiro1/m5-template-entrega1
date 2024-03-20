import { hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { JwtPayload } from "jsonwebtoken";

import { UserCreate, UserReturn } from "../interfaces/user.interfaces";
import { userReturnSchema } from "../schemas/user.schema";

export class userService {
  public create = async (users: UserCreate): Promise<UserReturn> => {
    users.password = await hash(users.password, 10);
    const user = await prisma.user.create({ data: users });
    return userReturnSchema.parse(user);
  };

  public read = async (): Promise<Array<UserReturn>> => {
    return userReturnSchema.array().parse(await prisma.user.findMany());
  };

  public retrieve = async (decoded: JwtPayload): Promise<UserReturn> => {
    const id = Number(decoded.sub!);

    const foundUser = await prisma.user.findFirst({ where: { id } });

    if (!foundUser) {
      throw new AppError("User was disabled.", 403);
    }

    return userReturnSchema.parse(foundUser);
  };
}
