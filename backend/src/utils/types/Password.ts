import bcrypt from "bcrypt";

class Password {
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

	static async hash(password: string): Promise<string> {
		const saltRounds = 10;
		return bcrypt.hash(password, saltRounds);
	}

	static compare(userPassword: string, candidatePassword: string): Promise<boolean> {
		return bcrypt.compare(candidatePassword, userPassword);
	}
}

export default Password;
