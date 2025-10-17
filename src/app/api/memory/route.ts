import { NextResponse } from "next/server";

export async function GET() {
  const conversations = [
    { id: "default", title: "Getting started", lastUpdated: new Date().toLocaleString() },
  ];
  return NextResponse.json({ ok: true, conversations });
}