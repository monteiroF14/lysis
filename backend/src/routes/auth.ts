import { Router } from "express";
import { login, logout, newToken, register } from "controllers/auth";

const router = Router();

router.post("/token", newToken);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
