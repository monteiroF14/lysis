import { Router } from "express";
import { PERMISSIONS } from "config/permissions";
import { createPost, deletePost, getAllPosts, getPostById } from "controllers/post";
import { checkPermission } from "middleware/checkPermission";

const router = Router();

router
	.route("/")
	.get(getAllPosts)
	.post(checkPermission([PERMISSIONS.POSTS_WRITE]), createPost);

router
	.route("/:id")
	.get(getPostById)
	.delete(checkPermission([PERMISSIONS.POST_DELETE]), deletePost);

export default router;
