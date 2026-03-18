interface SpinnerProps {
  className?: string;
}

export default function Spinner({
  className = "w-4 h-4 border-white",
}: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block border-2 border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
}
