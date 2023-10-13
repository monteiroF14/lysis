import { Email } from "./Email";
import { Password } from "./Password";

export type UserData = {
	email: string;
	password: string;
};

export class User {
	public readonly username: string;
	public readonly email: Email;
	private password?: Password;
	public id?: number;

	private constructor(username: string, email: Email, password?: Password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	static create(userData: UserData): User {
		try {
			const emailString = userData.email;
			const passwordString = userData.password;
			const email = Email.create(emailString);
			const password = Password.create(passwordString);
			const username = this.getUsername(emailString);

			return new User(username, email, password);
		} catch (error) {
			if (error instanceof Error && error.message) {
				console.error(error.message);
			}

			console.log("userData", userData);

			throw new Error("Failed to create user");
		}
	}

	static getUsername(email: string): string {
		return email.split("@")[0] || "";
	}

	changePassword(newPassword: string): void | Error {
		if (!this.password) return new Error("No password to be changed");

		this.password = Password.create(newPassword);
	}

	get getPassword(): Password | undefined {
		return this.password;
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

	async comparePassword(candidatePassword: string): Promise<boolean> {
		if (!this.password) {
			return false;
		}

		return this.password.compare(candidatePassword);
	}
}
