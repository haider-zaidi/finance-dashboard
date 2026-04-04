"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { monthlyNetSeries } from "@/lib/finance-helpers";
import { useFinanceStore } from "@/lib/store";

export function BalanceTrendChart() {
  const transactions = useFinanceStore((s) => s.transactions);
  const role = useFinanceStore((s) => s.role);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const data = useMemo(() => monthlyNetSeries(transactions), [transactions]);
  const axis = isDark ? "#a1a1aa" : "#71717a";
  const grid = isDark ? "#3f3f46" : "#e4e4e7";
  const isAdmin = role === "admin";

  const tooltipStyle = {
    borderRadius: 12,
    border: isDark ? "1px solid #3f3f46" : "1px solid #e4e4e7",
    background: isDark ? "#18181b" : "#ffffff",
    color: isDark ? "#fafafa" : "#18181b",
  };

  const fmtMoney = (value: number | string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value));

  if (data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
        Add transactions to see balance trend over time.
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="h-[300px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: axis, fontSize: 11 }}
              axisLine={{ stroke: grid }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: axis, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(Number(v))
              }
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => [fmtMoney(Number(value)), "Running balance"]}
              labelFormatter={(l) => l}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ fill: "#7c3aed", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-1 text-center text-[11px] text-zinc-500 dark:text-zinc-500">
          Admin view · line chart with markers
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillBalanceViewer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: axis, fontSize: 11 }}
            axisLine={{ stroke: grid }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: axis, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) =>
              new Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(Number(v))
            }
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [fmtMoney(Number(value)), "Running balance"]}
            labelFormatter={(l) => l}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#7c3aed"
            strokeWidth={2}
            fill="url(#fillBalanceViewer)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="mt-1 text-center text-[11px] text-zinc-500 dark:text-zinc-500">
        Viewer view · filled area trend
      </p>
    </div>
  );
}
