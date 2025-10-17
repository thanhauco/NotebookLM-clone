import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const script = String(body?.script ?? "");
    const voice = String(body?.voice ?? "en-US");
    // Stub: will call Kokoro TTS via FastAPI later
    return NextResponse.json({ ok: true, scriptLength: script.length, voice, audioUrl: null });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}