import * as userRepository from "@/src/modules/users/user.repository.js"
import type { UserCreateDTO, UserUpdateDTO } from "./dtos/user.dtos.js"
import { APIError } from "@/src/shared/api-error/error.js"
import { CONFLICT, NOT_FOUND } from "@/src/shared/app-response/response-type.js"

export async function getUsers() {
    return userRepository.getUsers()
}

export async function getUserById(id: string) {
    return userRepository.getUserById(id)
}

export async function getUserByUsername(username: string) {
    return userRepository.getUserByUsername(username)
}

async function checkFoundUser(userID: string) {
    const resUser = await getUserById(userID)
    if (resUser) throw new APIError(NOT_FOUND, "User not found")
}

export async function addUser(user: UserCreateDTO) {
    const resUser = await getUserByUsername(user.username)
    if (resUser) throw new APIError(CONFLICT, `User with email ${user.email} already exist`)

    return userRepository.addUser(user)
}

export async function updateUser(id: string, user: UserUpdateDTO) {
    await checkFoundUser(id)
    return userRepository.updateUser(id, user)
}

export async function updatePassword(id: string, password: string) {
    await checkFoundUser(id)
    return userRepository.updatePassword(id, password)
}

export async function updateUserRole(id: string, userRoleId: string) {
    await checkFoundUser(id)
    return userRepository.updateUserRole(id, userRoleId)
}

export async function updateUserStatus(id: string, userStatusId: string) {
    await checkFoundUser(id)
    return userRepository.updateUserStatus(id, userStatusId)
}

export async function deleteUser(id: string) {
    await checkFoundUser(id)
    return userRepository.deleteUser(id)
}
