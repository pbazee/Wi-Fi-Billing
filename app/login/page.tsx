"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NeonButton } from "@/components/neon-button";
import { ParticleBg } from "@/components/particle-bg";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const ok = await login(identifier, password);
    setLoading(false);
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Try super_admin@admin.com or mall@tworivers.com");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <ParticleBg />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <Card className="ring-1 ring-cyan-400/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-purple-500/30">
              <Wifi className="h-6 w-6 text-cyan-300" />
            </div>
            <CardTitle className="text-3xl neon-heading">PeterPay WiFi</CardTitle>
            <CardDescription>Sign in to your 2028 control plane</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                placeholder="Email or phone"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error ? <p className="text-xs text-red-400">{error}</p> : null}
              <NeonButton type="submit" className="w-full" disabled={loading}>
                {loading ? "Authenticating..." : "Enter Dashboard"}
              </NeonButton>
            </form>

            <div className="mt-4 text-xs text-muted-foreground">
              <p>Super: super_admin@admin.com / admin123</p>
              <p>Tenant: mall@tworivers.com / tenant123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
