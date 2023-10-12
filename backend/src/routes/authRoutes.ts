import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import { User, UserData } from "../types/user/User";
import { Email } from "src/types/user/Email";

const router = Router();

function generateAccessToken(payload: { id?: number; email: Email; expiration: number }) {
	if (!process.env.ACCESS_TOKEN_SECRET) {
		throw new Error("ACCESS_TOKEN_SECRET is not defined");
	}

	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

router.use("/token", async (req: Request, res: Response) => {
	if (!(req.body && typeof req.body === "object" && "token" in req.body)) {
		res.status(400).json({ error: "No token!" });
	}

	const refreshToken = req.body.token;

	const user = await UserModel.getUserByRefreshToken(refreshToken);

	if (!user) {
		return res.sendStatus(403);
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any) => {
		if (err) {
			return res.sendStatus(403);
		}

		const accessToken = generateAccessToken({ id: user.id, email: user.email, expiration: 900 });
		res.json({ accessToken });
	});
});

router.post("/register", async (req: Request, res: Response) => {
	const userData: UserData = req.body;
	const newUser = User.create(userData);

	const newUserDb = await UserModel.createUser(newUser);

	const expirationDate = Date.now() + 15 * 60 * 1000;

	const payload = {
		id: newUserDb.id,
		email: newUserDb.email,
		expiration: expirationDate,
	};

	const accessToken = generateAccessToken(payload);
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);

	await UserModel.addRefreshTokenToUser({
		token: refreshToken,
		userId: payload.id!,
	});

	res.status(201).json({ user: newUser.flatUserData(), accessToken, refreshToken });
});

router.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await UserModel.getUserByEmail(email);

	if (!user || !user.comparePassword(password)) {
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
		userId: payload.id!,
	});

	res.status(200).json({ user: user.flatUserData(), accessToken, refreshToken });
});

router.post("/logout", async (req: Request, res: Response) => {
	const { refreshToken } = req.body;

	const user = await UserModel.getUserByRefreshToken(refreshToken);

	if (user && user.id) {
		await UserModel.removeRefreshTokenFromUser(user.id);
	}

	res.status(200).json({ message: "Logged out successfully" });
});

export { router as authRoutes };
