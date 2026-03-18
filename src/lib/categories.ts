export const PRESET_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Health",
  "Salary",
  "Freelance",
  "Investment",
  "Education",
  "Shopping",
  "Other",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  food: "bg-orange-100 text-orange-700",
  transport: "bg-blue-100 text-blue-700",
  housing: "bg-purple-100 text-purple-700",
  entertainment: "bg-pink-100 text-pink-700",
  health: "bg-red-100 text-red-700",
  salary: "bg-green-100 text-green-700",
  freelance: "bg-teal-100 text-teal-700",
  investment: "bg-indigo-100 text-indigo-700",
  education: "bg-yellow-100 text-yellow-700",
  shopping: "bg-rose-100 text-rose-700",
  other: "bg-gray-100 text-gray-700",
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category.toLowerCase()] ?? "bg-gray-100 text-gray-700";
}
