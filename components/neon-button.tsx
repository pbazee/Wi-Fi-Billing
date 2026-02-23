import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

export function NeonButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-neon hover:scale-105 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]",
        className
      )}
      {...props}
    />
  );
}
