export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  note: string;
  date: string;
  created_at?: string;
}

export interface CreateTransactionInput {
  amount: number;
  type: TransactionType;
  category: string;
  note: string;
  date: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface FilterOptions {
  month?: string;
  category?: string;
}

export interface ActionResult<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}
