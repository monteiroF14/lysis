import type { Request, Response } from "express";
import type { JwtPayload } from "types/JwtPayload";
import { DatabaseError } from "utils/response/DatabaseError";
import { createJwtToken } from "utils/createJwtToken";
import UserService from "services/UserService";
import UserModel from "models/UserModel";

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	const user = await UserService.getUserByEmail(email);

	if (user instanceof DatabaseError) {
		return res.status(401).json({ error: "Invalid credentials" });
	}

	if (!user || !UserModel.comparePassword(user.password?.value!, password)) {
		return res.status(401).json({ error: "Invalid credentials" });
	}

	const jwtPayload: JwtPayload = {
		id: user.id!,
		username: user.username,
		email: user.email,
		role: user.role,
	};

	try {
		const token = createJwtToken(jwtPayload);

		res.header("Authorization", `Bearer ${token}`);
		res.cookie("refreshToken", token, { httpOnly: true });

		res.status(200).json({ message: "Logged in successfully", user });
	} catch {
		res.status(401).json({ message: "Token couldn't be created." });
	}
}
