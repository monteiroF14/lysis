import { SYSTEM_ROLES } from "../../config/permissions";
import type { Email } from "./Email";
import type { Password } from "./Password";
import User from "./User";

class Admin extends User {
	constructor(userData: { username: string; email: Email; password?: Password }) {
		super(userData);
		this.role = SYSTEM_ROLES.SUPER_ADMIN;
	}
}

export default Admin;
