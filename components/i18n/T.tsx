"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

function lookup(path: string): Record<string, string> | undefined {
  const parts = path.split(".");
  let node: unknown = translations;
  for (const part of parts) {
    node = (node as Record<string, unknown> | undefined)?.[part];
  }
  return node as Record<string, string> | undefined;
}

/** Renders a translated string looked up by dot-path, e.g. `<T path="nav.home" />`. */
export function T({ path }: { path: string }) {
  const { locale } = useLocale();
  const entry = lookup(path);
  if (!entry) return null;
  return <>{entry[locale] ?? entry.en}</>;
}
