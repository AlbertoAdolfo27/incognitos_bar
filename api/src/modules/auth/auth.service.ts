import "dotenv/config"
import { APIError } from "@/src/shared/api-error/error.js"
import { UNAUTHORIZED } from "@/src/shared/app-response/response-type.js"
import argon2 from "argon2"
import { SignJWT } from "jose"
import { getUserCredentias } from "./auth.repository.js"

export async function login(username: string, password: string) {
    const userCredentials = await getUserCredentias(username)
    if (!userCredentials) throw new APIError(UNAUTHORIZED)

    if (! await argon2.verify(userCredentials.password, password)) throw new APIError(UNAUTHORIZED)

    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
    const alg = "HS256"

    const accessToken = await new SignJWT({ "urn:incognitos_bar:role": userCredentials.userRoleId })
        .setProtectedHeader({ alg })
        .setSubject(userCredentials.id)
        .setIssuedAt()
        .setExpirationTime("1h")
        .setIssuer("urn:incognitos_bar:issuer")
        .setAudience("urn:incognitos_bar:audience")
        .sign(secret)

    return accessToken
}