import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import config from "./config";

dotenv.config();

const app: Express = express();
const PORT = config.server.port;

app.use(express.json());

app.use(router);

app.listen(PORT, async () => {
	console.log(`server is running at http://localhost:${PORT}`);
});
