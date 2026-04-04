"use client";

import { Lock, Server, Shield } from "lucide-react";

const items = [
  {
    title: "Session-safe UI",
    body: "Role toggle demonstrates how privileged actions stay gated in-product.",
    icon: Shield,
  },
  {
    title: "Client-side ledger",
    body: "Your demo edits can persist locally in the browser for a realistic flow.",
    icon: Server,
  },
  {
    title: "Privacy-minded layout",
    body: "No credentials or live account linking — a focused interface study.",
    icon: Lock,
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Trust and compliance notes"
      className="rounded-2xl border border-zinc-200/60 bg-zinc-50/80 px-4 py-5 dark:border-zinc-800 dark:bg-zinc-900/40 sm:px-6"
    >
      <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
        Enterprise-style cues
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-xl border border-zinc-200/50 bg-white/60 p-4 dark:border-zinc-700/50 dark:bg-zinc-950/40"
          >
            <item.icon className="h-5 w-5 shrink-0 text-zinc-400 dark:text-zinc-500" />
            <div>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
