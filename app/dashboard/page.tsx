"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Building2, Coins, Router } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { routers, tenantSessionsSeries, tenants, topEarningLocations } from "@/lib/fakeData";

export default function DashboardPage() {
  const { user, selectedTenantId } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const tenant = useMemo(() => tenants.find((t) => t.id === (user?.tenantId ?? selectedTenantId)), [user, selectedTenantId]);
  const totalRevenue = tenants.reduce((acc, t) => acc + t.revenue, 0);
  const activeRouters = routers.filter((r) => r.status === "online").length;

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-8">
        <h1 className="text-2xl font-semibold neon-heading">Dashboard</h1>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        ) : user?.role === "super_admin" ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Total Tenants" value={String(tenants.length)} hint="Active multi-tenant accounts" />
              <MetricCard title="Total Revenue" value={`KSh ${totalRevenue.toLocaleString()}`} hint="Combined monthly" />
              <MetricCard title="Active Routers" value={String(activeRouters)} hint="Online across all malls" />
              <MetricCard title="Top Site" value={topEarningLocations[0].name} hint="Highest month revenue" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4" />Top Earning Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topEarningLocations.map((x) => (
                  <div key={x.name} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                    <span>{x.name}</span>
                    <span className="font-semibold text-cyan-300">KSh {x.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Revenue Today" value="KSh 28,420" hint={tenant?.name ?? "Tenant"} />
              <MetricCard title="Revenue This Month" value={`KSh ${tenant?.revenue.toLocaleString() ?? "0"}`} hint="Billing settled" />
              <MetricCard title="Live Active Users" value="183" hint="Captive sessions now" />
              <MetricCard title="Routers Online" value={String(tenant?.activeRouters ?? 0)} hint="Tenant edge devices" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="h-4 w-4" />Sessions Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 overflow-x-auto">
                  {tenantSessionsSeries.map((x) => (
                    <div key={x.time} className="min-w-14 text-center">
                      <div
                        className="mx-auto w-10 rounded-t bg-gradient-to-t from-cyan-400 to-purple-500"
                        style={{ height: `${x.sessions / 1.6}px` }}
                      />
                      <p className="mt-2 text-xs text-muted-foreground">{x.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardContent className="flex items-center gap-2 py-4 text-xs text-muted-foreground">
            <Coins className="h-4 w-4" /> Last updated: {new Date().toLocaleTimeString()}
            <Router className="ml-4 h-4 w-4" /> Smooth sync: online
          </CardContent>
        </Card>
      </motion.div>
    </AppShell>
  );
}
