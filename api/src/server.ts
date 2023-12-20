import { Elysia } from "elysia";

const elysia = new Elysia();

elysia.get("/", () => "Hello World");
elysia.listen(3000);

console.log("🚀 server is running 🚀");
