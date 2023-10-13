import bcrypt from "bcrypt";

export class Password {
	private readonly password: string;

	private constructor(password: string) {
		this.password = password;
		Object.freeze(this);
	}

	static create(password: string): Password {
		if (!Password.validate(password)) {
			throw new Error(`Invalid password: ${password}`);
		}
		return new Password(password);
	}

	get value(): string {
		return this.password;
	}

	static validate(password: string): boolean {
		if (password.length < 8) {
			return false;
		}

		if (!/[A-Z]/.test(password)) {
			return false;
		}

		if (!/[a-z]/.test(password)) {
			return false;
		}

		if (!/[0-9]/.test(password)) {
			return false;
		}

		return true;
	}

	async compare(candidatePassword: string): Promise<boolean> {
		return bcrypt.compare(candidatePassword, this.password);
	}
}
