import "dotenv/config"
import Fastify from "fastify"
import cors from "@fastify/cors"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import appRoutes from "./src/lib/routes/routes.js"

async function startServer() {

    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: "*"
    })

    await fastify.register(swagger, {
        openapi: {
            openapi: "3.0.0",
            info: {
                title: "Incognitos Bar API",
                description: "",
                version: "1.0.0"
            },
            tags: [
                { name: "users", description: "User related end-points" },
            ],
        }
    })

    await fastify.register(swaggerUi, {
        routePrefix: "/docs",
    })

    fastify.get("/", {
        schema: {
            description: "API Status",
            response: {
                200: {
                    description: "API Status and documentation link",
                    type: "object",
                    properties: {
                        status: { type: "string" },
                        documentation: { type: "string" }
                    }

                }
            }
        }
    }, (request) => {
        return {
            status: "The API is running ok!",
            documentation: `${request.protocol}://${request.host}/docs`
        }
    })
    await fastify.register(appRoutes, { prefix: "/api" })

    fastify.listen({ port: Number(process.env.SERVER_PORT as string), host: "0.0.0.0" }, (error) => {
        if (error) {
            fastify.log.error(error)
            process.exit(1)
        }
    })
}

await startServer()