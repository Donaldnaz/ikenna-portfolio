import { createNeonAuth } from "@neondatabase/auth/next/server";

if (!process.env.NEON_AUTH_BASE_URL) {
	if (process.env.NODE_ENV === "production") {
		throw new Error("NEON_AUTH_BASE_URL is not defined");
	}
}

export const auth = createNeonAuth({
	baseUrl: process.env.NEON_AUTH_BASE_URL!,
	cookies: {
		secret: process.env.NEON_AUTH_COOKIE_SECRET || "a-very-long-and-secure-secret-key-that-is-32-chars",
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
});
