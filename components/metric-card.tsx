"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="hover:-translate-y-0.5 hover:shadow-neon transition-all">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl neon-heading">{value}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
