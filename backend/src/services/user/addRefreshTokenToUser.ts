import config from "config";
import { DatabaseError } from "utils/response/DatabaseError";

export async function addRefreshTokenToUser({
	token,
	id,
}: {
	token: string;
	id: string;
}): Promise<void | DatabaseError> {
	const db = config.database.connection;

	if (!token || !id) {
		return new DatabaseError("Token and ID are required", "MISSING_TOKEN_ID");
	}

	const { error } = await db.from("users").update({ refresh_token: token }).eq("id", id);

	if (error !== null) {
		return new DatabaseError(`Failed to add token to user with ID: ${error.message}`, "DB_ERROR");
	}
}
