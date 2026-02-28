import { FastifyErrorResponse, FastifySuccessResponse } from "@/src/shared/fastify/response-schemas.js";

export const LoginSchema = {
    description: "Login",
    tags: ["auth"],
    body: {
        type: "object",
        required: ["username", "password"],
        properties: {
            username: { type: "string" },
            password: { type: "string" }
        }
    },
    response: {
        200: FastifySuccessResponse({
            accessToken: { type: "string" }
        }, "The user as successfully logged"),
        404: FastifyErrorResponse("Bad Request"),
        401: FastifyErrorResponse("Unauthenticated")
    }
}