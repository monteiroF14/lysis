import type { Request, Response } from "express";
import PostService from "services/PostService";

export async function getPostById(req: Request, res: Response) {
	const postId = req.params.id!;
	const user = await PostService.getPostById(postId);

	if (!user) {
		res.status(404).json({ message: "Post not found" });
		return;
	}

	res.json(user);
}
