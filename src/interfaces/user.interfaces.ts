import { z } from "zod";
import { userCreateSchema, userReturnSchema } from "../schemas/user.schema";

type UserCreate = z.infer<typeof userCreateSchema>
type UserReturn =z.infer<typeof userReturnSchema>

export {UserCreate, UserReturn}