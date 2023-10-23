import { SupabaseClient, type PostgrestResponse } from "@supabase/supabase-js";
import User from "../types/user/User";
import { DatabaseError } from "../types/database/error";
import config from "../config";
import type { SYSTEM_ROLES } from "../config/permissions";

class UserModel {
	private supabase: SupabaseClient;

	constructor(supabase: SupabaseClient) {
		this.supabase = supabase;
	}

	async createUser(user: User): Promise<User | DatabaseError> {
		if (!user) {
			return new DatabaseError("User is required", "MISSING_USER");
		}

		if (!user.password || !user.email) {
			return new DatabaseError(
				"Both password and email are required",
				"MISSING_PASSWORD_AND_EMAIL"
			);
		}

		const userObject = user.toDatabaseObject();

		const { data, error } = await this.supabase.from("users").insert([userObject]).select();

		if (error !== null) {
			return new DatabaseError(`Failed to create user: ${error.message}`, "DB_ERROR");
		}

		if (data === null) {
			return new DatabaseError("Failed to create user: No data returned", "DB_ERROR");
		}

		return data[0]!;
	}

	async getAllUsers(): Promise<User[] | DatabaseError> {
		const { data, error } = await this.supabase.from("users").select("*");

		if (error !== null) {
			return new DatabaseError(`Failed to retrieve users: ${error.message}`, "DB_ERROR");
		}

		if (data === null) {
			return new DatabaseError("Failed to retrieve users", "DB_ERROR");
		}

		return data;
	}

	async getUserById(id: number): Promise<User | DatabaseError> {
		if (!id) {
			return new DatabaseError("ID is required", "MISSING_ID");
		}

		const { data, error }: PostgrestResponse<User> = await this.supabase
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

	async getUserByEmail(email: string): Promise<User | DatabaseError> {
		if (!email) {
			return new DatabaseError("Email is required", "MISSING_EMAIL");
		}

		const { data, error }: PostgrestResponse<User> = await this.supabase
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

	async updateUserRole(id: number, role: keyof typeof SYSTEM_ROLES) {
		if (!id || !role) {
			return new DatabaseError("ID and role are required", "MISSING_ID_ROLE");
		}

		const { error } = await this.supabase.from("users").update({ role }).eq("id", id);

		if (error !== null) {
			return new DatabaseError(`Failed to update user role: ${error.message}`);
		}
	}

	async addRefreshTokenToUser({
		token,
		id,
	}: {
		token: string;
		id: number;
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

	async getUserByRefreshToken(token: string): Promise<User | DatabaseError> {
		if (!token) {
			return new DatabaseError("Token is required", "MISSING_TOKEN");
		}

		const { data, error }: PostgrestResponse<User> = await this.supabase
			.from("users")
			.select("*")
			.eq("refresh_token", token);

		if (error !== null || data === null) {
			return new DatabaseError(`Failed to retrieve user by token: ${error.message}`, "DB_ERROR");
		}

		if (data.length > 0) {
			return new DatabaseError("User not found", "USER_NOT_FOUND");
		}

		return data[0]!;
	}

	async removeRefreshTokenFromUser(id: number): Promise<void | DatabaseError> {
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

export default new UserModel(config.database.connection);
