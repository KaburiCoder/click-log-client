import { ClassNameProps } from "@/shared/types/props";
import { cn } from "@/shared/utils";

interface DetailItemProps extends ClassNameProps {
  label: string;
  value: React.ReactNode;
}

export function DetailItem({ label, value, className }: DetailItemProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-4", className)}>
      <div className={cn("flex items-center font-semibold whitespace-nowrap")}>{label}:</div>
      <div className={cn("col-span-3 break-words")}>{value}</div>
    </div>
  );
}

