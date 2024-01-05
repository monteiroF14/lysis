import Elysia from "elysia";
import { swagger } from "@elysiajs/swagger";
import { authorization } from "http/plugins/authorization";
import { auth } from "http/routes/auth";
import { dashboard } from "http/pages/dashboard";
import { route_not_found } from "http/pages/route-not-found";

const elysia = new Elysia();

elysia.use(
	swagger({
		path: "/docs",
		documentation: {
			info: {
				title: "lysis API Documentation",
				version: "1.0.0",
			},
		},
	})
);

elysia.use(auth);
elysia.use(dashboard);
elysia.use(route_not_found);

elysia.use(authorization).get("/", async ({ getCurrentUser, set }) => {
	const user = await getCurrentUser();

	if (!user) {
		set.redirect = "/auth";
	}

	set.redirect = "/dashboard";
});

elysia.onError(({ code, set }) => {
	if (code === "NOT_FOUND") {
		set.status = "Not Found";
		set.redirect = "/not-found";
	}
});

export default elysia;
