import type { PostgrestResponse } from "@supabase/supabase-js";
import config from "config";
import type UserModel from "models/UserModel";
import { DatabaseError } from "utils/response/DatabaseError";

export async function getUserByEmail(email: string): Promise<UserModel | DatabaseError> {
	const db = config.database.connection;

	if (!email) {
		return new DatabaseError("Email is required", "MISSING_EMAIL");
	}

	const { data, error }: PostgrestResponse<UserModel> = await db
		.from("users")
		.select("*")
		.eq("email", email);

	if (error !== null || data === null) {
		return new DatabaseError(`Failed to retrieve user by email: ${error.message}`, "DB_ERROR");
	}

	if (data.length > 0) {
		return new DatabaseError("User not found", "USER_NOT_FOUND");
	}

	return data[0]!;
}
