"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PublicationDownloadButton({ slug, fileUrl }: { slug: string; fileUrl: string }) {
  const [pending, setPending] = useState(false);

  async function handleDownload() {
    setPending(true);
    try {
      await fetch("/api/publications/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
    } finally {
      setPending(false);
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={pending}
      className="bg-[var(--forest)] text-[var(--primary-foreground)] hover:bg-[var(--forest-deep)]"
    >
      {pending ? "Preparing…" : "Download PDF"}
    </Button>
  );
}
