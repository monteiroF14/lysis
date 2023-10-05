// userController.ts

import { Request, Response } from "express";
import { UserModel } from "../models/userModel";

// Example controller for user-related routes
export class UserController {
	constructor(private userModel: UserModel) {}

	async getAllUsers(req: Request, res: Response) {
		const users = await this.userModel.getAllUsers();
		res.json(users);
	}

	async getUserById(req: Request, res: Response) {
		const userId = parseInt(req.params.id, 10);
		const user = await this.userModel.getUserById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	}

	async createUser(req: Request, res: Response) {
		const newUser = req.body;

		// Validate the request body here (e.g., check if required fields are present)
		if (!newUser.name || !newUser.email) {
			return res.status(400).json({ message: "Invalid request" });
		}

		await this.userModel.createUser(newUser);
		res.status(201).json(newUser);
	}

	async updateUser(req: Request, res: Response) {
		const userId = parseInt(req.params.id, 10);
		const updatedUser = req.body;

		// Validate the request body here (e.g., check if required fields are present)
		if (!updatedUser.name || !updatedUser.email) {
			return res.status(400).json({ message: "Invalid request" });
		}

		await this.userModel.updateUser(userId, updatedUser);
		res.json(updatedUser);
	}

	async deleteUser(req: Request, res: Response) {
		const userId = parseInt(req.params.id, 10);
		await this.userModel.deleteUser(userId);
		res.status(204).send();
	}
}
