import * as userRepository from "@/src/modules/users/user.repository.js"
import type { UserCreateDTO, UserUpdateDTO } from "./dtos/user.dtos.js"
import { APIError } from "@/src/shared/api-error/error.js"
import { BAD_REQUEST, CONFLICT_EMAIL, CONFLICT_USERNAME, NOT_FOUND } from "@/src/shared/app-response/response-type.js"
import { USER_ROLE_ADMIN, USER_ROLE_CASHIER, USER_STATUS_ACTIVE, USER_STATUS_BLOCKED } from "./user.constants.js"
import * as argon2 from "argon2"

export async function getUsers() {
    return userRepository.getUsers()
}

export async function getUserById(id: string) {
    return userRepository.getUserById(id)
}

export async function getUserByUsername(username: string, includeDelected: boolean = false) {
    return userRepository.getUserByUsername(username, includeDelected)
}

export async function getUserByEmail(email: string) {
    return userRepository.getUserByEmail(email)
}

async function checkFoundUser(userId: string) {
    const user = await getUserById(userId)
    if (!user) throw new APIError(NOT_FOUND, "User not found")
    return user
}

export async function addUser(userCreate: UserCreateDTO) {
    const userByUsername = await getUserByUsername(userCreate.username, true)
    if (userByUsername) throw new APIError(CONFLICT_USERNAME)

    const userByEmail = await getUserByEmail(userCreate.email)
    if (userByEmail) throw new APIError(CONFLICT_EMAIL)

    validatePassword(userCreate.password)

    const hash = await argon2.hash(userCreate.password)
    userCreate.password = hash

    return userRepository.addUser(userCreate)
}

export async function updateUser(userId: string, userUpdate: UserUpdateDTO) {
    const user = await checkFoundUser(userId)

    if (
        userUpdate.firstname === user.firstname &&
        userUpdate.lastname === user.lastname &&
        user.email === user.email
    ) return user

    const userByEmail = await getUserByEmail(userUpdate.email)

    if (userByEmail && (userByEmail.id === user.id)) throw new APIError(CONFLICT_EMAIL)

    return userRepository.updateUser(userId, userUpdate)
}

export async function updatePassword(id: string, password: string) {
    await checkFoundUser(id)
    validatePassword(password)

    const hash = await argon2.hash(password)
    return userRepository.updatePassword(id, hash)
}

function validatePassword(password: string) {
    if (password.length < 8) throw new APIError(BAD_REQUEST, "The password must contains at list 8 characters")
}

export async function updateUserRole(id: string, userRoleId: string) {
    const user = await checkFoundUser(id)
    if (userRoleId !== USER_ROLE_ADMIN && userRoleId !== USER_ROLE_CASHIER) throw new APIError(BAD_REQUEST, "Invalid user role id")

    if (user.userRoleId === userRoleId) return user

    return userRepository.updateUserRole(id, userRoleId)
}

export async function updateUserStatus(id: string, userStatusId: string) {
    const user = await checkFoundUser(id)
    if (userStatusId !== USER_STATUS_ACTIVE && userStatusId !== USER_STATUS_BLOCKED) throw new APIError(BAD_REQUEST, "Invalid user status id")

    if (user.userStatusId === userStatusId) return user

    return userRepository.updateUserStatus(id, userStatusId)
}

export async function deleteUser(id: string) {
    await checkFoundUser(id)
    return userRepository.deleteUser(id)
}
