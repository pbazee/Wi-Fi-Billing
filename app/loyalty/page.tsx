"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { LoyaltyProgress } from "@/components/loyalty-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { loyaltyUsers, redemptionLog, tierBreakdown } from "@/lib/fakeData";

export default function LoyaltyPage() {
  const tiers = tierBreakdown();

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-8">
        <h1 className="text-2xl font-semibold neon-heading">Loyalty</h1>

        <div className="grid gap-3 md:grid-cols-3">
          <Card>
            <CardHeader><CardTitle>Bronze</CardTitle></CardHeader>
            <CardContent><LoyaltyProgress value={tiers.Bronze} /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Silver</CardTitle></CardHeader>
            <CardContent><LoyaltyProgress value={tiers.Silver} /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Gold</CardTitle></CardHeader>
            <CardContent><LoyaltyProgress value={tiers.Gold} /></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Top Loyal Users</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loyaltyUsers.map((u) => (
                  <TableRow key={u.phone}>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>{u.points}</TableCell>
                    <TableCell>{u.tier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Redemption Log</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {redemptionLog.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm">
                <span>{r.phone} redeemed {r.reward}</span>
                <span className="text-cyan-300">-{r.pointsSpent} pts | {r.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </AppShell>
  );
}
