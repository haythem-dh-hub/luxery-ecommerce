import { NextResponse } from "next/server";
import { createOrder } from "@/lib/store";

export async function POST(request) {
  const body = await request.json();
  const order = await createOrder(body);

  return NextResponse.json({
    success: true,
    order,
    message: "Demo order created successfully.",
  });
}
