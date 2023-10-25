import { Router } from "express";
import { authenticate } from "middleware/authenticate";
import user from "./user";
import auth from "./auth";

const router = Router();

router.use("/", auth);
router.use("/users", authenticate, user);

export default router;
