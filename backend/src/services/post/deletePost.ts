import config from "config";
import { DatabaseError } from "utils/response/DatabaseError";

export async function deletePost(id: string): Promise<void | DatabaseError> {
	const db = config.database.connection;

	if (!id) {
		return new DatabaseError("ID is required", "MISSING_ID");
	}

	const { error } = await db.from("posts").delete().eq("id", id);

	if (error !== null) {
		return new DatabaseError(`Failed to delete post with ID: ${error.message}`, "DB_ERROR");
	}
}
