import { Router } from "express";
import user from "./user";
import auth from "./auth";
import { checkJwt } from "middleware/checkJwt";

const router = Router();

router.use("/", auth);
router.use("/users", checkJwt, user);

export default router;
