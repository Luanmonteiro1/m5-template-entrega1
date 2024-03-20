import { compare } from "bcryptjs";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { SessionCreate, SessionReturn } from "../interfaces/session.interface";
import { sign } from "jsonwebtoken";
import { userReturnSchema } from "../schemas/user.schema";

export class sessionService {
  public login = async ({
    email,
    password,
  }: SessionCreate): Promise<SessionReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { email } });
    if (!foundUser) {
      throw new AppError("User not exists", 404);
    }

    const pwdMatch = await compare(password, foundUser.password);
    if (!pwdMatch) {
      throw new AppError("Email and password doesn't match", 401);
    }

    const secret = process.env.JWT_SECRET!;
    const expiresIn = process.env.EXPIRIES_IN!;

    const accessToken = sign({ email: foundUser.email }, secret, {
      expiresIn,
      subject: foundUser.id.toString(),
    });

    return { accessToken, user: userReturnSchema.parse(foundUser) };
  };
  // public getUserProfile = async (userId: number): Promise<SessionReturn> => {
  //   const user = await prisma.user.findUnique({ where: { id: userId } });
  //   if(!user) {
  //     throw new AppError("Token is required",401)
  //   }
    
  // };
}
