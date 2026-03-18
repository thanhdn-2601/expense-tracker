import { formatCurrency } from "@/lib/utils";

interface DashboardSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

interface SummaryCardProps {
  label: string;
  amount: number;
  icon: string;
  colorClass: string;
  textClass: string;
  prefix?: string;
}

function SummaryCard({
  label,
  amount,
  icon,
  colorClass,
  textClass,
  prefix = "",
}: SummaryCardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-shadow hover:shadow-md ${colorClass}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl" aria-hidden="true">
          {icon}
        </span>
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      <p className={`text-2xl font-bold tracking-tight ${textClass}`}>
        {prefix}
        {formatCurrency(Math.abs(amount))}
      </p>
    </div>
  );
}

export default function DashboardSummary({
  totalIncome,
  totalExpense,
  balance,
}: DashboardSummaryProps) {
  const balancePositive = balance >= 0;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      aria-label="Financial summary"
    >
      <SummaryCard
        label="Total Income"
        amount={totalIncome}
        icon="📈"
        colorClass="bg-green-50 border-green-200"
        textClass="text-green-700"
      />

      <SummaryCard
        label="Total Expenses"
        amount={totalExpense}
        icon="📉"
        colorClass="bg-red-50 border-red-200"
        textClass="text-red-600"
      />

      <SummaryCard
        label="Balance"
        amount={balance}
        icon="💼"
        prefix={balance < 0 ? "−" : ""}
        colorClass={
          balancePositive
            ? "bg-blue-50 border-blue-200"
            : "bg-orange-50 border-orange-200"
        }
        textClass={balancePositive ? "text-blue-700" : "text-orange-600"}
      />
    </div>
  );
}
