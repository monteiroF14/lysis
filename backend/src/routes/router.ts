import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { authRoutes } from "./authRoutes";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.use("/", authRoutes);
router.use("/users", authenticate, userRoutes);

export default router;
