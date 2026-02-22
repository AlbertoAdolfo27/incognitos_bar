import "dotenv/config"
import { PrismaClient } from "@/generated/prisma/client.js"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    port: Number(process.env.DATABASE_PORT as string),
    database: process.env.DATABASE_NAME as string,
    connectionLimit: 5
},)

// ------------------------------------------------------------------------------------------------
// Main prisma client
export const prisma = new PrismaClient({
    adapter: adapter
})
