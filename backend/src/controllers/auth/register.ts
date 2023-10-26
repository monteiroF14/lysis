import type { Request, Response } from "express";
import UserModel from "models/UserModel";
import { createUser } from "services/user";

export async function register(req: Request, res: Response) {
	const newUser = await UserModel.create({
		email: req.body.email,
		password: req.body.password,
		username: UserModel.getUsername(req.body.email),
	});

	const user = await createUser(newUser);

	if (user instanceof Error) {
		return res.status(400).json({ error: "Could not create user" });
	}

	req.user = user;

	res.status(201).json({
		message: "User registration successful.",
		user,
	});
}
