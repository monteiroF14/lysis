declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		NODE_ENV: string;
		SUPABASE_URL: string;
		SUPABASE_API_KEY: string;
		JWT_SECRET: string;
		JWT_EXPIRATION: string;
	}
}
