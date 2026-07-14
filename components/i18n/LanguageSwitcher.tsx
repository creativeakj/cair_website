"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/translations";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={l === locale}
          className={`rounded-sm px-1.5 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
            l === locale ? "bg-[var(--forest)] text-white" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
