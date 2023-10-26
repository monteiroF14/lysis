import { SupabaseClient, type PostgrestResponse } from "@supabase/supabase-js";
import config from "config";
import type { SYSTEM_ROLES } from "config/permissions";
import type UserModel from "models/UserModel";
import { DatabaseError } from "utils/response/DatabaseError";

class UserService {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = config.database.connection;
	}

	async createUser(user: UserModel): Promise<UserModel | DatabaseError> {
		if (!user) {
			return new DatabaseError("User is required", "MISSING_USER");
		}

		if (!user.password || !user.email) {
			return new DatabaseError(
				"Both password and email are required",
				"MISSING_PASSWORD_AND_EMAIL"
			);
		}

		const { data, error } = await this.supabase.from("users").insert([user]).select();

		if (error !== null) {
			return new DatabaseError(`Failed to create user: ${error.message}`, "DB_ERROR");
		}

		if (data === null) {
			return new DatabaseError("Failed to create user: No data returned", "DB_ERROR");
		}

		return data[0]!;
	}

	async getAllUsers(): Promise<UserModel[] | DatabaseError> {
		const { data, error } = await this.supabase.from("users").select("*");

		if (error !== null) {
			return new DatabaseError(`Failed to retrieve users: ${error.message}`, "DB_ERROR");
		}

		if (data === null) {
			return new DatabaseError("Failed to retrieve users", "DB_ERROR");
		}

		return data;
	}

	async getUserById(id: number): Promise<UserModel | DatabaseError> {
		if (!id) {
			return new DatabaseError("ID is required", "MISSING_ID");
		}

		const { data, error }: PostgrestResponse<UserModel> = await this.supabase
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

	async getUserByEmail(email: string): Promise<UserModel | DatabaseError> {
		if (!email) {
			return new DatabaseError("Email is required", "MISSING_EMAIL");
		}

		const { data, error }: PostgrestResponse<UserModel> = await this.supabase
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

	async deleteUser(id: number): Promise<void | DatabaseError> {
		if (!id) {
			return new DatabaseError("ID is required", "MISSING_ID");
		}

		const { error } = await this.supabase.from("users").delete().eq("id", id);

		if (error !== null) {
			return new DatabaseError(`Failed to delete user with ID: ${error.message}`, "DB_ERROR");
		}
	}

	async addRefreshTokenToUser({
		token,
		id,
	}: {
		token: string;
		id: string;
	}): Promise<void | DatabaseError> {
		if (!token || !id) {
			return new DatabaseError("Token and ID are required", "MISSING_TOKEN_ID");
		}

		const { error } = await this.supabase
			.from("users")
			.update({ refresh_token: token })
			.eq("id", id);

		if (error !== null) {
			return new DatabaseError(`Failed to add token to user with ID: ${error.message}`, "DB_ERROR");
		}
	}

	async removeRefreshTokenFromUser(id: string): Promise<void | DatabaseError> {
		if (!id) {
			return new DatabaseError("ID is required", "MISSING_USER_ID");
		}

		const { error } = await this.supabase.from("users").upsert([{ id: id, refresh_token: null }]);

		if (error !== null) {
			return new DatabaseError(
				`Failed to remove token from user with ID: ${error.message}`,
				"DB_ERROR"
			);
		}
	}
}

export default new UserService();
