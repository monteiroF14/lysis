import type { Request, Response } from "express";
import UserModel from "services/UserService";

export async function getAllUsers(req: Request, res: Response): Promise<void> {
	try {
		const users = await UserModel.getAllUsers();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch users" });
	}
}
