import { z } from "zod";

const envSchema = z.object({
	API_BASE_URL: z.string().url(),
	AUTH_REDIRECT_URL: z.string().url(),
	DB_URL: z.string().url().min(1),
	JWT_SECRET_KEY: z.string().min(1),
	RESEND_API_KEY: z.string().min(1),
	API_PORT: z.string().min(1),
	OAUTH_CLIENT_ID: z.string(),
	OAUTH_CLIENT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
