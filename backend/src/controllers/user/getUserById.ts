import type { Request, Response } from "express";
import UserModel from "services/UserService";

export async function getUserById(req: Request, res: Response) {
	const userId = parseInt(req.params.id!, 10);
	const user = await UserModel.getUserById(userId);

	if (!user) {
		res.status(404).json({ message: "User not found" });
		return;
	}

	res.json(user);
}
