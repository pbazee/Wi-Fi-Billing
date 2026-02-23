import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
