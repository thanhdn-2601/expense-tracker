import { z } from "zod";

/**
 * Validates the raw form data before a transaction is persisted.
 * Enforces business rules (positive amount, valid type, required category, etc.)
 */
export const createTransactionSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than 0")
    .max(1_000_000_000, "Amount is too large"),

  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: 'Type must be "income" or "expense"' }),
  }),

  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category is required")
    .max(50, "Category must be 50 characters or less")
    .trim(),

  note: z
    .string()
    .max(200, "Note must be 200 characters or less")
    .trim()
    .default(""),

  date: z
    .string({ required_error: "Date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const filterSchema = z.object({
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format")
    .optional(),
  category: z.string().optional(),
});

export type FilterInput = z.infer<typeof filterSchema>;
