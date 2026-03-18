"use server";

import { revalidatePath } from "next/cache";
import { createTransaction, deleteTransaction } from "@/lib/transactions";
import { createTransactionSchema } from "@/lib/validations";
import type { ActionResult, Transaction } from "@/types";

// Create Transaction
export async function createTransactionAction(
  formData: FormData,
): Promise<ActionResult<Transaction>> {
  try {
    const raw = {
      amount: parseFloat(formData.get("amount") as string),
      type: formData.get("type") as string,
      category: (formData.get("category") as string)?.trim(),
      note: (formData.get("note") as string)?.trim() ?? "",
      date: formData.get("date") as string,
    };

    const parsed = createTransactionSchema.safeParse(raw);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const message = firstIssue?.message ?? "Invalid input";
      return { success: false, error: message };
    }

    const transaction = await createTransaction(parsed.data);

    revalidatePath("/");

    return { success: true, data: transaction };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { success: false, error: message };
  }
}

// Delete Transaction
export async function deleteTransactionAction(
  id: string,
): Promise<ActionResult> {
  try {
    if (!id || typeof id !== "string" || id.trim() === "") {
      return { success: false, error: "Invalid transaction ID" };
    }

    await deleteTransaction(id.trim());
    revalidatePath("/");

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { success: false, error: message };
  }
}
