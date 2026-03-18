interface FormAlertProps {
  type: "error" | "success";
  message: string;
}

export default function FormAlert({ type, message }: FormAlertProps) {
  const styles = {
    error: {
      wrapper: "bg-red-50 border-red-200 text-red-700",
      role: "alert" as const,
    },
    success: {
      wrapper: "bg-green-50 border-green-200 text-green-700",
      role: "status" as const,
    },
  }[type];

  return (
    <div
      role={styles.role}
      className={`rounded-lg border px-4 py-3 text-sm flex items-start gap-2 ${styles.wrapper}`}
    >
      <span>{message}</span>
    </div>
  );
}
