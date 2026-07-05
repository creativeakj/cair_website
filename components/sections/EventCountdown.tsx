"use client";

import { useEffect, useState } from "react";

function useCountdown(targetIso: string) {
  const target = new Date(targetIso).getTime();
  // Start from `target` (diff 0) so the initial render is deterministic for
  // static prerendering; the real clock kicks in once mounted client-side.
  const [now, setNow] = useState(target);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const kickoff = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(id);
    };
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

export function EventCountdown({ eventDate }: { eventDate: string }) {
  const countdown = useCountdown(eventDate);
  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <div className="flex flex-col justify-center rounded-sm bg-white/5 p-6 ring-1 ring-white/10">
      <div className="eyebrow mb-4 text-[var(--gold)]">
        {countdown.done ? "Event in session" : "Countdown to opening"}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {units.map((u) => (
          <div key={u.label} className="rounded-sm bg-black/30 p-3 text-center">
            <div className="font-display text-3xl tabular-nums md:text-4xl">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/60">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
