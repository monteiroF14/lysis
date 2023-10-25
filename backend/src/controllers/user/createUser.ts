import type { Request, Response } from "express";
import UserModel from "models/UserModel";

export async function createUser(req: Request, res: Response) {
	try {
		const userData = req.body;
		const newUser = await UserModel.createUser(userData);
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to create user" });
	}
}
