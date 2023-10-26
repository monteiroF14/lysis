import type { Request, Response } from "express";
import PostService from "services/PostService";

export async function deletePost(req: Request, res: Response) {
	const postId = req.params.id!;

	try {
		await PostService.deletePost(postId);
		res.status(204).end();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to delete post" });
	}
}
