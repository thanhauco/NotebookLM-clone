"use client";
import { useEffect, useState } from "react";

type Conversation = { id: string; title: string; lastUpdated: string };

export default function MemoryPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/memory");
        const data = await res.json();
        setConversations(data.conversations ?? []);
      } catch (err) {
        // ignore for now
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Memory</h1>
      <div className="card-glass p-6">
        {loading && <div className="text-sm text-foreground/60">Loading…</div>}
        {!loading && conversations.length === 0 && (
          <div className="text-sm text-foreground/60">No conversations yet.</div>
        )}
        {!loading && conversations.length > 0 && (
          <ul className="grid gap-3">
            {conversations.map((c) => (
              <li key={c.id} className="card-glass p-4">
                <div className="font-medium">{c.title}</div>
                <div className="text-xs text-foreground/70">Updated {c.lastUpdated}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}