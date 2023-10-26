import { createJwtToken } from "utils/createJwtToken";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "types/JwtPayload";
import { addRefreshTokenToUser } from "services/user";

export async function checkJwt(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.header("Authorization");
	const token = authHeader?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Access denied. No token provided." });
	}

	try {
		const jwtPayload = jwt.verify(token, process.env.JWT_SECRET!);
		req.jwtPayload = jwtPayload as JwtPayload;
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to authenticate." });
	}

	try {
		const newToken = createJwtToken(req.jwtPayload);

		await addRefreshTokenToUser({
			token: newToken,
			id: req.jwtPayload.id,
		});

		res.header("Authorization", `Bearer ${newToken}`);
		res.cookie("refreshToken", newToken, { httpOnly: true });

		return next();
	} catch {
		return res.status(401).json({ message: "Access denied. No token provided." });
	}
}
