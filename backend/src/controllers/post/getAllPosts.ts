import type { Request, Response } from "express";
import { getAllPosts as getAllPostsService } from "services/post";

export async function getAllPosts(req: Request, res: Response): Promise<void> {
	try {
		const posts = await getAllPostsService();
		res.json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch posts" });
	}
}
