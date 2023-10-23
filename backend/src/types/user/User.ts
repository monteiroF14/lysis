import { Email } from "./Email";
import { Password } from "./Password";

export type UserData = {
	username: string;
	email: string;
	password: string;
};

class User {
	public readonly username: string;
	public readonly email: Email;
	private _password?: Password;
	public id?: number;

	constructor({
		username,
		email,
		password,
	}: {
		username: string;
		email: Email;
		password?: Password;
	}) {
		this.username = username;
		this.email = email;
		this._password = password;
	}

	static create(userData: UserData): User {
		try {
			const email = Email.create(userData.email);
			const password = Password.create(userData.password);
			const username = this.getUsername(userData.email);

			return new User({ username, email, password });
		} catch (error) {
			if (error instanceof Error && error.message) {
				console.error(error.message);
			}

			throw new Error("Failed to create user");
		}
	}

	static getUsername(email: string): string {
		return email.split("@")[0] || "";
	}

	changePassword(newPassword: string): void | Error {
		if (!this._password) return new Error("No password to be changed");

		this._password = Password.create(newPassword);
	}

	get password(): Password | undefined {
		return this._password;
	}

	set password(password: Password | undefined) {
		this._password = password;
	}

	set addDbID(id: number) {
		this.id = id;
	}

	flatUserData(): any {
		return {
			id: this.id,
			username: this.username,
			email: this.email.value,
		};
	}

	toDatabaseObject(): any {
		return {
			username: this.username,
			email: this.email.value,
			password: this._password ? this._password.value : null,
		};
	}

	static async comparePassword(userPassword: string, candidatePassword: string): Promise<boolean> {
		if (!userPassword) {
			return false;
		}

		return Password.compare(userPassword, candidatePassword);
	}
}

export default User;
