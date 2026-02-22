import { makeResponse, makeResponseError } from "@/src/shared/app-response/response.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import * as userService from "./user.service.js"
import { BAD_REQUEST, NOT_FOUND, SUCCESS } from "@/src/shared/app-response/response-type.js"
import { APIError } from "@/src/shared/api-error/error.js"
import type { UserCreateDTO } from "./dtos/user.dtos.js"

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const users = await userService.getUsers()
        makeResponse(reply, SUCCESS, "", { users })
    } catch (error: Error | any) {
        makeResponseError(reply, error)
    }
}

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string } | any
        if (!id) throw new APIError(BAD_REQUEST, `"id" param is missing`)

        const user = await userService.getUserById(id)

        if (!user) throw new APIError(NOT_FOUND, "User not found")
        makeResponse(reply, SUCCESS, "", { user })
    } catch (error: Error | any) {
        makeResponseError(reply, error)
    }
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { 
            firstname,
            lastname,
            email,
            username
         } = request.body as UserCreateDTO

        const user = await userService.addUser({
            firstname,
            lastname,
            email,
            username,
        })
        makeResponse(reply, SUCCESS, "The user has been successfully created", { user })
    } catch (error: Error | any) {
        makeResponseError(reply, error)
    }
}