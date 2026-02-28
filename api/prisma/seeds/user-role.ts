
import type { PrismaClient } from "@/generated/prisma/client.js"
import { USER_ROLE_ADMIN, USER_ROLE_CASHIER } from "@/src/modules/users/user.constants.js"

export async function seedUserRole(prisma: PrismaClient) {
    const userRoles = [
        {
            id: USER_ROLE_ADMIN,
            name: "admin",
            description: "Administrator"
        },
        {
            id: USER_ROLE_CASHIER,
            name: "cashier",
            description: "Cashier"
        }

    ]

    try {
        for (const role of userRoles) {
            await prisma.userRole.upsert({
                where: {
                    id: role.id
                },
                update: role,
                create: role
            })
        }
    } catch (error) {
        console.error("Error on seed user roles:", error)
    }
}
