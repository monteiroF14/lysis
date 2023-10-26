import type { SYSTEM_ROLES } from "config/permissions";
import type Email from "utils/types/Email";

export type JwtPayload = {
	id: string;
	username: string;
	email: Email;
	role: keyof typeof SYSTEM_ROLES;
};
