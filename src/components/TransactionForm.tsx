"use client";

import { useState, useRef, useTransition } from "react";
import { createTransactionAction } from "@/app/actions/transactions";
import { PRESET_CATEGORIES } from "@/lib/categories";
import FormAlert from "@/components/ui/FormAlert";
import Spinner from "@/components/ui/Spinner";
interface TransactionFormProps {
  categories: string[];
}

export default function TransactionForm({ categories }: TransactionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const allCategories = Array.from(
    new Set([...PRESET_CATEGORIES, ...categories]),
  ).sort();

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await createTransactionAction(formData);

      if (result.success) {
        setSuccess(true);
        formRef.current?.reset();
        const dateInput =
          formRef.current?.querySelector<HTMLInputElement>(
            'input[name="date"]',
          );
        if (dateInput) dateInput.value = today;
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm pointer-events-none">
              $
            </span>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              required
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue="expense"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <input
            id="category"
            name="category"
            list="category-suggestions"
            required
            placeholder="e.g. Food, Salary…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <datalist id="category-suggestions">
            {allCategories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={today}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="note"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Note
        </label>
        <input
          id="note"
          name="note"
          type="text"
          maxLength={200}
          placeholder="Add a short description…"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {error && <FormAlert type="error" message={error} />}

      {success && (
        <FormAlert type="success" message="Transaction added successfully!" />
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {isPending ? (
          <>
            <Spinner />
            Adding…
          </>
        ) : (
          "+ Add Transaction"
        )}
      </button>
    </form>
  );
}
