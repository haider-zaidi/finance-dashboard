"use client";

import { useMemo } from "react";
import { Activity, PiggyBank, Receipt, TrendingUp } from "lucide-react";
import { computeLedgerStats } from "@/lib/ledger-stats";
import { useFinanceStore } from "@/lib/store";

export function DashboardQuickStats() {
  const transactions = useFinanceStore((s) => s.transactions);
  const role = useFinanceStore((s) => s.role);
  const stats = useMemo(
    () => computeLedgerStats(transactions),
    [transactions]
  );

  const items = useMemo(() => {
    const base = [
      {
        title: "Ledger lines",
        value: String(stats.transactionCount),
        sub: `${stats.incomeCount} in · ${stats.expenseCount} out`,
        icon: Receipt,
      },
      {
        title: "Net savings rate",
        value: stats.savingsRateLabel,
        sub: "Income less expenses (all time)",
        icon: PiggyBank,
      },
      {
        title: "Largest expense",
        value: stats.largestExpense?.category ?? "—",
        sub:
          stats.largestExpense != null
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(stats.largestExpense.amount)
            : "No expenses yet",
        icon: TrendingUp,
      },
      {
        title: "This month net",
        value: stats.monthNetLabel,
        sub: `Spend ${stats.monthExpenseLabel} MTD`,
        icon: Activity,
      },
    ];
    if (role === "admin") {
      return [base[3], base[0], base[1], base[2]];
    }
    return base;
  }, [stats, role]);

  const isAdmin = role === "admin";

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50/80 p-4 shadow-sm dark:border-zinc-800 dark:from-zinc-900/80 dark:to-zinc-950/80 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {isAdmin ? "Control room metrics" : "Operational snapshot"}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isAdmin
              ? "Same underlying data — tile order and analytics layout optimized for admins."
              : "Live metrics from your current dataset — viewer layout highlights the overview first."}
          </p>
        </div>
        <span
          className={`hidden text-[10px] font-medium uppercase tracking-wider sm:inline ${
            isAdmin
              ? "text-violet-600 dark:text-violet-400"
              : "text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {isAdmin ? "● Admin layout" : "● Viewer layout"}
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-xl border border-zinc-200/60 bg-white/80 p-4 dark:border-zinc-700/80 dark:bg-zinc-950/50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <item.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                {item.title}
              </p>
              <p className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {item.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
