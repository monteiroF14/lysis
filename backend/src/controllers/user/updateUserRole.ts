import { SYSTEM_ROLES } from "config/permissions";
import type { Request, Response } from "express";
import UserModel from "models/UserModel";

export async function updateUserRole(req: Request, res: Response) {
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
