import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT;

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
	console.log(`⚡️[server] is running at http://localhost:${PORT}`);
});
