import { FastifyErrorResponse, FastifySuccessResponse } from "@/src/shared/fastify/response-schemas.js"

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
		required: ["firstname", "lastname", "email", "username", "password", "userRoleId"],
		type: "object",
		properties: {
			firstname: { type: "string" },
			lastname: { type: "string" },
			email: { type: "string" },
			username: { type: "string" },
			password: { type: "string" },
			userRoleId: { type: "string" },
		},
	},
	response: {
		200: FastifySuccessResponse({ user: userResponseSchema }, "The user as been successfully created"),
		400: FastifyErrorResponse("Bad Request"),
		409: FastifyErrorResponse("Conflict"),
		500: FastifyErrorResponse("Internal Server Error"),
	}
}

export const GetUsersSchema = {
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
};

export const GetUserByIdSchema = {
	description: "Get user by id",
	tags: ["users"],
	params: {
		type: "object",
		properties: {
			id: { type: "string" },
		},
	},
	response: {
		200: FastifySuccessResponse({ user: userResponseSchema }),
		400: FastifyErrorResponse("Bad Request"),
		401: FastifyErrorResponse("Internal Server Error"),
		404: FastifyErrorResponse("User Not Found"),
	},
}

export const UpdateUserSchema = {
	description: "Update user",
	tags: ["users"],
	params: {
		type: "object",
		properties: {
			id: { type: "string" }
		}
	},
	body: {
		type: "object",
		properties: {
			firstname: { type: "string" },
			lastname: { type: "string" },
			email: { type: "string" }
		}
	},
	response: {
		200: FastifySuccessResponse({ user: userResponseSchema }, "The user has been successfully updated"),
		404: FastifyErrorResponse("User Not Found"),
		409: FastifyErrorResponse("Conflict")
	}
}

export const UpdateUserPasswordSchema = {
	description: "Update user password",
	tags: ["users"],
	params: {
		type: "object",
		properties: {
			id: { type: "string" }
		}
	},
	body: {
		type: "object",
		required: ["password"],
		properties: {
			password: { type: "string" }
		}
	},
	response: {
		200: FastifySuccessResponse(null, "The user's password has been successfully updated"),
		404: FastifyErrorResponse("User Not found"),
		400: FastifyErrorResponse("Bad Request")
	}
}

export const UpdateuserRoleSchema = {
	description: "Update user role",
	tags: ["users"],
	params: {
		type: "object",
		properties: {
			id: { type: "string" }
		}
	},
	body: {
		type: "object",
		required: ["userRoleId"],
		properties: {
			userRoleId: { type: "string" }
		}
	},
	response: {
		200: FastifySuccessResponse({ user: userResponseSchema }, "The user's role has been successfully updated"),
		404: FastifyErrorResponse("User Not found"),
		400: FastifyErrorResponse("Bad Request")
	}
}

export const UpdateuserStatusSchema = {
	description: "Update user status",
	tags: ["users"],
	params: {
		type: "object",
		properties: {
			id: { type: "string" }
		}
	},
	body: {
		type: "object",
		required: ["userStatusId"],
		properties: {
			userStatusId: { type: "string" }
		}
	},
	response: {
		200: FastifySuccessResponse({ user: userResponseSchema }, "The user's status has been successfully updated"),
		404: FastifyErrorResponse("User Not found"),
		400: FastifyErrorResponse("Bad Request")
	}
}

export const DeleteUserSchema = {
	description: "Delete user",
	tags: ["users"],
	params: {
		type: "object",
		properties: {
			id: { type: "string" }
		}
	},
	response: {
		204: {
			description: "The user has been successfully deleted",
			type: "null"
		},
		404: FastifyErrorResponse("User Not found")
	}
}