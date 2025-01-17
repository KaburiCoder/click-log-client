import { ClassNameProps } from "@/shared/types/props";
import { cn } from "@/shared/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps extends ClassNameProps {
  copyText: string;
}

export const CopyButton = ({ className, copyText }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(copyText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 800);
      }}
      className={cn(
        `absolute right-2 top-2 rounded bg-gray-700 p-2 text-sm text-white hover:bg-gray-600`,
        className,
      )}
    >
      {isCopied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};
