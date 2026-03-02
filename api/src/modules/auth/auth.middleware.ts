import "dotenv/config"
import { APIError } from "@/src/shared/api-error/error.js"
import { UNAUTHORIZED_APP } from "@/src/shared/app-response/response-type.js"
import { makeResponseError } from "@/src/shared/app-response/response.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import { authenticateUser } from "./auth.service.js"

export async function appAuthMiddleware(request: FastifyRequest, replay: FastifyReply) {
    try {
        if (isPublicRoute(request)) return

        const apiKey = request.headers["api-key"]
        if (!apiKey || apiKey !== process.env.CLIENT_API_KEY) throw new APIError(UNAUTHORIZED_APP)
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}

function isPublicRoute(request: FastifyRequest) {
    const { url } = request

    if ((url === "/" || url.startsWith("/documentation") && request.method.toUpperCase() === "GET")) return true


    return false
}