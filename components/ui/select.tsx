import { cn } from "@/lib/utils";

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
};

export function Select({ value, onChange, options, className }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-10 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none focus:border-cyan-400/50",
        className
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
