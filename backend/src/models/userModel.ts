// userModel.ts

import { Database } from "sqlite";
import { User } from "src/types/User";

// Example model for interacting with the "users" table
export class UserModel {
	constructor(private db: Database) {}

	async getAllUsers(): Promise<User[]> {
		return this.db.all("SELECT * FROM users");
	}

	async getUserById(id: number): Promise<User | undefined> {
		return this.db.get("SELECT * FROM users WHERE id = ?", id);
	}

	async createUser(user: User): Promise<void> {
		await this.db.run("INSERT INTO users (name, email) VALUES (?, ?)", user.name, user.email);
	}

	async updateUser(id: number, user: User): Promise<void> {
		await this.db.run(
			"UPDATE users SET name = ?, email = ? WHERE id = ?",
			user.name,
			user.email,
			id
		);
	}

	async deleteUser(id: number): Promise<void> {
		await this.db.run("DELETE FROM users WHERE id = ?", id);
	}
}
