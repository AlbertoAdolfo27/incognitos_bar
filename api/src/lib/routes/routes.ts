import type { FastifyInstance } from "fastify"
import userRoutes from "@/src/modules/users/user.routes.js";
import { authRoutes } from "@/src/modules/auth/auth.routes.js";

export default async function appRoutes(festify: FastifyInstance) {
    festify.register(userRoutes)
    festify.register(authRoutes)
}