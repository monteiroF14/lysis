import { Router } from "express";
import UserController from "../controllers/UserController";
import { PERMISSIONS } from "../config/permissions";
import { checkPermission } from "../middleware/permission";

const router = Router();

router
	.route("/")
	.get(checkPermission([PERMISSIONS.USERS_READ]), UserController.getAllUsers)
	.post(UserController.createUser);

router
	.route("/:id")
	.get(checkPermission([PERMISSIONS.USERS_READ]), UserController.getUserById)
	.delete(checkPermission([PERMISSIONS.USERS_DELETE]), UserController.deleteUser);

router
	.route("/:id/role")
	.post(checkPermission([PERMISSIONS.USERS_ROLE_UPDATE]), UserController.updateUserRole);

export { router as userRoutes };
