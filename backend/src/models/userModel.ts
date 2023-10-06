import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { User } from "../types/User";

export class UserModel {
	private db: Database | null = null;

	constructor() {
		this.connect();
	}

	async connect() {
		try {
			this.db = await open({
				filename: "./src/database/database.db",
				driver: sqlite3.Database,
			});
			await this.createTableIfNotExists();
		} catch (error) {
			console.error("Error connecting to the database:", error);
		}
	}

	async createTableIfNotExists() {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const tableExists = await this.db.get(
			"SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
		);

		if (!tableExists) {
			await this.db.run(`
				CREATE TABLE users (
					id INTEGER PRIMARY KEY AUTO_INCREMENT,
					name TEXT NOT NULL,
					email TEXT NOT NULL
				)
			`);
		}
	}

	async createUser(user: User): Promise<User> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		await this.db.run("INSERT INTO users (name, email) VALUES (?, ?)", user.name, user.email);

		return { ...user };
	}

	async getAllUsers(): Promise<User[]> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const users = await this.db.all("SELECT * FROM users");
		return users;
	}

	async getUserById(id: number): Promise<User | undefined> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const user = await this.db.get("SELECT * FROM users WHERE id = ?", id);
		return user;
	}

	async deleteUser(id: number): Promise<void> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		await this.db.run("DELETE FROM users WHERE id = ?", id);
	}

	async updateUser(id: number, user: User): Promise<User> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		await this.db.run(
			"UPDATE users SET name = ?, email = ? WHERE id = ?",
			user.name,
			user.email,
			user.id
		);

		return { ...user };
	}
}

export default new UserModel();
