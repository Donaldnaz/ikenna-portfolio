import { auth } from "@/util/auth";

export default auth.middleware();

export const config = {
	matcher: [
		// Protect specific routes if needed, or just let the middleware run globally
		// For now, we'll let it run on everything to handle session sync
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
