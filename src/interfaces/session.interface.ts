import { z } from "zod";
import { sessionCreateSchema } from "../schemas/session.schema";
import { UserReturn } from "./user.interfaces";

type SessionCreate = z.infer<typeof sessionCreateSchema>
type SessionReturn = {
    accessToken: string
    user: UserReturn
}

export { SessionCreate, SessionReturn }