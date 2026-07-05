"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="grid h-8 w-8 place-items-center rounded-full border border-border text-xs font-semibold text-foreground/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="grid h-8 w-8 place-items-center rounded-full border border-border text-xs font-semibold text-foreground/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        in
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="grid h-8 w-8 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
