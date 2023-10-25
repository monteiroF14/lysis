import jwt from "jsonwebtoken";
import type Email from "types/user/Email";

export function generateAccessToken(payload: { id?: number; email: Email; expiration: number }) {
	if (!process.env.ACCESS_TOKEN_SECRET) {
		throw new Error("ACCESS_TOKEN_SECRET is not defined");
	}

	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
