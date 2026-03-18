import type { Transaction } from "@/types";
import TransactionItem from "./TransactionItem";
import ExportButton from "./ExportButton";

interface TransactionListProps {
  transactions: Transaction[];
  exportLabel?: string;
}

export default function TransactionList({
  transactions,
  exportLabel,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <p className="text-gray-600 font-semibold">No transactions</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-gray-800">Transactions</h2>
          <span className="text-sm text-gray-400">
            {transactions.length} record{transactions.length !== 1 ? "s" : ""}
          </span>
        </div>
        <ExportButton transactions={transactions} label={exportLabel} />
      </div>

      <ul className="divide-y divide-gray-50" aria-label="Transaction list">
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </ul>
    </div>
  );
}
