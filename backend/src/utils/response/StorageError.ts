export class StorageError extends Error {
	code!: string;

	constructor(message: string, code?: string) {
		super(message);

		this.name = "StorageError";

		if (code) {
			this.code = code;
		}

		console.error(message);
	}
}
