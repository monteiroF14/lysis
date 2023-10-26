import type { Request, Response } from "express";
import UserModel from "services/UserService";

export async function deleteUser(req: Request, res: Response) {
	const userId = parseInt(req.params.id!, 10);

	try {
		await UserModel.deleteUser(userId);
		res.status(204).end();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to delete user" });
	}
}
