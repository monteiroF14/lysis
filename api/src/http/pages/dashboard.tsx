import { html } from "@elysiajs/html";
import Elysia from "elysia";
import { authorization } from "http/plugins/authorization";

export const dashboard = new Elysia({ prefix: "/dashboard" })
	.use(html())
	.use(authorization)
	.get("/", async ({ getCurrentUser }) => {
		const currentUser = await getCurrentUser();

		return (
			<>
				<h1>Hello, {currentUser.name}</h1>
			</>
		);
	});
