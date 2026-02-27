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
} from "./fastify-schemas/user.schemas.js"

export default async function userRoutes(festify: FastifyInstance) {
    festify.get("/users", GetUsersSchema, getUsers)

    festify.get("/users/:id", GetUserByIdSchema, getUserById)

    festify.post("/users", CreateUserSchema, createUser)

    festify.patch("/users/:id", UpdateUserSchema, updateUser)

    festify.patch("/users/:id/password", UpdateUserPasswordSchema, updatePassword)

    festify.patch("/users/:id/role", UpdateuserRoleSchema, updateUserRole)

    festify.patch("/users/:id/status", UpdateuserStatusSchema, updateUserStatus)

    festify.delete("/users/:id", DeleteUserSchema, deleteUser)


}