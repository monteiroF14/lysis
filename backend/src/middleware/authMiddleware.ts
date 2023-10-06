import { Request, Response, NextFunction } from "express";
import userModel from "src/models/userModel";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
	const token = req.header("Authorization");

	if (!token) {
		return res.status(401).json({ message: "Access denied. No token provided." });
	}

	try {
		const user = await userModel.getUserByToken(token);

		if (!user) {
			return res.status(401).json({ message: "Invalid token." });
		}

		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to authenticate." });
	}
}
