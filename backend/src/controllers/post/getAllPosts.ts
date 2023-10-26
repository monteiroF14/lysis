import type { Request, Response } from "express";
import PostService from "services/PostService";

export async function getAllPosts(req: Request, res: Response): Promise<void> {
	try {
		const posts = await PostService.getAllPosts();
		res.json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch posts" });
	}
}
