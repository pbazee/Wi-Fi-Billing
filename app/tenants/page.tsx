"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tenants as seed } from "@/lib/fakeData";

export default function TenantsPage() {
  const [items, setItems] = useState(seed);

  return (
    <AppShell superOnly>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-8">
        <h1 className="text-2xl font-semibold neon-heading">Tenants</h1>

        <Card>
          <CardHeader>
            <CardTitle>All malls and markets</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.location}</TableCell>
                    <TableCell>
                      <Badge className={t.status === "active" ? "text-green-300" : "text-red-300"}>{t.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={t.monthlySubscription === "paid" ? "text-cyan-300" : "text-amber-300"}>
                        {t.monthlySubscription}
                      </Badge>
                    </TableCell>
                    <TableCell>KSh {t.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setItems((prev) =>
                            prev.map((x) =>
                              x.id === t.id ? { ...x, status: x.status === "active" ? "suspended" : "active" } : x
                            )
                          )
                        }
                      >
                        {t.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </AppShell>
  );
}
