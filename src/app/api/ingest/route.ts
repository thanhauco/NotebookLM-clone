import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = body?.type as string | undefined;
    const url = body?.url as string | undefined;
    const name = body?.name as string | undefined;
    // bytes omitted in stub

    let message = "Ingested";
    if (type === "file") message = `Queued file: ${name ?? "unnamed"}`;
    else if (type === "url") message = `Queued URL: ${url ?? ""}`;
    else if (type === "youtube") message = `Queued YouTube: ${url ?? ""}`;
    else message = "Unknown ingest type";

    return NextResponse.json({ ok: true, message });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}