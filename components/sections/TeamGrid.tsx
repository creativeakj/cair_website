"use client";

import { useState } from "react";
import Image from "next/image";
import { cloudinaryFill } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { TeamMemberDTO } from "@/lib/services/team";

const PLACEHOLDER_PHOTO = "/images/team/placeholder.jpg";

const ACCENTS = [
  "bg-[var(--forest-deep)] text-[var(--primary-foreground)]",
  "bg-[var(--accent)] text-[var(--accent-foreground)]",
  "bg-[var(--gold)] text-[var(--forest-deep)]",
];

function MemberModal({ member, onOpenChange }: { member: TeamMemberDTO | null; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={!!member} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        {member && (
          <>
            <DialogHeader className="sm:flex-row sm:items-center sm:text-left">
              <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full border-2 border-border sm:mx-0">
                <Image
                  src={cloudinaryFill(member.photo_url || PLACEHOLDER_PHOTO, 512, 512)}
                  alt={member.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:pl-5 sm:text-left">
                <DialogTitle className="font-display text-2xl text-[var(--forest-deep)]">{member.name}</DialogTitle>
                <DialogDescription className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                  {member.title}
                </DialogDescription>
              </div>
            </DialogHeader>
            <div className="prose-cair max-w-none pt-2" dangerouslySetInnerHTML={{ __html: member.bio }} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function TeamGrid({ members }: { members: TeamMemberDTO[] }) {
  const [selected, setSelected] = useState<TeamMemberDTO | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-6 md:auto-rows-[minmax(220px,auto)]">
        {members.map((m, i) => {
          const span = i % 3 === 0 ? "md:col-span-4" : "md:col-span-2";
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelected(m)}
              className={`group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card text-left transition-all hover:-translate-y-[2px] hover:border-[var(--accent)] hover:shadow-lg ${span}`}
            >
              <div className={`flex items-center gap-5 p-7 ${ACCENTS[i % ACCENTS.length]}`}>
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-background/40">
                  <Image
                    src={cloudinaryFill(m.photo_url || PLACEHOLDER_PHOTO, 320, 320)}
                    alt={m.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-display text-xl leading-tight md:text-2xl">{m.name}</div>
                  <div className="text-xs uppercase tracking-[0.18em] opacity-80">{m.title}</div>
                </div>
              </div>

              <div className="flex flex-1 items-end p-7">
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] underline-offset-4 group-hover:underline">
                  View bio →
                </span>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100"
              />
            </button>
          );
        })}
      </div>

      <MemberModal member={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  );
}

export function TeamList({ members }: { members: TeamMemberDTO[] }) {
  const [selected, setSelected] = useState<TeamMemberDTO | null>(null);

  return (
    <>
      <ul className="divide-y divide-border border-y border-border">
        {members.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => setSelected(m)}
              className="group grid w-full grid-cols-[auto_1fr] items-center gap-6 py-5 text-left transition-colors hover:bg-background"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border transition-colors group-hover:border-[var(--accent)]">
                <Image
                  src={cloudinaryFill(m.photo_url || PLACEHOLDER_PHOTO, 256, 256)}
                  alt={m.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-display text-lg text-[var(--forest-deep)]">{m.name}</div>
                <div className="text-sm text-foreground/70">{m.title}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <MemberModal member={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  );
}
