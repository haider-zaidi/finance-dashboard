import type { Transaction, TransactionType } from "./types";

export function sumByType(transactions: Transaction[], type: TransactionType) {
  return transactions
    .filter((t) => t.type === type)
    .reduce((acc, t) => acc + t.amount, 0);
}

export function totalBalance(transactions: Transaction[]) {
  return transactions.reduce(
    (acc, t) => acc + (t.type === "income" ? t.amount : -t.amount),
    0
  );
}

export function spendingByCategory(transactions: Transaction[]) {
  const map = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

/** End-of-month net (income - expenses) for trend line */
export function monthlyNetSeries(transactions: Transaction[]) {
  const byMonth = new Map<string, { income: number; expense: number }>();
  for (const t of transactions) {
    const key = t.date.slice(0, 7);
    const cur = byMonth.get(key) ?? { income: 0, expense: 0 };
    if (t.type === "income") cur.income += t.amount;
    else cur.expense += t.amount;
    byMonth.set(key, cur);
  }
  const sorted = [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b));
  let running = 0;
  return sorted.map(([month, v]) => {
    const net = v.income - v.expense;
    running += net;
    return {
      month,
      label: formatMonthLabel(month),
      net,
      balance: running,
    };
  });
}

function formatMonthLabel(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/** For compact income vs expense bar comparison */
export function monthlyIncomeExpenseSeries(transactions: Transaction[]) {
  const byMonth = new Map<string, { income: number; expense: number }>();
  for (const t of transactions) {
    const key = t.date.slice(0, 7);
    const cur = byMonth.get(key) ?? { income: 0, expense: 0 };
    if (t.type === "income") cur.income += t.amount;
    else cur.expense += t.amount;
    byMonth.set(key, cur);
  }
  return [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, v]) => ({
      month,
      label: formatMonthLabel(month),
      income: v.income,
      expense: v.expense,
    }));
}

export function highestSpendingCategory(transactions: Transaction[]) {
  const breakdown = spendingByCategory(transactions);
  return breakdown[0] ?? null;
}

export function monthlyComparison(transactions: Transaction[]) {
  const byMonth = new Map<string, { income: number; expense: number }>();
  for (const t of transactions) {
    const key = t.date.slice(0, 7);
    const cur = byMonth.get(key) ?? { income: 0, expense: 0 };
    if (t.type === "income") cur.income += t.amount;
    else cur.expense += t.amount;
    byMonth.set(key, cur);
  }
  const keys = [...byMonth.keys()].sort();
  if (keys.length < 2) return null;
  const last = keys[keys.length - 1];
  const prev = keys[keys.length - 2];
  const a = byMonth.get(last)!;
  const b = byMonth.get(prev)!;
  return {
    currentMonth: last,
    previousMonth: prev,
    expenseDelta: a.expense - b.expense,
    incomeDelta: a.income - b.income,
    currentExpense: a.expense,
    previousExpense: b.expense,
  };
}

const CHART_COLORS = [
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#ec4899",
  "#14b8a6",
  "#a855f7",
  "#eab308",
  "#ef4444",
];

export function categoryColor(index: number) {
  return CHART_COLORS[index % CHART_COLORS.length];
}
