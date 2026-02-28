import "dotenv/config"
import { APIError } from "@/src/shared/api-error/error.js";
import { UNAUTHORIZED_APP } from "@/src/shared/app-response/response-type.js";
import { makeResponseError } from "@/src/shared/app-response/response.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function appAuthMiddleware(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { url } = request
        if (url === "/" || url.startsWith("/documentation")) return

        const apiKey = request.headers["api-key"]
        if (!apiKey) throw new APIError(UNAUTHORIZED_APP, "Missing API Key")
        if (apiKey !== process.env.CLIENT_API_KEY as string) throw new APIError(UNAUTHORIZED_APP)
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}