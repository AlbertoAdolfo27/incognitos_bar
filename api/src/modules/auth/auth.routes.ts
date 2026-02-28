import type { FastifyInstance } from "fastify"
import { login } from "./auth.controller.js"
import { LoginSchema } from "./auth.schemas.js"


export async function authRoutes(fastify: FastifyInstance) {
    await fastify.register(fastify => {
        fastify.post("/login", {schema: LoginSchema}, login)
    }, { prefix: "/auth" })
}