import { ROLE_PERMISSIONS, type PERMISSIONS } from "config/permissions";
import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "types/JwtPayload";

export function checkPermission(permissions: PERMISSIONS[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { role } = req.jwtPayload as JwtPayload;

		for (const permission of permissions) {
			const userHasPermission = ROLE_PERMISSIONS[role].includes(permission);

			return userHasPermission ? next() : res.status(401).json({ error: "Unauthorized" });
		}
	};
}
