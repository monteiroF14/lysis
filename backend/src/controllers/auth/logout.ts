import type { Request, Response } from "express";
import UserModel from "models/UserModel";
import { DatabaseError } from "types/database/error";

export async function logout(req: Request, res: Response) {
	const { refreshToken } = req.body;

	const user = await UserModel.getUserByRefreshToken(refreshToken);

	if (user instanceof DatabaseError) {
		return res.status(401).json({ error: user.message });
	}

	if (user && user.id) {
		await UserModel.removeRefreshTokenFromUser(user.id);
	}

	res.status(200).json({ message: "Logged out successfully" });
}
