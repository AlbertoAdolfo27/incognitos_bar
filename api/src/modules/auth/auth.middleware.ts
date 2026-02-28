import "dotenv/config"
import { APIError } from "@/src/shared/api-error/error.js"
import { UNAUTHORIZED, UNAUTHORIZED_APP } from "@/src/shared/app-response/response-type.js"
import { makeResponseError } from "@/src/shared/app-response/response.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import * as argon2 from "argon2"

export async function appAuthMiddleware(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { url } = request
        if (url === "/" || url.startsWith("/documentation")) return

        const apiKey = request.headers["api-key"]
        if (!apiKey || apiKey !== process.env.CLIENT_API_KEY) throw new APIError(UNAUTHORIZED_APP)
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}

export async function userAuthMiddleware(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { authorization } = request.headers
        if (!authorization) throw new APIError(UNAUTHORIZED)

        const [, accessToken] = authorization.split(" ")

        console.log("ACESS TOKEN ===========================", accessToken)

    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}