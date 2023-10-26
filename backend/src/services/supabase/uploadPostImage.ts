import config from "config";
import { StorageError } from "utils/response/StorageError";
import type Image from "utils/types/Image";

export async function uploadPostImage(id: string, image: Image) {
	const supabase = config.database.connection;
	const folder = "post-images";
	const fileName = `${id}\\${image.getImageNameFromUrl()}.png`;

	const { data, error } = await supabase.storage.from(folder).upload(fileName, image.dataUrl);

	if (error) {
		return new StorageError(`Failed to upload image to storage: ${error.message}`, "STORAGE_ERROR");
	}

	if (data === null) {
		return new StorageError(`Failed to upload image to storage: no data returned`, "STORAGE_ERROR");
	}

	return data.path;
}
