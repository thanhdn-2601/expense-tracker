"use client";

import { useRouter } from "next/navigation";
import { getLastNMonths, getMonthLabel } from "@/lib/utils";

interface FilterBarProps {
  currentMonth?: string;
  currentCategory?: string;
  categories: string[];
}

export default function FilterBar({
  currentMonth,
  currentCategory,
  categories,
}: FilterBarProps) {
  const router = useRouter();

  const monthOptions = getLastNMonths(12);

  /**
   * Update a single filter key in the URL, preserving the other active filters.
   */
  function updateFilter(key: "month" | "category", value: string) {
    const params = new URLSearchParams();

    if (key !== "month" && currentMonth) params.set("month", currentMonth);
    if (key !== "category" && currentCategory && currentCategory !== "all") {
      params.set("category", currentCategory);
    }

    if (value && value !== "all") {
      params.set(key, value);
    }

    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col sm:flex-row gap-3 sm:items-center">
      <span
        className="text-sm font-medium text-gray-500 shrink-0"
        aria-hidden="true"
      >
        Filter by:
      </span>

      <div className="flex items-center gap-2">
        <label
          htmlFor="month-filter"
          className="text-sm text-gray-500 shrink-0"
        >
          Month:
        </label>
        <select
          id="month-filter"
          value={currentMonth ?? ""}
          onChange={(e) => updateFilter("month", e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
        >
          <option value="">All time</option>
          {monthOptions.map((m) => (
            <option key={m} value={m}>
              {getMonthLabel(m)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="category-filter"
          className="text-sm text-gray-500 shrink-0"
        >
          Category:
        </label>
        <select
          id="category-filter"
          value={currentCategory ?? "all"}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {(currentMonth || (currentCategory && currentCategory !== "all")) && (
        <button
          onClick={() => router.push("/")}
          className="text-sm text-blue-500 hover:text-blue-700 underline underline-offset-2 transition-colors sm:ml-auto"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
