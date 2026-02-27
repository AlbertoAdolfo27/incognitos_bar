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
    deletedAt: false,
    userStatusId: true,
    userRoleId: true,
}

export async function getUsers() {
    return prisma.user.findMany({
        select: userSelects,
        where: { deletedAt: null },
    })
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        select: userSelects,
        where: {
            id,
            deletedAt: null
        }
    })
}

export async function getUserByUsername(username: string, includeDelected: boolean = false) {
    const whereClause = includeDelected ?
        { username } :
        {
            username,
            deletedAt: null
        }

    const selects = { ...userSelects }
    if (includeDelected) selects.deletedAt = true

    return prisma.user.findUnique({
        select: selects,
        where: whereClause
    })
}

export async function getUserByEmail(email: string) {
    return prisma.user.findFirst({
        select: userSelects,
        where: {
            email,
            deletedAt: null
        }
    })
}

export async function addUser(user: UserCreateDTO) {
    return prisma.user.create({
        select: userSelects,
        data: user
    })
}

export async function updateUser(userId: string, user: UserUpdateDTO) {
    return prisma.user.update({
        select: userSelects,
        where: {
            id: userId,
            deletedAt: null
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
            deletedAt: null
        },
        data: { password }
    })
}

export async function updateUserRole(id: string, userRoleId: string) {
    return prisma.user.update({
        select: userSelects,
        where: {
            id,
            deletedAt: null
        },
        data: { userRoleId }
    })
}

export async function updateUserStatus(id: string, userStatusId: string) {
    return prisma.user.update({
        select: userSelects,
        where: {
            id,
            deletedAt: null
        },
        data: { userStatusId }
    })
}

export async function deleteUser(id: string) {
    return prisma.user.update({
        select: { id: true, deletedAt: true },
        where: {
            id,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    })
}