import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const question = String(body?.question ?? "");
    const conversationId = String(body?.conversationId ?? "default");

    const answer = `Stubbed answer to: "${question}" (conv ${conversationId})`;
    return NextResponse.json({ ok: true, answer });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}