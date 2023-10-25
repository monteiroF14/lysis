import type { PERMISSIONS } from "config/permissions";
import type { Request, Response, NextFunction } from "express";
import Admin from "types/user/Admin";
import User from "types/user/User";

export function checkPermission(permissions: PERMISSIONS[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = req.user;

		for (const permission of permissions) {
			if (user instanceof Admin && user.hasPermission(permission)) {
				next();
			} else if (user instanceof User && user.hasPermission(permission)) {
				next();
			} else {
				return res.status(403).json({ error: "Permission denied" });
			}
		}
	};
}
