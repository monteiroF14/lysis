import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database/types";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!);

export default {
	server: {
		port: 3000,
	},
	database: {
		connection: supabase,
	},
};
