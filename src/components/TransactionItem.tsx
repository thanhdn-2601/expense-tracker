"use client";

import { useState, useTransition } from "react";
import { deleteTransactionAction } from "@/app/actions/transactions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getCategoryColor } from "@/lib/categories";
import type { Transaction } from "@/types";

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const [isPending, startTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isIncome = transaction.type === "income";

  function handleDelete() {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    setDeleteError(null);
    startTransition(async () => {
      const result = await deleteTransactionAction(transaction.id);
      if (!result.success) {
        setDeleteError(result.error ?? "Failed to delete transaction");
      }
    });
  }

  return (
    <li
      className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${
        isPending ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div
        aria-label={isIncome ? "Income" : "Expense"}
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg select-none ${
          isIncome ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
        }`}
      >
        {isIncome ? "↑" : "↓"}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(
              transaction.category,
            )}`}
          >
            {transaction.category}
          </span>

          {transaction.note && (
            <span className="text-sm text-gray-500 truncate max-w-[200px]">
              {transaction.note}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-0.5">
          {formatDate(transaction.date)}
        </p>

        {deleteError && (
          <p className="text-xs text-red-500 mt-1">{deleteError}</p>
        )}
      </div>

      <div className="text-right shrink-0">
        <p
          className={`text-base font-semibold tabular-nums ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "−"}
          {formatCurrency(transaction.amount)}
        </p>
      </div>

      <button
        onClick={handleDelete}
        disabled={isPending}
        aria-label={`Delete transaction: ${transaction.category} ${formatCurrency(transaction.amount)}`}
        className="shrink-0 p-1.5 rounded text-gray-300 hover:text-red-400 hover:bg-red-50 disabled:opacity-50 transition-colors"
      >
        {isPending ? (
          <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </li>
  );
}
