import express from "express";
import type { Express } from "express";
import config from "config";
import router from "routes";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const app: Express = express();
const PORT = config.server.port;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(PORT, () => {
	console.log(`server is running at http://localhost:${PORT}`);
});
