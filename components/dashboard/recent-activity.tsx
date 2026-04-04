"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { recentTransactions } from "@/lib/ledger-stats";
import { useFinanceStore } from "@/lib/store";

const fmt = (n: number, type: "income" | "expense") =>
  `${type === "expense" ? "−" : "+"}${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)}`;

export function RecentActivity() {
  const transactions = useFinanceStore((s) => s.transactions);
  const rows = useMemo(
    () => recentTransactions(transactions, 6),
    [transactions]
  );

  return (
    <section className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            <Clock className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            Recent activity
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Latest movements — full ledger and filters live in the section
            below.
          </p>
        </div>
        <Link
          href="#section-ledger"
          className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
        >
          Open ledger
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          No transactions to show yet.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-zinc-100 dark:divide-zinc-800">
          {rows.map((t) => (
            <li
              key={t.id}
              className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0"
            >
              <div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t.category}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  {new Date(t.date + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                  {t.description ? ` · ${t.description}` : ""}
                </p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.type === "income"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {fmt(t.amount, t.type)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
