import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import config from "./config";
import { authenticate } from "./middleware/authMiddleware";

dotenv.config();

const app: Express = express();
const PORT = config.server.port;

app.use(express.json());

app.use(authenticate);
app.use(router);

app.listen(PORT, async () => {
	console.log(`server is running at http://localhost:${PORT}`);
});
