import type { Request, Response } from "express";
import UserService from "services/UserService";

export async function createUser(req: Request, res: Response) {
	try {
		const newUser = await UserService.createUser(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to create user" });
	}
}
