"use client";

import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { useMemo } from "react";
import {
  totalBalance,
  sumByType,
} from "@/lib/finance-helpers";
import { useFinanceStore } from "@/lib/store";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function SummaryCards() {
  const transactions = useFinanceStore((s) => s.transactions);
  const { balance, income, expense } = useMemo(() => {
    return {
      balance: totalBalance(transactions),
      income: sumByType(transactions, "income"),
      expense: sumByType(transactions, "expense"),
    };
  }, [transactions]);

  const cards = [
    {
      title: "Total balance",
      value: money(balance),
      sub: "Net of all activity",
      icon: Wallet,
      accent: "from-emerald-500/90 to-teal-600/90",
      ring: "ring-emerald-500/20",
    },
    {
      title: "Income",
      value: money(income),
      sub: "Recorded inflows",
      icon: ArrowUpRight,
      accent: "from-violet-500/90 to-indigo-600/90",
      ring: "ring-violet-500/20",
    },
    {
      title: "Expenses",
      value: money(expense),
      sub: "Recorded outflows",
      icon: ArrowDownRight,
      accent: "from-rose-500/90 to-orange-600/90",
      ring: "ring-rose-500/20",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.title}
          className={`group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm ring-1 dark:border-zinc-800 dark:bg-zinc-900/60 ${c.ring}`}
        >
          <div
            className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br opacity-40 blur-2xl transition group-hover:opacity-60 ${c.accent}`}
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {c.title}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {c.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                {c.sub}
              </p>
            </div>
            <span
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg ${c.accent}`}
            >
              <c.icon className="h-5 w-5" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
