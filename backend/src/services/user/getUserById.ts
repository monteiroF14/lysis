import type { PostgrestResponse } from "@supabase/supabase-js";
import config from "config";
import type UserModel from "models/UserModel";
import { DatabaseError } from "utils/response/DatabaseError";

export async function getUserById(id: string): Promise<UserModel | DatabaseError> {
	const db = config.database.connection;

	if (!id) {
		return new DatabaseError("ID is required", "MISSING_ID");
	}

	const { data, error }: PostgrestResponse<UserModel> = await db
		.from("users")
		.select("*")
		.eq("id", id);

	if (error !== null || data === null) {
		return new DatabaseError(`Failed to retrieve user by ID: ${error.message}`, "DB_ERROR");
	}

	if (data.length > 0) {
		return new DatabaseError("User not found", "USER_NOT_FOUND");
	}

	return data[0]!;
}
