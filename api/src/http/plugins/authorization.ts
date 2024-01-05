import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { env } from "env";
import { NotSuperAdminError, UnauthorizedError } from "http/utils/errors";
import { z } from "zod";

const elysia = new Elysia();

const jwtPayloadSchema = z.object({
	uid: z.string(),
	name: z.string(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export const authorization = elysia
	.error({
		UNAUTHORIZED: UnauthorizedError,
		NOT_SUPER_ADMIN: NotSuperAdminError,
	})
	.onError(({ code, error, set }) => {
		switch (code) {
			case "UNAUTHORIZED":
				set.status = 401;
				set.redirect = "/auth/login"
				return { code, message: error.message };
			case "NOT_SUPER_ADMIN":
				set.status = 401;
				return { code, message: error.message };
		}
	})
	.use(
		jwt({
			name: "jwt",
			secret: env.JWT_SECRET_KEY,
		}),
	)
	.use(cookie())
	.derive(({ jwt, cookie, setCookie, removeCookie }) => {
		return {
			getCurrentUser: async (): Promise<JwtPayload> => {
				const payload = await jwt.verify(cookie.auth);

				if (!payload) {
					throw new UnauthorizedError();
				}

				return payload as JwtPayload;
			},
			signUser: async (payload: JwtPayload) => {
				setCookie("auth", await jwt.sign(payload), {
					httpOnly: true,
					maxAge: 7 * 86400,
					path: "/",
				});
			},
			signOut: () => {
				removeCookie("auth");
			},
		};
	});
