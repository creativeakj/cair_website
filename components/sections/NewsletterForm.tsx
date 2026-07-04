"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Something went wrong");
      toast.success("Subscribed. Welcome to CAIR.");
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not subscribe");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="h-10 w-full min-w-0 rounded-sm border border-white/20 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
      />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 rounded-sm bg-[var(--gold)] px-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
