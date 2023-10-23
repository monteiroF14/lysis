import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.route("/").get(UserController.getAllUsers).post(UserController.createUser);
router.route("/:id").get(UserController.getUserById).delete(UserController.deleteUser);

export { router as userRoutes };
