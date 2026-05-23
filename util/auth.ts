import { createNeonAuth } from "@neondatabase/auth/next/server";

if (!process.env.NEON_AUTH_BASE_URL) {
	// We'll throw an error in production, but let's keep it quiet in dev for now
	if (process.env.NODE_ENV === "production") {
		throw new Error("NEON_AUTH_BASE_URL is not defined");
	}
}

export const auth = createNeonAuth({
	baseUrl: process.env.NEON_AUTH_BASE_URL!,
	// In a real app, you'd use a secret from environment variables
	cookies: {
		secret: process.env.NEON_AUTH_COOKIE_SECRET || "a-very-long-and-secure-secret-key-that-is-32-chars",
	},
});
