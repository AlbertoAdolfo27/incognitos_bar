import { fastify, type FastifyInstance } from "fastify"
import { getUserById, getUsers } from "./user.controlers.js"
import { GetUserByIdSchema, GetUsersSchema } from "./fastify-schemas/user.schemas.js"

export default async function userRoutes(festify: FastifyInstance) {
    festify.get("/users", GetUsersSchema, getUsers)

    festify.get("/users/:id", GetUserByIdSchema, getUserById)
}