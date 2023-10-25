import type { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { SYSTEM_ROLES } from "../config/permissions";

class UserController {
	async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await UserModel.getAllUsers();
			res.json(users);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to fetch users" });
		}
	}

	async createUser(req: Request, res: Response) {
		try {
			const userData = req.body;
			const newUser = await UserModel.createUser(userData);
			res.status(201).json(newUser);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to create user" });
		}
	}

	async getUserById(req: Request, res: Response) {
		const userId = parseInt(req.params.id!, 10);
		const user = await UserModel.getUserById(userId);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.json(user);
	}

	async deleteUser(req: Request, res: Response) {
		const userId = parseInt(req.params.id!, 10);

		try {
			await UserModel.deleteUser(userId);
			res.status(204).end();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to delete user" });
		}
	}

	async updateUserRole(req: Request, res: Response) {
		const userId = parseInt(req.params.id!, 10);
		const role = req.params.role as keyof typeof SYSTEM_ROLES;

		if (!role || !(role in SYSTEM_ROLES)) {
			res.status(400).json({ message: "Please provide a valid role" });
		}

		try {
			await UserModel.updateUserRole(userId, role);
			res.status(204).end();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to delete user" });
		}
	}
}

export default new UserController();
