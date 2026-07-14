"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Place = { src: string; name: string; country: string };

export function PlacesCarousel({ places }: { places: Place[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % places.length), 5000);
    return () => clearInterval(id);
  }, [places.length]);

  return (
    <div className="relative mt-12 overflow-hidden rounded-sm">
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        {places.map((p, i) => (
          <div
            key={p.name}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== index}
          >
            <Image
              src={p.src}
              alt={p.name}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 80vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)] via-[var(--forest-deep)]/20 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="font-display text-xl md:text-2xl">{p.name}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--gold)]">{p.country}</div>
            </figcaption>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => setIndex((i) => (i - 1 + places.length) % places.length)}
        className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => setIndex((i) => (i + 1) % places.length)}
        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 right-4 flex gap-2 md:bottom-6 md:right-8">
        {places.map((p, i) => (
          <button
            key={p.name}
            type="button"
            aria-label={`Go to ${p.name}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
