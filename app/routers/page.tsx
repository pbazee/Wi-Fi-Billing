"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/auth-context";
import { routers, tenants } from "@/lib/fakeData";

export default function RoutersPage() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const list = user?.role === "super_admin" ? routers : routers.filter((r) => r.tenantId === user?.tenantId);

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-8">
        <h1 className="text-2xl font-semibold neon-heading">Routers</h1>

        <Card>
          <CardHeader>
            <CardTitle>MikroTik fleet monitor</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.name}</TableCell>
                      <TableCell>{tenants.find((t) => t.id === r.tenantId)?.name ?? "-"}</TableCell>
                      <TableCell>{r.ip}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${r.status === "online" ? "bg-green-400" : "bg-red-400"}`} />
                          {r.status}
                        </span>
                      </TableCell>
                      <TableCell>{r.lastSeen}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AppShell>
  );
}
