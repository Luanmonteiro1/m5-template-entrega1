import { userCreateSchema} from "./user.schema";

const sessionCreateSchema = userCreateSchema.pick({ email: true, password: true })

export { sessionCreateSchema };