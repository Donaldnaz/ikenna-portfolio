import { auth } from "@/util/auth";
import Link from "next/link";

export async function UserNav() {
	// Cast to any to handle complex Better Auth / better-call types
	const session = (await auth.getSession()) as any;

	if (!session?.user) {
		return (
			<Link
				href="/login"
				className="duration-200 text-zinc-400 hover:text-zinc-100"
			>
				Login
			</Link>
		);
	}

	return (
		<div className="flex items-center gap-4">
			<span className="text-sm text-zinc-500">
				{session.user.email}
			</span>
			<a
				href="/api/auth/signout"
				className="duration-200 text-zinc-400 hover:text-zinc-100"
			>
				Logout
			</a>
		</div>
	);
}
