import type UserModel from "models/UserModel";
import type { JwtPayload } from "types/JwtPayload";

declare global {
	namespace Express {
		export interface Request {
			jwtPayload: JwtPayload;
			user: UserModel;
		}
	}
}
