import { supabase } from "./supabase";
import type {
  Transaction,
  CreateTransactionInput,
  FilterOptions,
} from "@/types";

/**
 * Fetch all transactions, optionally filtered by month and/or category.
 * Results are ordered newest-first.
 */
export async function getTransactions(
  filters?: FilterOptions,
): Promise<Transaction[]> {
  let query = supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters?.month) {
    const [year, month] = filters.month.split("-").map(Number);
    const start = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const end = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    query = query.gte("date", start).lte("date", end);
  }

  if (filters?.category && filters.category !== "all") {
    query = query.eq("category", filters.category);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch transactions: ${error.message}`);
  }

  return (data ?? []) as Transaction[];
}

/**
 * Insert a new transaction row and return the created record.
 */
export async function createTransaction(
  input: CreateTransactionInput,
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .insert([input])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create transaction: ${error.message}`);
  }

  return data as Transaction;
}

/**
 * Permanently delete a transaction by its UUID.
 */
export async function deleteTransaction(id: string): Promise<void> {
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete transaction: ${error.message}`);
  }
}

/**
 * Return a de-duplicated, sorted list of all category names stored in the DB.
 * Used to populate filter dropdowns and the form datalist.
 */
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("category");

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  const raw: string[] = (data ?? []).map((row: Record<string, unknown>) =>
    String(row.category),
  );
  const unique: string[] = Array.from(new Set(raw));
  return unique.sort((a, b) => a.localeCompare(b));
}
