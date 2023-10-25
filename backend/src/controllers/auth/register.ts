import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "models/UserModel";
import User, { type UserData } from "types/user/User";
import { generateAccessToken } from "./generateAccessToken";

export async function register(req: Request, res: Response) {
	const userData: UserData = req.body;
	const newUser = await User.create(userData);

	const user = await UserModel.createUser(newUser);

	if (user instanceof Error) {
		return res.status(400).json({ error: "Could not create user" });
	}

	const expirationDate = Date.now() + 15 * 60 * 1000;

	const payload = {
		id: user.id,
		email: user.email,
		expiration: expirationDate,
	};

	const accessToken = generateAccessToken(payload);
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);

	await UserModel.addRefreshTokenToUser({
		token: refreshToken,
		id: payload.id!,
	});

	res.header("Authorization", `Bearer ${accessToken}`);
	res.cookie("refreshToken", refreshToken, { httpOnly: true });

	res.status(201).json({
		message: "User registration successful.",
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
		},
	});
}
