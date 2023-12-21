import { Elysia } from "elysia";
import { env } from "env";

const elysia = new Elysia();
const PORT = env.PORT ?? 3000;

elysia.get("/", () => "Hello World");

elysia.listen(PORT, ({ port }) => {
	console.log(`🚀 server is running in port ${port}  🚀`);
});
