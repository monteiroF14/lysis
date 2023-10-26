import { SYSTEM_ROLES } from "config/permissions";
import Email from "utils/types/Email";
import Password from "utils/types/Password";

class UserModel {
	public readonly username: string;
	public readonly email: Email;
	private _password?: Password;
	public id?: string;

	private _role = SYSTEM_ROLES.APPLICATION_USER;

	constructor({
		username,
		email,
		password,
	}: {
		username: string;
		email: Email;
		password: Password;
	}) {
		this.username = username;
		this.email = email;
		this._password = password;
	}

	static create({
		username,
		email,
		password,
	}: {
		username: string;
		email: Email;
		password: Password;
	}): UserModel {
		try {
			return new UserModel({
				username: this.getUsername(email.value),
				email: Email.create(email.value),
				password: Password.create(password.value),
			});
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

	get role(): keyof typeof SYSTEM_ROLES {
		return this._role;
	}

	get password(): Password | undefined {
		return this._password;
	}

	set password(password: Password | undefined) {
		this._password = password;
	}

	set addDbID(id: string) {
		this.id = id;
	}

	static async comparePassword(userPassword: string, candidatePassword: string): Promise<boolean> {
		if (!userPassword) {
			return false;
		}

		return Password.compare(userPassword, candidatePassword);
	}
}

export default UserModel;
