import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import config from "./config";
import cors from "cors";
import router from "./routes/router";

dotenv.config();

const app: Express = express();
const PORT = config.server.port;

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
	console.log(`server is running at http://localhost:${PORT}`);
});
