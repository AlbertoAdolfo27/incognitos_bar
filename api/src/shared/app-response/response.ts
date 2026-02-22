import { INTERNAL_SERVER_ERROR, type ResponeType } from "@/src/shared/app-response/response-type.js"
import { APIError } from "@/src/shared/api-error/error.js"
import type { FastifyReply } from "fastify";


type Response = {
    statusCode: number;
    responseCode: string;
    message?: string;
    data?: object
    error?: string
}

// ------------------------------------------------------------------------------------------------
// Response
export function makeResponse(replay: FastifyReply, responeType: ResponeType, message?: string, data?: object) {

    const response: Response = {
        statusCode: responeType.statusCode,
        responseCode: responeType.responseCode,
    }

    if (responeType.type === "success") {
        response.message = (message && message.length > 0) ? message : responeType.message
        if (data) response.data = data
    } else {
        response.error = responeType.statusText
        response.message = (message && message.length > 0) ? message : responeType.message
    }

    replay.code(responeType.statusCode).send(response)
}

// ------------------------------------------------------------------------------------------------
// Response Error
export function makeResponseError(replay: FastifyReply, error: Error | APIError) {
    if (error instanceof APIError) {
        makeResponse(replay, error.responseType, error.message)
    } else {
        console.log("INTERNAL_ERROR", error.message)
        makeResponse(replay, INTERNAL_SERVER_ERROR, error.message)
    }
}