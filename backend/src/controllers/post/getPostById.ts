import type { Request, Response } from "express";
import { getPostById as getPostByIdService } from "services/post";

export async function getPostById(req: Request, res: Response) {
	try {
		const post = await getPostByIdService(req.params.id!);

		if (!post) {
			res.status(404).json({ message: "Post not found" });
			return;
		}

		res.json(post);
	} catch (error) {
		console.error("Error fetching post by ID:", error);
		res.status(500).json({ message: "An error occurred while fetching the post" });
	}
}
