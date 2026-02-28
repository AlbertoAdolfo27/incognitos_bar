
import type { PrismaClient } from "@/generated/prisma/client.js"
import { USER_STATUS_ACTIVE, USER_STATUS_BLOCKED, USER_STATUS_DELETED } from "@/src/modules/users/user.constants.js"

export async function seedUserStatus(prisma: PrismaClient) {
    const userStatus = [
        {
            id: USER_STATUS_ACTIVE,
            name: "active",
            description: "Active user"
        },
        {
            id: USER_STATUS_BLOCKED,
            name: "blocked",
            description: "Blocked user"
        },
        {
            id: USER_STATUS_DELETED,
            name: "deleted",
            description: "Deleted user"
        }
    ]

    try {
        for (const status of userStatus) {
            await prisma.userStatus.upsert(
                {
                    where: { id: status.id },
                    update: status,
                    create: status
                }
            )
        }
    } catch (error) {
        console.error("Error on seed user status:", error)
    }
}
