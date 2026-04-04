"use client";

import { Lightbulb, TrendingDown, TrendingUp, Trophy } from "lucide-react";
import { useMemo } from "react";
import {
  highestSpendingCategory,
  monthlyComparison,
  totalBalance,
} from "@/lib/finance-helpers";
import { useFinanceStore } from "@/lib/store";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);

export function InsightsPanel() {
  const transactions = useFinanceStore((s) => s.transactions);
  const insights = useMemo(() => {
    const top = highestSpendingCategory(transactions);
    const cmp = monthlyComparison(transactions);
    const balance = totalBalance(transactions);
    const avgExpense =
      transactions.filter((t) => t.type === "expense").length > 0
        ? transactions
            .filter((t) => t.type === "expense")
            .reduce((a, t) => a + t.amount, 0) /
          transactions.filter((t) => t.type === "expense").length
        : 0;
    return { top, cmp, balance, avgExpense };
  }, [transactions]);

  const cards: {
    title: string;
    body: string;
    icon: typeof Trophy;
    tone: string;
  }[] = [];

  if (insights.top) {
    cards.push({
      title: "Highest spending category",
      body: `${insights.top.name} leads your expenses at ${money(insights.top.value)} total.`,
      icon: Trophy,
      tone: "from-amber-500/90 to-orange-600/90",
    });
  }

  if (insights.cmp) {
    const up = insights.cmp.expenseDelta > 0;
    cards.push({
      title: "Month-over-month spend",
      body: `Last full month vs prior: ${up ? "up" : "down"} ${money(Math.abs(insights.cmp.expenseDelta))} on expenses.`,
      icon: up ? TrendingUp : TrendingDown,
      tone: up
        ? "from-rose-500/90 to-red-600/90"
        : "from-emerald-500/90 to-teal-600/90",
    });
  }

  cards.push({
    title: "Portfolio snapshot",
    body: `Current net position is ${money(insights.balance)}. Average expense line item is ${money(insights.avgExpense)}.`,
    icon: Lightbulb,
    tone: "from-violet-500/90 to-fuchsia-600/90",
  });

  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
        Insights will appear once there is enough activity in your ledger.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.title}
          className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <div
            className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-30 blur-2xl ${c.tone}`}
          />
          <div className="relative flex gap-3">
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${c.tone}`}
            >
              <c.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {c.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {c.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
