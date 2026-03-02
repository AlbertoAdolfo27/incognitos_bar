import "dotenv/config"
import { APIError } from "@/src/shared/api-error/error.js"
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "@/src/shared/app-response/response-type.js"
import argon2 from "argon2"
import { SignJWT } from "jose"
import { getUserCredentias } from "./auth.repository.js"
import type { FastifyRequest } from "fastify"
import * as jose from "jose"
import { USER_ROLE_ADMIN, USER_ROLE_CASHIER } from "../users/user.constants.js"

const ACCESS_TOKEN_ISSUER = "urn:incognitos-bar:api"
const ACCESS_TOKEN_AUDIENCE = "urn:incognitos-bar:web-app"

export async function login(username: string, password: string) {
    const userCredentials = await getUserCredentias(username)
    if (!userCredentials) throw new APIError(UNAUTHORIZED)

    if (! await argon2.verify(userCredentials.password, password)) throw new APIError(UNAUTHORIZED)

    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
    const alg = "HS256"

    const accessToken = await new SignJWT({ role: userCredentials.userRoleId })
        .setProtectedHeader({ alg })
        .setSubject(userCredentials.id)
        .setIssuedAt()
        .setExpirationTime("1h")
        .setIssuer(ACCESS_TOKEN_ISSUER)
        .setAudience(ACCESS_TOKEN_AUDIENCE)
        .sign(secret)

    return accessToken
}

export async function authenticateUser(request: FastifyRequest, userRole?: string) {
    if (userRole && userRole !== USER_ROLE_ADMIN && userRole !== USER_ROLE_CASHIER)
        throw new APIError(INTERNAL_SERVER_ERROR, "Invalid user role")

    const { authorization } = request.headers
    if (!authorization) throw new APIError(UNAUTHORIZED)

    const [, accessToken] = authorization.split(" ")
    if (!accessToken) throw new APIError(UNAUTHORIZED)

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)

        const { payload, } = await jose.jwtVerify(accessToken, secret, {
            issuer: ACCESS_TOKEN_ISSUER,
            audience: ACCESS_TOKEN_AUDIENCE
        })

        const { sub, role } = payload

        if (userRole && userRole !== role) throw new APIError(UNAUTHORIZED)

        return {
            id: sub,
            role
        }
    } catch (error) {
        throw new APIError(UNAUTHORIZED)
    }
}