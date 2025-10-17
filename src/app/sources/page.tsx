"use client";
import { useState } from "react";

export default function SourcesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleFileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.querySelector<HTMLInputElement>("input[name=file]");
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setMessage("Please choose a file to upload.");
      return;
    }
    const file = fileInput.files[0];
    const buf = await file.arrayBuffer();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "file", name: file.name, bytes: Array.from(new Uint8Array(buf)) }),
      });
      const data = await res.json();
      setMessage(data.message ?? "File ingested.");
    } catch (err) {
      setMessage("Upload failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUrlSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = String(formData.get("url") || "").trim();
    const kind = String(formData.get("kind") || "website");
    if (!url) {
      setMessage("Enter a URL.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: kind === "youtube" ? "youtube" : "url", url }),
      });
      const data = await res.json();
      setMessage(data.message ?? "URL ingested.");
    } catch (err) {
      setMessage("Ingest failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-xl font-semibold">Add Sources</h1>
      {message && <div className="card-glass p-3 text-sm">{message}</div>}

      <div className="card-glass p-6">
        <h2 className="font-medium">Upload Files</h2>
        <p className="text-xs text-foreground/70 mb-4">Text, PDF, audio, video</p>
        <form onSubmit={handleFileSubmit} className="grid gap-3">
          <input
            name="file"
            type="file"
            accept=".txt,.md,.pdf,audio/*,video/*"
            className="block w-full text-sm"
          />
          <button
            className="px-4 py-2 text-sm rounded-md glass"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading…" : "Upload"}
          </button>
        </form>
      </div>

      <div className="card-glass p-6">
        <h2 className="font-medium">Add URL</h2>
        <p className="text-xs text-foreground/70 mb-4">Website or YouTube</p>
        <form onSubmit={handleUrlSubmit} className="grid gap-3">
          <input name="url" type="url" placeholder="https://…" className="px-3 py-2 rounded-md border text-sm" />
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="kind" value="website" defaultChecked /> Website
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="kind" value="youtube" /> YouTube
            </label>
          </div>
          <button className="px-4 py-2 text-sm rounded-md glass" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}