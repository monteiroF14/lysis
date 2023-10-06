import { Router } from "express";
import { userRouter } from "./userRoutes";
import { rootRouter } from "./rootRoutes";

const router = Router();

router.use("/", rootRouter);
router.use("/users", userRouter);

export default router;
