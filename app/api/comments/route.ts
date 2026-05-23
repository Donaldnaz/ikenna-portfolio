import { sql } from "@/util/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const comments = await sql`
      SELECT id, full_name, email, content, created_at 
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
		const { full_name, email, content } = await req.json();

		if (!full_name || !email || !content) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		await sql`
      INSERT INTO comments (full_name, email, content)
      VALUES (${full_name}, ${email}, ${content})
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
