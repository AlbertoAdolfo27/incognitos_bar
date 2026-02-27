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
    festify.register((festify: FastifyInstance) => {
        
        festify.get("/", { schema: GetUsersSchema }, getUsers)

        festify.get("/:id", { schema: GetUserByIdSchema }, getUserById)

        festify.post("/", { schema: CreateUserSchema }, createUser)

        festify.patch("/:id", { schema: UpdateUserSchema }, updateUser)

        festify.patch("/:id/password", { schema: UpdateUserPasswordSchema }, updatePassword)

        festify.patch("/:id/role", { schema: UpdateuserRoleSchema }, updateUserRole)

        festify.patch("/:id/status", { schema: UpdateuserStatusSchema }, updateUserStatus)

        festify.delete("/:id", { schema: DeleteUserSchema }, deleteUser)

    }, { prefix: "/users" })
}