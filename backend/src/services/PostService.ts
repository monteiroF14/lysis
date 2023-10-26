import { SupabaseClient, type PostgrestResponse } from "@supabase/supabase-js";
import config from "config";
import type PostModel from "models/PostModel";
import { DatabaseError } from "utils/response/DatabaseError";

class PostService {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = config.database.connection;
	}

	async createPost(post: PostModel): Promise<PostModel | DatabaseError> {
		if (!post) {
			return new DatabaseError("Post is required", "MISSING_POST");
		}

		const { data, error } = await this.supabase.from("posts").insert([post]).select();

		if (error !== null) {
			return new DatabaseError(`Failed to create post: ${error.message}`, "DB_ERROR");
		}

		if (data === null) {
			return new DatabaseError("Failed to create post: No data returned", "DB_ERROR");
		}

		return data[0]!;
	}

	async getAllPosts(): Promise<PostModel[] | DatabaseError> {
		const { data, error } = await this.supabase.from("posts").select("*");

		if (error !== null) {
			return new DatabaseError(`Failed to retrieve posts: ${error.message}`, "DB_ERROR");
		}

		if (data === null) {
			return new DatabaseError("Failed to retrieve posts", "DB_ERROR");
		}

		return data;
	}

	async getPostById(id: string): Promise<PostModel | DatabaseError> {
		if (!id) {
			return new DatabaseError("ID is required", "MISSING_ID");
		}

		const { data, error }: PostgrestResponse<PostModel> = await this.supabase
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

	async deletePost(id: string): Promise<void | DatabaseError> {
		if (!id) {
			return new DatabaseError("ID is required", "MISSING_ID");
		}

		const { error } = await this.supabase.from("posts").delete().eq("id", id);

		if (error !== null) {
			return new DatabaseError(`Failed to delete post with ID: ${error.message}`, "DB_ERROR");
		}
	}
}

export default new PostService();
