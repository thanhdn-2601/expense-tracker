/**
 * Format a numeric value as a currency string.
 * Defaults to USD. Uses the browser / Node's Intl API.
 *
 * @example formatCurrency(1234.5) → "$1,234.50"
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Convert an ISO date string ("YYYY-MM-DD") into a human-readable label.
 *
 * @example formatDate("2024-03-17") → "Mar 17, 2024"
 */
export function formatDate(dateString: string): string {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Return the current month in "YYYY-MM" format.
 *
 * @example getCurrentMonth() → "2024-03"
 */
export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Convert a "YYYY-MM" string into a human-readable month label.
 *
 * @example getMonthLabel("2024-03") → "March 2024"
 */
export function getMonthLabel(month: string): string {
  const [year, monthNum] = month.split("-").map(Number);
  const date = new Date(year, monthNum - 1, 1);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

/**
 * Return an array of the last N months (including the current one),
 * each formatted as "YYYY-MM", newest first.
 *
 * @example getLastNMonths(3) → ["2024-03", "2024-02", "2024-01"]
 */
export function getLastNMonths(n: number): string[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  }
  return months;
}

/**
 * Clamp a string to `maxLength` characters, appending "…" if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
}
