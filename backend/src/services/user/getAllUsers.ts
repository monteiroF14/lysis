import config from "config";
import type UserModel from "models/UserModel";
import { DatabaseError } from "utils/response/DatabaseError";

export async function getAllUsers(): Promise<UserModel[] | DatabaseError> {
	const db = config.database.connection;

	const { data, error } = await db.from("users").select("*");

	if (error !== null) {
		return new DatabaseError(`Failed to retrieve users: ${error.message}`, "DB_ERROR");
	}

	if (data === null) {
		return new DatabaseError("Failed to retrieve users", "DB_ERROR");
	}

	return data;
}
