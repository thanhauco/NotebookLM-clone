"use client";
import { useState } from "react";

export default function PodcastPage() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    const content = text.trim();
    if (!content) return;
    setLoading(true);
    setAudioUrl(null);
    try {
      const res = await fetch("/api/podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: content, voice: "en-US" }),
      });
      const data = await res.json();
      if (data.audioUrl) setAudioUrl(data.audioUrl);
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Generate Podcast</h1>
      <div className="card-glass p-6 grid gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write or paste your podcast script…"
          rows={6}
          className="w-full px-3 py-2 rounded-md border text-sm"
        />
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm rounded-md glass" onClick={generate} disabled={loading}>
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>
        {audioUrl && (
          <audio controls src={audioUrl} className="mt-3" />
        )}
      </div>
    </div>
  );
}