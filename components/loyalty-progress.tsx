import { Progress } from "@/components/ui/progress";

export function LoyaltyProgress({ value }: { value: number }) {
  return (
    <div className="space-y-2">
      <Progress value={value} />
      <p className="text-xs text-muted-foreground">Tier progress: {value}%</p>
    </div>
  );
}
