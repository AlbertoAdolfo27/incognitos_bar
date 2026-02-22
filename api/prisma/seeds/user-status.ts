
import type { PrismaClient } from "@/generated/prisma/client.js"
import { USER_STATUS_ACTIVE, USER_STATUS_BLOCKED } from "@/src/modules/users/user.constants.js"

export async function seedUserStatus(prisma: PrismaClient) {
    const userStatus = [
        {
            id: USER_STATUS_ACTIVE,
            name: "active",
            description: "Usuário Activo"
        },
        {
            id: USER_STATUS_BLOCKED,
            name: "blocked",
            description: "Usuário bloqueado"
        }
    ]

    try {
        userStatus.forEach(async status => {
            await prisma.userStatus.upsert(
                {
                    where: { id: status.id },
                    update: status,
                    create: status
                }
            )
        })
    } catch (error) {
        console.error("Error on seed user status:", error)
    }
}
