import { auth } from "@/util/auth";

export default auth.middleware();

export const config = {
	matcher: [
		// Protect specific routes if needed
		// Explicitly include root and other subroutes, excluding public assets and api
		"/((?!api|_next/static|_next/image|favicon.ico|$).*)", 
	],
};
