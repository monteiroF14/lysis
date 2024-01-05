export class UnauthorizedError extends Error {
	constructor() {
		super("Unauthorized.");
	}
}

export class NotSuperAdminError extends Error {
	constructor() {
		super("User is not a super admin.");
	}
}
