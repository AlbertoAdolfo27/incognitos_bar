import { type FastifyInstance } from "fastify"
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updatePassword,
    updateUser,
    updateUserRole,
    updateUserStatus
} from "./user.controlers.js"
import {
    CreateUserSchema,
    DeleteUserSchema,
    GetUserByIdSchema,
    GetUsersSchema,
    UpdateUserPasswordSchema,
    UpdateuserRoleSchema,
    UpdateUserSchema,
    UpdateuserStatusSchema
} from './user.schemas.js'
import { userAuthMiddleware } from "../auth/auth.middleware.js"

export default async function userRoutes(fastify: FastifyInstance) {
    await fastify.register((fastify: FastifyInstance) => {

        fastify.get("/", { schema: GetUsersSchema, preHandler: [userAuthMiddleware] }, getUsers)

        fastify.get("/:id", { schema: GetUserByIdSchema }, getUserById)

        fastify.post("/", { schema: CreateUserSchema }, createUser)

        fastify.patch("/:id", { schema: UpdateUserSchema }, updateUser)

        fastify.patch("/:id/password", { schema: UpdateUserPasswordSchema }, updatePassword)

        fastify.patch("/:id/role", { schema: UpdateuserRoleSchema }, updateUserRole)

        fastify.patch("/:id/status", { schema: UpdateuserStatusSchema }, updateUserStatus)

        fastify.delete("/:id", { schema: DeleteUserSchema }, deleteUser)

    }, { prefix: "/users" })
}