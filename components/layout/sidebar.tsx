"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Router, Package, Award, Building2, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

type Item = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  superOnly?: boolean;
};

const items: Item[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/tenants", label: "Tenants", icon: Building2, superOnly: true },
  { href: "/routers", label: "Routers", icon: Router },
  { href: "/packages", label: "Packages", icon: Package },
  { href: "/loyalty", label: "Loyalty", icon: Award },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const filtered = items.filter((item) => !item.superOnly || user?.role === "super_admin");

  return (
    <>
      <aside className="glass fixed left-4 top-4 hidden h-[calc(100vh-2rem)] w-64 rounded-3xl p-4 lg:block">
        <p className="mb-6 px-2 text-lg font-semibold neon-heading">PeterPay WiFi</p>
        <nav className="space-y-1">
          {filtered.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-200 ring-1 ring-cyan-400/35"
                    : "hover:bg-white/10"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-sm hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      <div className="glass fixed bottom-3 left-3 right-3 z-40 rounded-2xl px-2 py-1 lg:hidden">
        <div className="grid grid-cols-6 gap-1">
          {filtered.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("rounded-lg p-2", active ? "bg-cyan-400/20" : "hover:bg-white/10")}
                aria-label={item.label}
              >
                <Icon className="mx-auto h-4 w-4" />
              </Link>
            );
          })}
          <button onClick={logout} className="rounded-lg p-2 hover:bg-white/10" aria-label="Logout">
            <LogOut className="mx-auto h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
