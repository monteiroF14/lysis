import type { Request, Response } from "express";
import { deletePost as deletePostService } from "services/post";

export async function deletePost(req: Request, res: Response) {
	try {
		await deletePostService(req.params.id!);
		res.status(204).end();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to delete post" });
	}
}
