import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Vercel Blob
    // Using the filename from the file object, but you could generate a unique ID
    const blob = await put(file.name, file, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Blob Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
