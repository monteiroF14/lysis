import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!);

export default {
	server: {
		port: process.env.PORT || 3000,
	},
	database: {
		connection: supabase,
	},
};
