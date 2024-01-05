import { html } from "@elysiajs/html";
import Elysia from "elysia";

export const route_not_found = new Elysia({ prefix: "/not-found" })
	.use(html())
	.get("/", async () => {
		return (
			<main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
				<h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
				<div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>
			</main>
		);
	});
