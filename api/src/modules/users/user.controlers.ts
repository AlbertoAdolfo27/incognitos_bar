import { makeResponse, makeResponseError } from "@/src/shared/app-response/response.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import * as userService from "./user.service.js"
import { CREATED, NOT_FOUND, SUCCESS } from "@/src/shared/app-response/response-type.js"
import { APIError } from "@/src/shared/api-error/error.js"
import type { UserCreateDTO, UserUpdateDTO } from "./dtos/user.dtos.js"

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
        const { id } = request.params as { id: string }

        const user = await userService.getUserById(id)

        if (!user) throw new APIError(NOT_FOUND, "User not found")
        makeResponse(reply, SUCCESS, "", { user })
    } catch (error: Error | any) {
        makeResponseError(reply, error)
    }
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userCreate = request.body as UserCreateDTO

        const user = await userService.addUser(userCreate)

        makeResponse(reply, CREATED, "The user has been successfully created", { user })
    } catch (error: Error | any) {
        makeResponseError(reply, error)
    }
}

export async function updateUser(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { id } = request.params as { id: string }
        const userUpdate = request.body as UserUpdateDTO
        
        const user = await userService.updateUser(id, userUpdate)

        makeResponse(replay, SUCCESS, "The user has been successfully updated", { user })
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}

export async function updatePassword(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { id } = request.params as { id: string }
        const { password } = request.body as { password: string }

        const user = await userService.updatePassword(id, password)

        makeResponse(replay, SUCCESS, "The user password has been successfully updated", { user })
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}

export async function updateUserRole(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { id } = request.params as { id: string }
        const { userRoleId } = request.body as { userRoleId: string }

        const user = await userService.updateUserRole(id, userRoleId)

        makeResponse(replay, SUCCESS, "The user role has been successfully updated", { user })
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}

export async function updateUserStatus(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { id } = request.params as { id: string }
        const { userStatusId } = request.body as { userStatusId: string }

        const user = await userService.updateUserStatus(id, userStatusId)

        makeResponse(replay, SUCCESS, "The user status has been successfully updated", { user })
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}

export async function deleteUser(request: FastifyRequest, replay: FastifyReply) {
    try {
        const { id } = request.params as { id: string }

        await userService.deleteUser(id)

        replay.code(204)
    } catch (error: Error | any) {
        makeResponseError(replay, error)
    }
}