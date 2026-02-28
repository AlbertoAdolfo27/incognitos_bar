import { APIError } from "@/src/shared/api-error/error.js"
import { BAD_REQUEST, SUCCESS } from "@/src/shared/app-response/response-type.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import * as authService from "./auth.service.js"
import { makeResponse, makeResponseError } from "@/src/shared/app-response/response.js"

export async function login(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { username, password } = request.body as { username: string, password: string }

        if (!username) throw new APIError(BAD_REQUEST, "Missing username")
        if (!password) throw new APIError(BAD_REQUEST, "Missing password")

        const accessToken = await authService.login(username, password)

        makeResponse(replay, SUCCESS, "The user has been successfully logged", { accessToken })
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}