import { sql } from "@/util/db";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function GET() {
	try {
		const comments = await sql`
      SELECT id, full_name, email, content, image_url, created_at 
      FROM comments 
      ORDER BY created_at DESC
    `;
		return NextResponse.json(comments);
	} catch (error) {
		console.error("Database Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch comments" },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const full_name = formData.get("full_name") as string;
		const email = formData.get("email") as string;
		const content = formData.get("content") as string;
		const file = formData.get("image") as File | null;

		if (!full_name || !email || !content) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		let image_url = null;

		if (file && file.size > 0) {
			const blob = await put(file.name, file, {
				access: "public",
			});
			image_url = blob.url;
		}

		await sql`
      INSERT INTO comments (full_name, email, content, image_url)
      VALUES (${full_name}, ${email}, ${content}, ${image_url})
    `;

		return NextResponse.json({ message: "Comment added successfully" });
	} catch (error) {
		console.error("Database Error:", error);
		return NextResponse.json(
			{ error: "Failed to add comment" },
			{ status: 500 },
		);
	}
}
