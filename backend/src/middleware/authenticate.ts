import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "src/types/user/User";

interface RequestUserAuth extends Request {
	user: User;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.header("Authorization");
	const token = authHeader?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Access denied. No token provided." });
	}

	try {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (error: VerifyErrors | null, user: any) => {
			if (error) {
				return res.sendStatus(403);
			}

			(req as RequestUserAuth).user = user;
			next();
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to authenticate." });
	}
}
