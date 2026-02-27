export type ResponeType = {
    responseCode: string,
    statusCode: number,
    message: string,
    statusText: string,
    type: "success" | "error"
}

export const SUCCESS: ResponeType = {
    responseCode: "success_001",
    statusCode: 200,
    statusText: "Ok",
    message: "The request has been succesfully proccessed",
    type: "success"
}

export const CREATED: ResponeType = {
    responseCode: "created_001",
    statusCode: 200,
    statusText: "Created",
    message: "The request has been succesfully proccessed",
    type: "success"
}

export const BAD_REQUEST: ResponeType = {
    responseCode: "bad_request_001",
    statusCode: 400,
    statusText: "Bad Request",
    message: "Bad request",
    type: "error"
}

export const UNAUTHORIZED: ResponeType = {
    responseCode: "unauthorized_001",
    statusCode: 401,
    statusText: "Unauthorized",
    message: "Unauthorized access",
    type: "error"
}

export const NOT_FOUND: ResponeType = {
    responseCode: "not_found_001",
    statusCode: 404,
    statusText: "Not Found",
    message: "Resourse not found",
    type: "error"
}

export const METHOD_NOT_ALLOWED: ResponeType = {
    responseCode: "method_not_allowed_001",
    statusCode: 405,
    statusText: "Method Not Allowed",
    message: "Method not allowed",
    type: "error"
}
export const REQUEST_TIMEOUT: ResponeType = {
    responseCode: "time_out_001",
    statusCode: 408,
    statusText: "Request Timeout",
    message: "Request timeout",
    type: "error"
}

export const CONFLICT: ResponeType = {
    responseCode: "conflit_001",
    statusCode: 409,
    statusText: "Conflit",
    message: "Conflict",
    type: "error"
}

export const CONFLICT_USERNAME: ResponeType = {
    responseCode: "conflit_002",
    statusCode: 409,
    statusText: "Conflit",
    message: "The username is not available to be used by another user",
    type: "error"
}

export const CONFLICT_EMAIL: ResponeType = {
    responseCode: "conflit_003",
    statusCode: 409,
    statusText: "Conflit",
    message: "The email is already used by other user",
    type: "error"
}

export const INTERNAL_SERVER_ERROR: ResponeType = {
    responseCode: "internal_server_error_001",
    statusCode: 500,
    statusText: "Internal Server Error",
    message: "An error occurred while processing the request",
    type: "error"
}

export const FORBIDDEN: ResponeType = {
    responseCode: "forbidden_001",
    statusCode: 403,
    statusText: "Forbidden",
    message: "Resource fordidden",
    type: "error"
}

export const UNAUTHORIZED_APP: ResponeType = {
    responseCode: "unauthorized_002",
    statusCode: 401,
    statusText: "Unauthorized",
    message: "Unauthorized app access",
    type: "error"
}

