import "dotenv/config"
import { hash } from "argon2"
import type { PrismaClient } from "@/generated/prisma/client.js"
import { USER_ROLE_ADMIN } from "@/src/modules/users/user.constants.js"

export async function seedFirstAdmin(prisma: PrismaClient) {
    const firstname = process.env.FISRT_ADMIN_FIRSTNAME as string
    const lastname = process.env.FIRST_ADMIN_LASTNAME as string
    const username = process.env.FIRST_ADMIN_USERNAME as string
    const email = process.env.FIRST_ADMIN_EMAIL as string
    const passwordHash = await hash(process.env.FIRST_ADMIN_PASSWORD as string)

    const user = {
        firstname,
        lastname,
        username,
        email,
        password: passwordHash,
        userRoleId: USER_ROLE_ADMIN,
    }

    try {
        await prisma.user.upsert({
            where: { username: user.username },
            update: {},
            create: user
        })
    } catch (error) {
        console.error("Error on seed first admin:", error)
    }
}