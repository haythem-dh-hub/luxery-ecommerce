import { NextResponse } from "next/server";
import { runAutomationDigest } from "@/lib/automation";

export async function POST() {
  const result = await runAutomationDigest();
  return NextResponse.json({ success: true, result });
}
