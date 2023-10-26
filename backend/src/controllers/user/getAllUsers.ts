import type { Request, Response } from "express";
import { getAllUsers as getAllUsersService } from "services/user";

export async function getAllUsers(req: Request, res: Response) {
	try {
		const users = await getAllUsersService();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch users" });
	}
}
