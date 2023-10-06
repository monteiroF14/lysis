import { Email } from "./Email";
import { Name } from "./Name";
import { UserData } from "./UserData";

export class User {
	public readonly name: Name;
	public readonly email: Email;

	private constructor(name: Name, email: Email) {
		this.name = name;
		this.email = email;
		Object.freeze(this);
	}

	static create(userData: UserData): User {
		try {
			const name = Name.create(userData.name);
			const email = Email.create(userData.email);

			return new User(name, email);
		} catch (error) {
			throw error("error: ", error.message);
		}
	}
}
