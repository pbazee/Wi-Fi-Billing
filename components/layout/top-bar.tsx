"use client";

import { useState } from "react";
import { Moon, Sun, UserCircle2, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/auth-context";
import { tenants } from "@/lib/fakeData";
import { Select } from "@/components/ui/select";

export function TopBar() {
  const { setTheme, resolvedTheme } = useTheme();
  const { user, selectedTenantId, switchTenant, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="glass sticky top-4 z-30 mx-3 flex items-center justify-between rounded-2xl px-4 py-3 lg:ml-[18rem] lg:mr-4">
      <div>
        <p className="text-xs text-muted-foreground">Best Net WiFi Connect Control Plane</p>
        <p className="text-sm font-medium">{new Date().toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        {user?.role === "super_admin" ? (
          <Select
            value={selectedTenantId}
            onChange={switchTenant}
            options={tenants.map((t) => ({ label: t.name, value: t.id }))}
            className="hidden sm:block"
          />
        ) : null}

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen((x) => !x)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            <UserCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">{user?.name ?? "Guest"}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
          {open ? (
            <div className="glass absolute right-0 top-12 w-44 rounded-xl p-1 text-sm">
              <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/10">Profile</button>
              <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/10">Billing</button>
              <button
                onClick={logout}
                className="w-full rounded-lg px-3 py-2 text-left text-red-300 hover:bg-red-500/10"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
