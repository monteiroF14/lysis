import type { Request, Response } from "express";
import PostService from "services/PostService";

export async function createPost(req: Request, res: Response) {
	try {
		const newPost = await PostService.createPost(req.body);
		res.status(201).json(newPost);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to create post" });
	}
}
