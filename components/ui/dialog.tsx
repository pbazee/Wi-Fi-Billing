"use client";

import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
};

export function Dialog({ open, onOpenChange, title, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => onOpenChange(false)}>
      <div className={cn("glass w-full max-w-lg rounded-2xl p-5")} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold neon-heading">{title}</h3>
          <button className="text-sm text-muted-foreground hover:text-white" onClick={() => onOpenChange(false)}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
