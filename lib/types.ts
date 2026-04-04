export type TransactionType = "income" | "expense";
export type UserRole = "viewer" | "admin";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description?: string;
}

export type SortKey = "date" | "amount" | "category" | "type";
export type SortDir = "asc" | "desc";
