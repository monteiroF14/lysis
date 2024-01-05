import Elysia from "elysia";
import { authorization } from "http/plugins/authorization";
import { oauth } from "http/plugins/oauth";

export const auth = new Elysia({ prefix: "/auth" })
	.use(authorization)
	.use(oauth)
	.get("/login", ({ set, getOAuth2ConnectionUrl }) => {
		const url = getOAuth2ConnectionUrl();
		set.redirect = url;
	})
	.derive(({ set, createOAuth2Connection }) => {
		const client = createOAuth2Connection();

		return {
			client,
			getTokens: async ({ code }: { code: string }) => {
				const { tokens } = await client.getToken(code);

				if (!tokens) {
					set.status = 400;
				}

				return tokens;
			},
		};
	})
	.get("/callback", async ({ query, getTokens, client, signUser, createOAuthClient, set }) => {
		const tokens = await getTokens({
			code: query.code ?? "no-code",
		});

		client.setCredentials({ access_token: tokens.access_token });

		const oauth2 = createOAuthClient({ client });

		const { data } = await oauth2.userinfo.get();

		await signUser({
			uid: data.id as string,
			name: data.name as string,
		});

		set.redirect = "/";
		return { user: data };
	})
	.get("/logout", async ({ signOut, getCurrentUser, set }) => {
		const user = await getCurrentUser();

		signOut();

		set.redirect = "/";
	});
