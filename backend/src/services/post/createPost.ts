import config from "config";
import type PostModel from "models/PostModel";
import { DatabaseError } from "utils/response/DatabaseError";

export async function createPost(post: PostModel): Promise<PostModel | DatabaseError> {
	const db = config.database.connection;

	if (!post) {
		return new DatabaseError("Post is required", "MISSING_POST");
	}

	const { data, error } = await db.from("posts").insert([post]).select();

	if (error !== null) {
		return new DatabaseError(`Failed to create post: ${error.message}`, "DB_ERROR");
	}

	if (data === null) {
		return new DatabaseError("Failed to create post: No data returned", "DB_ERROR");
	}

	return data[0]!;
}
