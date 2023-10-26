import type { Request, Response } from "express";
import UserService from "services/UserService";

export async function getAllUsers(req: Request, res: Response) {
	try {
		const users = await UserService.getAllUsers();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch users" });
	}
}
