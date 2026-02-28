import { prisma } from "@/src/infra/database/prisma.js"

export async function getUserCredentias(username: string) {
    return prisma.user.findUnique({
        select: { id: true, userRoleId: true, password: true },
        where: {
            username
        }
    })
}