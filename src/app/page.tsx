import { Suspense } from "react";
import { getTransactions, getCategories } from "@/lib/transactions";
import { getCurrentMonth } from "@/lib/utils";
import DashboardSummary from "@/components/DashboardSummary";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import FilterBar from "@/components/FilterBar";
import type { FilterOptions } from "@/types";

interface HomePageProps {
  searchParams: {
    month?: string;
    category?: string;
  };
}

function TransactionSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-6 py-4 border-b border-gray-50"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-24" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      ))}
    </div>
  );
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const filters: FilterOptions = {
    month: searchParams.month || getCurrentMonth(),
    category: searchParams.category,
  };

  let transactions;
  let categories: string[];

  try {
    [transactions, categories] = await Promise.all([
      getTransactions(filters),
      getCategories(),
    ]);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to load data from database.";
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl border border-red-200 shadow-sm max-w-md">
          <h2 className="text-lg font-semibold text-red-700 mb-1">
            Database connection error
          </h2>
        </div>
      </main>
    );
  }

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Expense Tracker
          </h1>
        </header>

        <DashboardSummary
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Add Transaction
          </h2>
          <TransactionForm categories={categories} />
        </section>

        <FilterBar
          currentMonth={filters.month}
          currentCategory={filters.category}
          categories={categories}
        />

        <Suspense fallback={<TransactionSkeleton />}>
          <TransactionList transactions={transactions} exportLabel={filters.month} />
        </Suspense>
      </div>
    </main>
  );
}
