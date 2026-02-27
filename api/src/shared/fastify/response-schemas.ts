export const FastifySuccessResponse = (dataSchema?: object|null, description?: string) => {
    return {
        type: "object",
        description: description ? description : "The request has successfully processed",
        required: ["statusCode", "responseCode"],
        properties: {
            statusCode: {
                type: "integer"
            },
            responseCode: {
                type: "string"
            },
            message: {
                type: "string"
            },
            data: {
                type: "object",
                properties: dataSchema ? dataSchema : {}
            }
        }
    }
}

export const FastifyErrorResponse = (description?: string) => {
    return {
        type: "object",
        description: description ? description : "An error occurs while processing request",
        required: ["statusCode", "error", "message"],
        properties: {
            statusCode: {
                type: "integer"
            },
            responseCode: {
                type: "string"
            },
            message: {
                type: "string"
            },
            error: {
                type: "string"
            }
        }
    }
}
