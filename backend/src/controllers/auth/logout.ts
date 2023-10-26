import type { Request, Response } from "express";
import { removeRefreshTokenFromUser } from "services/user";
import { DatabaseError } from "utils/response/DatabaseError";

export async function logout(req: Request, res: Response) {
	const { id } = req.body;

	const user = await removeRefreshTokenFromUser(id);

	if (user instanceof DatabaseError) {
		return res.status(401).json({ error: user.message });
	}

	res.status(200).json({ message: "Logged out successfully" });
}
