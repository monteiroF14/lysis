import { Database, open } from "sqlite";
import { User } from "../types/user/User";
import config from "../config";

export class UserModel {
	private db: Database | null = null;

	constructor() {
		this.connect();
	}

	async connect() {
		try {
			this.db = await open({
				filename: config.database.sqlite.filename,
				driver: config.database.sqlite.driver,
			});
			await this.createUserTableIfNotExists();
		} catch (error) {
			console.error("Error connecting to the database:", error);
		}
	}

	async createUserTableIfNotExists() {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const tableExists = await this.db.get(
			"SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
		);

		if (!tableExists) {
			await this.db.run(`
				CREATE TABLE users (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					username TEXT NOT NULL,
					email TEXT NOT NULL,
					password TEXT NOT NULL,
					refresh_token TEXT
				)
			`);
		}
	}

	async createUser(user: User): Promise<User> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const result = await this.db.run(
			"INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
			user.username,
			user.email,
			user.getPassword
		);

		user.addDbID = result.lastID!;
		return user;
	}

	async getAllUsers(): Promise<User[]> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const users = await this.db.all("SELECT username, email, id FROM users");
		return users;
	}

	async getUserById(id: number): Promise<User | undefined> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const user = await this.db.get("SELECT username, email, id FROM users WHERE id = ?", id);
		return user;
	}

	async getUserByEmail(email: string): Promise<User | undefined> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const user = await this.db.get("SELECT username, email, id FROM users WHERE email = ?", email);
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
			"UPDATE users SET username = ?, email = ? WHERE id = ?",
			user.username,
			user.email,
			user.id
		);

		return user;
	}

	async addRefreshTokenToUser({
		token,
		userId,
	}: {
		token: string;
		userId: number;
	}): Promise<User | undefined> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const user = await this.db.get(
			"UPDATE users SET refresh_token = ? WHERE id = ?",
			token,
			userId
		);
		return user;
	}

	async getUserByRefreshToken(token: string): Promise<User | undefined> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		const user = await this.db.get(
			"SELECT username, email, id FROM users WHERE refresh_token = ?",
			token
		);

		return user;
	}

	async removeRefreshTokenFromUser(userId: number): Promise<void> {
		if (!this.db) {
			throw new Error("Database not connected");
		}

		await this.db.run("UPDATE users SET refresh_token = NULL WHERE id = ?", userId);
	}
}

export default new UserModel();
