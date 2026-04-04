"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search } from "lucide-react";
import {
  useFinanceStore,
  computeFilteredSortedTransactions,
} from "@/lib/store";
import type { SortKey } from "@/lib/types";
import type { Transaction } from "@/lib/types";
import { TransactionModal } from "./transaction-modal";
import { ExportToolbar } from "./export-toolbar";

const money = (n: number, type: "income" | "expense") =>
  `${type === "expense" ? "−" : "+"}${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n)}`;

export function TransactionsSection() {
  const role = useFinanceStore((s) => s.role);
  const search = useFinanceStore((s) => s.search);
  const setSearch = useFinanceStore((s) => s.setSearch);
  const categoryFilter = useFinanceStore((s) => s.categoryFilter);
  const setCategoryFilter = useFinanceStore((s) => s.setCategoryFilter);
  const typeFilter = useFinanceStore((s) => s.typeFilter);
  const setTypeFilter = useFinanceStore((s) => s.setTypeFilter);
  const sortKey = useFinanceStore((s) => s.sortKey);
  const sortDir = useFinanceStore((s) => s.sortDir);
  const setSort = useFinanceStore((s) => s.setSort);
  const transactions = useFinanceStore((s) => s.transactions);
  const filtered = useMemo(
    () =>
      computeFilteredSortedTransactions({
        transactions,
        search,
        categoryFilter,
        typeFilter,
        sortKey,
        sortDir,
      }),
    [
      transactions,
      search,
      categoryFilter,
      typeFilter,
      sortKey,
      sortDir,
    ]
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    transactions.forEach((t) => set.add(t.category));
    return ["all", ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [transactions]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (t: Transaction) => {
    setEditing(t);
    setModalOpen(true);
  };

  const isAdmin = role === "admin";

  return (
    <section
      id="section-ledger"
      className="scroll-mt-24 rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Transactions
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Filter, sort, and search your ledger.{" "}
            {isAdmin
              ? "As admin you can add or edit rows."
              : "Viewer role is read-only."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ExportToolbar rows={filtered} />
          {isAdmin && (
            <button
              type="button"
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
            >
              <Plus className="h-4 w-4" />
              Add transaction
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            placeholder="Search category, note, amount…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 outline-none ring-violet-500/30 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All categories" : c}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value as "all" | "income" | "expense")
          }
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <div className="flex gap-2">
          <select
            value={sortKey}
            onChange={(e) =>
              setSort(e.target.value as SortKey, sortDir)
            }
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          >
            <option value="date">Sort: date</option>
            <option value="amount">Sort: amount</option>
            <option value="category">Sort: category</option>
            <option value="type">Sort: type</option>
          </select>
          <select
            value={sortDir}
            onChange={(e) =>
              setSort(sortKey, e.target.value as "asc" | "desc")
            }
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
        {transactions.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No transactions yet. Switch to{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Admin
            </span>{" "}
            to add your first entry, or reset data from the footer if you
            cleared storage.
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Nothing matches your filters or search. Try clearing filters or
            broadening your query.
          </div>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-950/80 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 hidden md:table-cell">Note</th>
                {isAdmin && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="bg-white/50 transition hover:bg-violet-50/40 dark:bg-transparent dark:hover:bg-violet-950/20"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {new Date(t.date + "T12:00:00").toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td
                    className={`whitespace-nowrap px-4 py-3 font-medium ${
                      t.type === "income"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {money(t.amount, t.type)}
                  </td>
                  <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">
                    {t.category}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        t.type === "income"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="hidden max-w-xs truncate px-4 py-3 text-zinc-500 dark:text-zinc-400 md:table-cell">
                    {t.description ?? "—"}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => openEdit(t)}
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 hover:border-violet-300 hover:text-violet-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-violet-500"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
      />
    </section>
  );
}
