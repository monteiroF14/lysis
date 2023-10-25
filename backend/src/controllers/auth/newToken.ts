import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "models/UserModel";
import { DatabaseError } from "types/database/error";
import { generateAccessToken } from "./generateAccessToken";

export async function newToken(req: Request, res: Response) {
	if (!(req.body && typeof req.body === "object" && "token" in req.body)) {
		res.status(400).json({ error: "No token!" });
	}

	const refreshToken = req.body.token;

	const user = await UserModel.getUserByRefreshToken(refreshToken);

	if (user instanceof DatabaseError) {
		return res.status(401).json({ error: user.message });
	}

	if (!user) {
		return res.sendStatus(403);
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any) => {
		if (err) {
			return res.sendStatus(403);
		}

		const accessToken = generateAccessToken({
			id: user.id,
			email: user.email,
			expiration: 900,
		});
		res.json({ accessToken });
	});
}
