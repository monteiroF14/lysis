import { Router } from "express";
import { PERMISSIONS } from "config/permissions";
import { createUser, deleteUser, getAllUsers, getUserById } from "controllers/user";
import { checkPermission } from "middleware/checkPermission";

const router = Router();

router
	.route("/")
	.get(checkPermission([PERMISSIONS.USERS_READ]), getAllUsers)
	.post(createUser);

router
	.route("/:id")
	.get(checkPermission([PERMISSIONS.USERS_READ]), getUserById)
	.delete(checkPermission([PERMISSIONS.USERS_DELETE]), deleteUser);

export default router;
