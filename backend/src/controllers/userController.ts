import { Request, Response } from "express";
import UserModel from "src/models/UserModel";
import { User } from "src/types/user/User";

class UserController {
	async createUser(req: Request, res: Response, userData: User): Promise<void> {
		try {
			const newUser = await UserModel.createUser(userData);
			res.status(201).json(newUser);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to create user" });
		}
	}

	async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await UserModel.getAllUsers();
			res.json(users);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to fetch users" });
		}
	}

	async getUserById(req: Request, res: Response): Promise<void> {
		const userId = parseInt(req.params.id, 10);
		const user = await UserModel.getUserById(userId);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.json(user);
	}

	async deleteUser(req: Request, res: Response): Promise<void> {
		const userId = parseInt(req.params.id, 10);

		try {
			await UserModel.deleteUser(userId);
			res.status(204).end();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to delete user" });
		}
	}
}

export default new UserController();
