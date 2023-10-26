import type { Request, Response } from "express";
import { deleteUser as deleteUserService } from "services/user";

export async function deleteUser(req: Request, res: Response) {
	try {
		await deleteUserService(req.params.id!);
		res.status(204).end();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to delete user" });
	}
}
