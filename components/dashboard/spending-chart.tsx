"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { categoryColor, spendingByCategory } from "@/lib/finance-helpers";
import { useFinanceStore } from "@/lib/store";

export function SpendingBreakdownChart() {
  const transactions = useFinanceStore((s) => s.transactions);
  const role = useFinanceStore((s) => s.role);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const data = useMemo(() => spendingByCategory(transactions), [transactions]);
  const isAdmin = role === "admin";

  const tooltipStyle = {
    borderRadius: 12,
    border: isDark ? "1px solid #3f3f46" : "1px solid #e4e4e7",
    background: isDark ? "#18181b" : "#ffffff",
    color: isDark ? "#fafafa" : "#18181b",
  };

  const axis = isDark ? "#a1a1aa" : "#71717a";
  const grid = isDark ? "#3f3f46" : "#e4e4e7";

  if (data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
        No expense categories yet — spending breakdown appears here.
      </div>
    );
  }

  if (isAdmin) {
    const sorted = [...data].sort((a, b) => a.value - b.value);
    return (
      <div className="h-[300px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sorted}
            margin={{ top: 8, right: 16, left: 4, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={grid} horizontal />
            <XAxis
              type="number"
              tick={{ fill: axis, fontSize: 11 }}
              axisLine={{ stroke: grid }}
              tickLine={false}
              tickFormatter={(v) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 0,
                }).format(Number(v))
              }
            />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fill: axis, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(value))
              }
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
              {sorted.map((_, i) => (
                <Cell key={i} fill={categoryColor(i)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-2 text-center text-[11px] text-zinc-500 dark:text-zinc-500">
          Admin view · horizontal bars by category
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={56}
            outerRadius={96}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={categoryColor(i)} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(value))
            }
          />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: categoryColor(i) }}
            />
            {d.name}
          </li>
        ))}
      </ul>
      <p className="mt-1 text-center text-[11px] text-zinc-500 dark:text-zinc-500">
        Viewer view · category donut
      </p>
    </div>
  );
}
