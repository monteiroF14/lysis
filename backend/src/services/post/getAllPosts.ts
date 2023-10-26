import config from "config";
import type PostModel from "models/PostModel";
import { DatabaseError } from "utils/response/DatabaseError";

export async function getAllPosts(): Promise<PostModel[] | DatabaseError> {
	const db = config.database.connection;

	const { data, error } = await db.from("posts").select("*");

	if (error !== null) {
		return new DatabaseError(`Failed to retrieve posts: ${error.message}`, "DB_ERROR");
	}

	if (data === null) {
		return new DatabaseError("Failed to retrieve posts", "DB_ERROR");
	}

	return data;
}
