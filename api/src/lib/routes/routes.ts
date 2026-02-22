import type { FastifyInstance } from "fastify"
import userRoutes from "@/src/modules/users/user.routes.js";

export default async function appRoutes(festify: FastifyInstance) {
    festify.register(userRoutes)
}