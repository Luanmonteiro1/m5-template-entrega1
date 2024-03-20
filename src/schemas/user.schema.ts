import { z } from "zod";

const userReturnSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(45).min(2),
    email: z.string().max(60).min(10)
})

const userCreateSchema = userReturnSchema.omit({id: true}).extend({password: z.string().max(30).min(4)})

export {userReturnSchema, userCreateSchema}