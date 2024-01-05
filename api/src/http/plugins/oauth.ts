import Elysia from "elysia";
import { env } from "env";
import { google } from "googleapis";

const elysia = new Elysia();

export const oauth = elysia.decorate(() => {
	function createOAuth2Connection() {
		return new google.auth.OAuth2({
			clientId: env.OAUTH_CLIENT_ID,
			clientSecret: env.OAUTH_CLIENT_SECRET,
			redirectUri: env.AUTH_REDIRECT_URL,
		});
	}

	function getOAuth2ConnectionUrl() {
		const scopes = [
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		];

		const auth = createOAuth2Connection();

		return auth.generateAuthUrl({
			access_type: "offline",
			prompt: "consent",
			scope: scopes,
		});
	}

	function createOAuthClient({
		client,
	}: { client: ReturnType<typeof createOAuth2Connection> }) {
		return google.oauth2({
			auth: client,
			version: "v2",
		});
	}

	return {
		createOAuth2Connection,
		createOAuthClient,
		getOAuth2ConnectionUrl,
	};
});
