import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import initialData from "@/data/initial-transactions.json";
import type { SortDir, SortKey, Transaction, UserRole } from "./types";

export type CategoryFilter = "all" | string;
export type TypeFilter = "all" | "income" | "expense";

interface FinanceState {
  transactions: Transaction[];
  role: UserRole;
  search: string;
  categoryFilter: CategoryFilter;
  typeFilter: TypeFilter;
  sortKey: SortKey;
  sortDir: SortDir;
  setRole: (role: UserRole) => void;
  setSearch: (search: string) => void;
  setCategoryFilter: (c: CategoryFilter) => void;
  setTypeFilter: (t: TypeFilter) => void;
  setSort: (key: SortKey, dir: SortDir) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, patch: Partial<Transaction>) => void;
  resetToSeed: () => void;
}

const seed = (initialData.transactions as Transaction[]).slice();

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: seed,
      role: "viewer",
      search: "",
      categoryFilter: "all",
      typeFilter: "all",
      sortKey: "date",
      sortDir: "desc",
      setRole: (role) => set({ role }),
      setSearch: (search) => set({ search }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),
      setSort: (sortKey, sortDir) => set({ sortKey, sortDir }),
      addTransaction: (t) => {
        const id =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `tx-${Date.now()}`;
        set((s) => ({
          transactions: [{ ...t, id }, ...s.transactions],
        }));
      },
      updateTransaction: (id, patch) =>
        set((s) => ({
          transactions: s.transactions.map((x) =>
            x.id === id ? { ...x, ...patch } : x
          ),
        })),
      resetToSeed: () => set({ transactions: seed.slice() }),
    }),
    {
      name: "finance-dashboard-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        transactions: s.transactions,
        role: s.role,
      }),
      skipHydration: true,
    }
  )
);

/** Pure helper: use inside `useMemo` — do not pass directly to `useFinanceStore` (new array each call breaks useSyncExternalStore). */
export type TransactionListQuery = Pick<
  FinanceState,
  "transactions" | "search" | "categoryFilter" | "typeFilter" | "sortKey" | "sortDir"
>;

export function computeFilteredSortedTransactions(
  state: TransactionListQuery
): Transaction[] {
  let list = state.transactions;
  const q = state.search.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (t) =>
        t.category.toLowerCase().includes(q) ||
        (t.description?.toLowerCase().includes(q) ?? false) ||
        t.type.includes(q) ||
        t.amount.toString().includes(q)
    );
  }
  if (state.categoryFilter !== "all") {
    list = list.filter((t) => t.category === state.categoryFilter);
  }
  if (state.typeFilter !== "all") {
    list = list.filter((t) => t.type === state.typeFilter);
  }
  const dir = state.sortDir === "asc" ? 1 : -1;
  const key = state.sortKey;
  return [...list].sort((a, b) => {
    if (key === "amount") return (a.amount - b.amount) * dir;
    if (key === "category") return a.category.localeCompare(b.category) * dir;
    if (key === "type") return a.type.localeCompare(b.type) * dir;
    return a.date.localeCompare(b.date) * dir;
  });
}
