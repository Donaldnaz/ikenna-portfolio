import { auth } from "@/util/auth";
import { redirect } from "next/navigation";
import { Navigation } from "../components/nav";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
	const session = await auth.getSession();

	if (session) {
		redirect("/");
	}

	return (
		<div className="bg-black min-h-screen flex flex-col items-center justify-center">
			<Navigation />
			<div className="w-full max-w-md p-8 space-y-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100">
						Welcome Back
					</h2>
					<p className="mt-2 text-zinc-400">
						Please sign in to your account
					</p>
				</div>
				
				{/* Neon Auth / Better Auth provides a hosted UI or you can use their components */}
				<div className="flex flex-col gap-4">
					<a
						href="/api/auth/signin"
						className="w-full py-3 px-4 bg-zinc-100 text-black font-bold rounded-xl text-center hover:bg-zinc-200 transition-colors"
					>
						Sign In
					</a>
				</div>
			</div>
		</div>
	);
}
