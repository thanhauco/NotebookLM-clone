"use client";
import { useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, conversationId: "default" }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.answer ?? "(stubbed answer)" }]);
    } catch (err) {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Chat</h1>
      <div ref={listRef} className="card-glass p-4 h-[48vh] overflow-y-auto grid gap-3">
        {messages.length === 0 && (
          <div className="text-sm text-foreground/60">Ask anything about your added sources.</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === "user" ? "justify-self-end" : "justify-self-start"}`}>
            <div className="card-glass p-3 max-w-[75ch]">{m.content}</div>
          </div>
        ))}
        {loading && <div className="text-xs text-foreground/60">Thinking…</div>}
      </div>
      <div className="flex items-center gap-3">
        <input
          className="flex-1 px-3 py-2 rounded-md border text-sm"
          placeholder="Type your question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
        />
        <button className="px-4 py-2 text-sm rounded-md glass" onClick={send} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}