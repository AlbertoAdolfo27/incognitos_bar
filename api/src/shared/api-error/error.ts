import type { ResponeType } from "@/src/shared/app-response/response-type.js"

export class APIError extends Error {
    public responseType: ResponeType;

    constructor(responseType: ResponeType, message?: string) {
        if (message && message.length > 0) {
            super(message)
        } else {
            super("")
        }
        this.responseType = responseType
    }
}