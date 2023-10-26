import type { PostgrestResponse } from "@supabase/supabase-js";
import config from "config";
import type PostModel from "models/PostModel";
import { DatabaseError } from "utils/response/DatabaseError";

export async function getPostById(id: string): Promise<PostModel | DatabaseError> {
	const db = config.database.connection;

	if (!id) {
		return new DatabaseError("ID is required", "MISSING_ID");
	}

	const { data, error }: PostgrestResponse<PostModel> = await db
		.from("posts")
		.select("*")
		.eq("id", id);

	if (error !== null || data === null) {
		return new DatabaseError(`Failed to retrieve post by ID: ${error.message}`, "DB_ERROR");
	}

	if (data.length > 0) {
		return new DatabaseError("Post not found", "POST_NOT_FOUND");
	}

	return data[0]!;
}
