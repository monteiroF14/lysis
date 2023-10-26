import type { Request, Response } from "express";
import { getUserById as getUserByIdService } from "services/user";

export async function getUserById(req: Request, res: Response) {
	try {
		const user = await getUserByIdService(req.params.id!);

		if (!user) {
			res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		res.status(500).json({ message: "An error occurred while fetching the user" });
	}
}
