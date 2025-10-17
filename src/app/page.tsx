import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-8">
      <div className="card-glass p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          NotebookLM Clone
        </h1>
        <p className="mt-2 text-sm text-foreground/80">
          Process multimodal data, build a knowledge base, chat with it, remember
          every conversation, and generate a podcast — powered by open tools.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/sources" className="card-glass p-4 hover:opacity-90">
            <div className="font-medium">Add Sources</div>
            <div className="text-xs text-foreground/70">Files, URLs, YouTube</div>
          </Link>
          <Link href="/chat" className="card-glass p-4 hover:opacity-90">
            <div className="font-medium">Ask Questions</div>
            <div className="text-xs text-foreground/70">Search + RAG answers</div>
          </Link>
          <Link href="/memory" className="card-glass p-4 hover:opacity-90">
            <div className="font-medium">Memory</div>
            <div className="text-xs text-foreground/70">Conversations & prefs</div>
          </Link>
          <Link href="/podcast" className="card-glass p-4 hover:opacity-90">
            <div className="font-medium">Generate Podcast</div>
            <div className="text-xs text-foreground/70">Local TTS via Kokoro</div>
          </Link>
        </div>
      </div>
      <div className="card-glass p-6">
        <h2 className="text-lg font-semibold">Stack</h2>
        <ul className="mt-2 text-sm grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <li>Zep memory</li>
          <li>Milvus vector DB</li>
          <li>AssemblyAI speech-to-text</li>
          <li>Firecrawl web scraping</li>
          <li>Kokoro 82M TTS (open-source)</li>
          <li>Next.js + Tailwind (UI)</li>
        </ul>
      </div>
    </section>
  );
}
