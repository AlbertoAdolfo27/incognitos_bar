import { prisma } from "@/src/infra/database/prisma.js"
import type { UserCreateDTO, UserUpdateDTO } from "./dtos/user.dtos.js"

export const userSelects = {
    id: true,
    email: true,
    username: true,
    firstname: true,
    lastname: true,
    createdAt: true,
    updatedAt: true,
    userStatusId: true,
    userRoleId: true,
}

export async function getUsers() {
    return prisma.user.findMany({
        select: userSelects,
        where: { delectedAt: null },
    })
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        select: userSelects,
        where: {
            id,
            delectedAt: null
        }
    })
}

export async function getUserByUsername(username: string) {
    return prisma.user.findUnique({
        select: userSelects,
        where: {
            username,
            delectedAt: null
        }
    })
}

export async function addUser(user: UserCreateDTO) {
    return prisma.user.create({
        select: userSelects,
        data: user
    })
}

export async function updateUser(id: string, user: UserUpdateDTO) {
    return prisma.user.update({
        select: userSelects,
        where: {
            id,
            delectedAt: null
        },
        data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
    })
}

export async function updatePassword(id: string, password: string) {
    return prisma.user.update({
        select: userSelects,
        where: {
            id,
            delectedAt: null
        },
        data: { password }
    })
}

export async function updateUserRole(id: string, userRoleId: string) {
    return prisma.user.update({
        select: userSelects,
        where: {
            id,
            delectedAt: null
        },
        data: { userRoleId }
    })
}

export async function updateUserStatus(id: string, userStatusId: string) {
    return prisma.user.update({
        select: userSelects,
        where: {
            id,
            delectedAt: null
        },
        data: { userStatusId }
    })
}

export async function deleteUser(id: string) {
    return prisma.user.update({
        where: {
            id,
            delectedAt: null
        },
        data: {
            delectedAt: new Date()
        }
    })
}