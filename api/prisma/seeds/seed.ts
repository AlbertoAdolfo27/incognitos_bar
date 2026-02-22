import { prisma } from "@/src/infra/database/prisma.js"
import { seedUserRole } from "./seeds/user-role.js"
import { seedUserStatus } from "./seeds/user-status.js"
import { seedFirstAdmin } from "./seeds/user-admin.js"


async function main() {
    await seedUserRole(prisma)
    await seedUserStatus(prisma)
   return await seedFirstAdmin(prisma)
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