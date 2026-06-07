import { NextResponse } from "next/server";
import { generateChatReply } from "@/lib/ai";

export async function POST(request) {
  const body = await request.json();
  const message = body?.message ?? "";

  if (!message.trim()) {
    return NextResponse.json(
      { success: false, error: "Message is required." },
      { status: 400 },
    );
  }

  const reply = await generateChatReply(message);

  return NextResponse.json({
    success: true,
    reply,
  });
}
