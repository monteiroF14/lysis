import type Admin from "types/user/Admin";
import type User from "types/user/User";

declare global {
	namespace Express {
		export interface Request {
			user: User | Admin;
		}
	}
}
