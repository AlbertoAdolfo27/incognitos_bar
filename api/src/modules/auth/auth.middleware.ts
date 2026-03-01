import "dotenv/config"
import { APIError } from "@/src/shared/api-error/error.js"
import { UNAUTHORIZED, UNAUTHORIZED_APP } from "@/src/shared/app-response/response-type.js"
import { makeResponseError } from "@/src/shared/app-response/response.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import * as jose from "jose"

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
        if (!accessToken) throw new APIError(UNAUTHORIZED)

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)

            const res = await jose.jwtVerify(accessToken, secret, {
                issuer  : "urn:incognitos_bar:issuer",
                audience: "urn:incognitos_bar:audience"
            })
        } catch (error) {
            throw new APIError(UNAUTHORIZED)
        }

    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}