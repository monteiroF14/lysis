import { Router, Request, Response } from "express";
import UserModel from "../models/userModel";

const router = Router();

router
	.route("/")
	.get(async (req: Request, res: Response) => {
		try {
			const users = await UserModel.getAllUsers();
			res.json(users);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to fetch users" });
		}
	})
	.post(async (req: Request, res: Response) => {
		try {
			const userData = req.body;
			const newUser = await UserModel.createUser(userData);
			res.status(201).json(newUser);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to create user" });
		}
	});

router
	.route("/:id")
	.get(async (req: Request, res: Response) => {
		const userId = parseInt(req.params.id, 10);
		const user = await UserModel.getUserById(userId);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.json(user);
	})
	.delete(async (req: Request, res: Response) => {
		const userId = parseInt(req.params.id, 10);

		try {
			await UserModel.deleteUser(userId);
			res.status(204).end();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to delete user" });
		}
	})
	.put(async (req: Request, res: Response) => {
		const userId = parseInt(req.params.id, 10);
		const userData = req.body;

		try {
			const updatedUser = await UserModel.updateUser(userId, userData);
			res.json(updatedUser);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to update user" });
		}
	});

export { router as userRouter };
