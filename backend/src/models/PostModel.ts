import type Image from "utils/types/Image";

class PostModel {
	id?: string;
	readonly created_by: string;
	readonly synopsis: string;
	readonly title: string;
	readonly created_at: string;
	body: string;
	readonly image_url: Image;

	constructor({
		created_by,
		synopsis,
		title,
		body,
		image_url,
	}: {
		created_by: string;
		synopsis: string;
		title: string;
		body: string;
		image_url: Image;
	}) {
		this.created_by = created_by;
		this.synopsis = synopsis;
		this.title = title;
		this.body = body;
		this.image_url = image_url;
		this.created_at = new Date().toISOString();
	}

	static create({
		created_by,
		synopsis,
		title,
		body,
		image_url,
	}: {
		created_by: string;
		synopsis: string;
		title: string;
		body: string;
		image_url: Image;
	}): PostModel {
		try {
			return new PostModel({
				created_by,
				synopsis,
				title,
				body,
				image_url,
			});
		} catch (error) {
			if (error instanceof Error && error.message) {
				console.error(error.message);
			}

			throw new Error("Failed to create user");
		}
	}

	set addDbID(id: string) {
		this.id = id;
	}
}

export default PostModel;
