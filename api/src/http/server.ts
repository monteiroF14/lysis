import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { env } from "env";
import routes from "http/routes";

const elysia = new Elysia();
const PORT = env.API_PORT ?? 3000;

elysia.use(
	cors({
		credentials: true,
	})
);

elysia.use(routes);

elysia.listen(PORT, ({ port }) => {
	console.log(`🚀 server is running in port ${port}  🚀`);
});
