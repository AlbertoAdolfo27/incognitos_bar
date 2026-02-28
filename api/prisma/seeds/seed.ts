import { prisma } from "@/src/infra/database/prisma.js"
import { seedUserRole } from "./user-role.js"
import { seedUserStatus } from "./user-status.js"
import { seedFirstAdmin } from "./user-admin.js"


async function main() {
    await seedUserRole(prisma)
    await seedUserStatus(prisma)
    await seedFirstAdmin(prisma)
}

try {
    await main()
    console.log("Seed has been successfully completed:")
    await prisma.$disconnect
    process.exit()
} catch (error: Error | any) {
    console.error("Error on running seed:", error)
    await prisma.$disconnect
    process.exit(1)
}