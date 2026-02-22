import { FastifyErrorResponse, FastifySuccessResponse } from "../../../shared/fastify/response-schemas.js"

export const UserRoleResponseSchema = {
	type: "object",
	properties: {
		id: { type: "string" },
		name: { type: "string" },
		description: { type: "string" },
	}
}

export const UserStatusResponseSchema = UserRoleResponseSchema

export const userResponseSchema = {
	type: "object",
	required: ["id", "firstname", "lastname"],
	properties: {
		id: { type: "string" },
		email: { type: "string" },
		username: { type: "string" },
		firstname: { type: "string" },
		lastname: { type: "string" },
		createdAt: { type: "string", format: "date-time" },
		updatedAt: { type: "string", format: "date-time" },
		userStatusId: { type: "string" },
		userRoleId: { type: "string" },
	}
}

export const CreateUserSchema = {
	description: "Create user",
	tags: ["users"],
	body: {
		type: "object",
		properties: {
			fistname: { type: "string" },
			lastname: { type: "string" },
			email: { type: "string" },
		},
	},
	response: {
		200: FastifySuccessResponse({ user: userResponseSchema }, "The user as been successfully created"),
		400: FastifyErrorResponse("Bad request"),
		500: FastifyErrorResponse("Internal server error"),
	},
};

export const GetUsersSchema = {
	schema: {
		description: "Get users",
		tags: ["users"],
		response: {
			200: FastifySuccessResponse({
				users: {
					type: "array",
					items: userResponseSchema
				},
			}),
			500: FastifyErrorResponse("Internal Server Error"),
		},
	}
};

export const GetUserByIdSchema = {
	schema: {
		description: "Get user by id",
		tags: ["users"],
		params: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
			},
		},
		response: {
			200: FastifySuccessResponse({ user: userResponseSchema }),
			400: FastifyErrorResponse("Bad request"),
			401: FastifyErrorResponse("Internal Server Error"),
			404: FastifyErrorResponse("User not found"),
		},
	}
};