export enum PERMISSIONS {
	USERS_READ = "users:read",
	USERS_DELETE = "users:delete",

	USERS_ROLE_UPDATE = "users:roles:write",

	POSTS_WRITE = "posts:write",
	POSTS_READ = "posts:read",
	POST_DELETE = "post:delete",
	POST_EDIT_OWN = "post:edit-own",
}

export enum SYSTEM_ROLES {
	SUPER_ADMIN = "SUPER_ADMIN",
	APPLICATION_USER = "APPLICATION_USER",
}

export const ROLE_PERMISSIONS: Record<SYSTEM_ROLES, PERMISSIONS[]> = {
	SUPER_ADMIN: Object.values(PERMISSIONS),
	APPLICATION_USER: [PERMISSIONS.POSTS_READ],
};
