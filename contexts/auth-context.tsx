"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoUsers, tenants } from "@/lib/fakeData";
import type { Role } from "@/lib/types";

type AuthUser = {
  name: string;
  email: string;
  role: Role;
  tenantId?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  selectedTenantId: string;
  login: (identifier: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchTenant: (tenantId: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "bestnet-auth";
const TENANT_KEY = "bestnet-selected-tenant";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [selectedTenantId, setSelectedTenantId] = useState(tenants[0]?.id ?? "");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedTenant = localStorage.getItem(TENANT_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    if (savedTenant) setSelectedTenantId(savedTenant);
  }, []);

  const login = async (identifier: string, password: string) => {
    const value = identifier.toLowerCase().trim();

    if (value === demoUsers.super_admin.email && password === demoUsers.super_admin.password) {
      const next: AuthUser = {
        name: demoUsers.super_admin.name,
        email: demoUsers.super_admin.email,
        role: "super_admin",
      };
      setUser(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return true;
    }

    if (value === demoUsers.tenant_admin.email && password === demoUsers.tenant_admin.password) {
      const next: AuthUser = {
        name: demoUsers.tenant_admin.name,
        email: demoUsers.tenant_admin.email,
        role: "tenant_admin",
        tenantId: demoUsers.tenant_admin.tenantId,
      };
      setUser(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      localStorage.setItem(TENANT_KEY, next.tenantId ?? tenants[0].id);
      setSelectedTenantId(next.tenantId ?? tenants[0].id);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const switchTenant = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    localStorage.setItem(TENANT_KEY, tenantId);
  };

  const value = useMemo(
    () => ({ user, login, logout, selectedTenantId, switchTenant }),
    [user, selectedTenantId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
