import config from "config";
import { DatabaseError } from "utils/response/DatabaseError";

export async function removeRefreshTokenFromUser(id: string): Promise<void | DatabaseError> {
	const db = config.database.connection;

	if (!id) {
		return new DatabaseError("ID is required", "MISSING_USER_ID");
	}

	const { error } = await db.from("users").upsert([{ id: id, refresh_token: null }]);

	if (error !== null) {
		return new DatabaseError(
			`Failed to remove token from user with ID: ${error.message}`,
			"DB_ERROR"
		);
	}
}
