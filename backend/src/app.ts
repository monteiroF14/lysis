import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { openDb } from "./database/openDb";
import router from "./routers/router";
import config from "./config";

dotenv.config();

const app: Express = express();
const PORT = config.server.port;

app.use(router);

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(PORT, async () => {
	const db = await openDb();
	console.log("db", db);
	console.log(`server is running at http://localhost:${PORT}`);
});
