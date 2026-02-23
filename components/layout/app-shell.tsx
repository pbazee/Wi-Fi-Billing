"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

type Props = {
  children: React.ReactNode;
  superOnly?: boolean;
};

export function AppShell({ children, superOnly = false }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    if (superOnly && user.role !== "super_admin") {
      router.replace("/dashboard");
    }
  }, [user, superOnly, router]);

  if (!user || (superOnly && user.role !== "super_admin")) {
    return null;
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Sidebar />
      <TopBar />
      <main className="mx-3 mt-4 lg:ml-[18rem] lg:mr-4">{children}</main>
    </div>
  );
}
