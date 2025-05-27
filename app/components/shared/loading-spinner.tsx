import { Loader2 } from "lucide-react";

type SpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
    </div>
  );
}
