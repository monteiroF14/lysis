import jwt from "jsonwebtoken";
import type { Email } from "../types/user/Email";
import UserModel from "../models/UserModel";
import type { Request, Response } from "express";
import User, { type UserData } from "../types/user/User";
import { DatabaseError } from "../types/database/DatabaseError";

class AuthController {
	register = async (req: Request, res: Response) => {
		const userData: UserData = req.body;
		const newUser = User.create(userData);

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

		const accessToken = this.generateAccessToken(payload);
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
	};

	async login(req: Request, res: Response) {
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

		const accessToken = this.generateAccessToken(payload);
		const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);

		await UserModel.addRefreshTokenToUser({
			token: refreshToken,
			id: payload.id!,
		});

		res.header("Authorization", `Bearer ${accessToken}`);
		res.cookie("refreshToken", refreshToken, { httpOnly: true });

		res.status(200).json({ message: "Logged in successfully", user: user.flatUserData() });
	}

	async logout(req: Request, res: Response) {
		const { refreshToken } = req.body;

		const user = await UserModel.getUserByRefreshToken(refreshToken);

		if (user instanceof DatabaseError) {
			return res.status(401).json({ error: user.message });
		}

		if (user && user.id) {
			await UserModel.removeRefreshTokenFromUser(user.id);
		}

		res.status(200).json({ message: "Logged out successfully" });
	}

	async newToken(req: Request, res: Response) {
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

			const accessToken = this.generateAccessToken({
				id: user.id,
				email: user.email,
				expiration: 900,
			});
			res.json({ accessToken });
		});
	}

	private generateAccessToken(payload: { id?: number; email: Email; expiration: number }) {
		if (!process.env.ACCESS_TOKEN_SECRET) {
			throw new Error("ACCESS_TOKEN_SECRET is not defined");
		}

		return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
	}
}

export default new AuthController();
