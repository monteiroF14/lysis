import { Router } from "express";
import user from "./user";
import post from "./post";
import auth from "./auth";
import { checkJwt } from "middleware/checkJwt";

const router = Router();

router.use("/", auth);
router.use("/users", checkJwt, user);
router.use("/posts", checkJwt, post);

export default router;
