"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyIncomeExpenseSeries } from "@/lib/finance-helpers";
import { useFinanceStore } from "@/lib/store";

export function MonthlyCashflowBars() {
  const transactions = useFinanceStore((s) => s.transactions);
  const role = useFinanceStore((s) => s.role);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const series = useMemo(
    () => monthlyIncomeExpenseSeries(transactions),
    [transactions]
  );
  const isAdmin = role === "admin";

  const chartData = useMemo(
    () =>
      series.map((r) => ({
        name: r.label,
        income: r.income,
        expense: r.expense,
      })),
    [series]
  );

  const maxVal = useMemo(
    () => series.reduce((m, r) => Math.max(m, r.income, r.expense), 1),
    [series]
  );

  const axis = isDark ? "#a1a1aa" : "#71717a";
  const grid = isDark ? "#3f3f46" : "#e4e4e7";

  const tooltipStyle = {
    borderRadius: 12,
    border: isDark ? "1px solid #3f3f46" : "1px solid #e4e4e7",
    background: isDark ? "#18181b" : "#ffffff",
    color: isDark ? "#fafafa" : "#18181b",
  };

  const fmt = (v: number | string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(v));

  if (series.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No monthly data to compare yet.
      </p>
    );
  }

  if (isAdmin) {
    return (
      <div className="h-[320px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: axis, fontSize: 10 }}
              axisLine={{ stroke: grid }}
              tickLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={56}
            />
            <YAxis
              tick={{ fill: axis, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 0,
                }).format(Number(v))
              }
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => fmt(Number(value))}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="expense"
              name="Expenses"
              fill="#f43f5e"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-1 text-center text-[11px] text-zinc-500 dark:text-zinc-500">
          Admin view · grouped column chart (Recharts)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-emerald-500" />
          Income
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-rose-500" />
          Expenses
        </span>
      </div>
      <div className="flex flex-wrap items-end gap-4 sm:gap-6">
        {series.map((row) => (
          <div key={row.month} className="flex flex-col items-center gap-2">
            <div className="flex h-36 items-end gap-1.5">
              <div
                className="w-6 rounded-t-md bg-emerald-500/90 dark:bg-emerald-500/80"
                style={{
                  height: `${Math.max(8, (row.income / maxVal) * 100)}%`,
                }}
                title={`Income ${row.income}`}
              />
              <div
                className="w-6 rounded-t-md bg-rose-500/90 dark:bg-rose-500/80"
                style={{
                  height: `${Math.max(8, (row.expense / maxVal) * 100)}%`,
                }}
                title={`Expense ${row.expense}`}
              />
            </div>
            <span className="max-w-[4.5rem] text-center text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
              {row.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-[11px] text-zinc-500 dark:text-zinc-500">
        Viewer view · compact bar strips
      </p>
    </div>
  );
}
