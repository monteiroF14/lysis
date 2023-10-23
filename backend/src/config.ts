import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database/types";

const supabase = createClient<Database>(
	process.env.SUPABASE_URL || "https://spnvuzhvpjgamwhhbhwd.supabase.co",
	process.env.SUPABASE_API_KEY ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbnZ1emh2cGpnYW13aGhiaHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1NDI3OTUsImV4cCI6MjAwMzExODc5NX0.3cLmtlj9pZjdGdEeEf6aY_WDfHeDX5y-biv8ubReoOE"
);

export default {
	server: {
		port: 3000,
	},
	database: {
		connection: supabase,
	},
};
