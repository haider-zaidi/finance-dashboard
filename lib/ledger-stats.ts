import type { Transaction } from "./types";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function computeLedgerStats(transactions: Transaction[]) {
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const thisMonth = transactions.filter((t) => t.date.startsWith(ym));
  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");
  const totalInc = income.reduce((a, t) => a + t.amount, 0);
  const totalExp = expenses.reduce((a, t) => a + t.amount, 0);
  const savingsRate =
    totalInc > 0 ? Math.round(((totalInc - totalExp) / totalInc) * 100) : 0;
  const largestExpense = expenses.reduce<Transaction | null>(
    (best, t) => (!best || t.amount > best.amount ? t : best),
    null
  );
  const monthExpense = thisMonth
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);
  const monthIncome = thisMonth
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);
  const avgTicket =
    expenses.length > 0
      ? expenses.reduce((a, t) => a + t.amount, 0) / expenses.length
      : 0;

  return {
    transactionCount: transactions.length,
    expenseCount: expenses.length,
    incomeCount: income.length,
    savingsRate,
    savingsRateLabel: `${savingsRate}%`,
    largestExpense,
    largestExpenseLabel: largestExpense
      ? `${money(largestExpense.amount)} · ${largestExpense.category}`
      : "—",
    monthNetLabel: money(monthIncome - monthExpense),
    monthExpenseLabel: money(monthExpense),
    avgExpenseLabel: money(avgTicket),
  };
}

export function recentTransactions(
  transactions: Transaction[],
  limit = 5
): Transaction[] {
  return [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
