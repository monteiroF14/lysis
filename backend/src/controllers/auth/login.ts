import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "models/UserModel";
import { DatabaseError } from "types/database/error";
import User from "types/user/User";
import { generateAccessToken } from "./generateAccessToken";

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	const user = await UserModel.getUserByEmail(email);

	if (user instanceof DatabaseError) {
		return res.status(401).json({ error: "Invalid credentials" });
	}

	if (!user || !User.comparePassword(user.password?.value!, password)) {
		return res.status(401).json({ error: "Invalid credentials" });
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

	res.status(200).json({ message: "Logged in successfully", user: user.flatUserData() });
}
