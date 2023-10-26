import config from "config";
import type UserModel from "models/UserModel";
import { DatabaseError } from "utils/response/DatabaseError";

export async function createUser(user: UserModel): Promise<UserModel | DatabaseError> {
	const db = config.database.connection;

	if (!user) {
		return new DatabaseError("User is required", "MISSING_USER");
	}

	if (!user.password || !user.email) {
		return new DatabaseError("Both password and email are required", "MISSING_PASSWORD_AND_EMAIL");
	}

	const { data, error } = await db.from("users").insert([user]).select();

	if (error !== null) {
		return new DatabaseError(`Failed to create user: ${error.message}`, "DB_ERROR");
	}

	if (data === null) {
		return new DatabaseError("Failed to create user: No data returned", "DB_ERROR");
	}

	return data[0]!;
}
