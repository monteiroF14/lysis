export class DatabaseError extends Error {
	code!: string;

	constructor(message: string, code?: string) {
		super(message);

		this.name = "DatabaseError";

		if (code) {
			this.code = code;
		}

		console.error(message);
	}
}
