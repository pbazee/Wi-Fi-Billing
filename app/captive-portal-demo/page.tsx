"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wifi, Smartphone } from "lucide-react";
import { packages } from "@/lib/fakeData";
import { GlassCard } from "@/components/glass-card";
import { Input } from "@/components/ui/input";
import { NeonButton } from "@/components/neon-button";
import { Badge } from "@/components/ui/badge";
import { ParticleBg } from "@/components/particle-bg";
import { SessionTimer } from "@/components/session-timer";

export default function CaptivePortalDemoPage() {
  const [selected, setSelected] = useState(packages[1]);
  const [phone, setPhone] = useState("");
  const [paid, setPaid] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8">
      <ParticleBg />
      <div className="mx-auto max-w-4xl space-y-6">
        <motion.header initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-purple-500/30">
              <Wifi className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-lg font-semibold neon-heading">PeterPay WiFi</p>
              <p className="text-xs text-muted-foreground">Customer Captive Portal Demo</p>
            </div>
          </div>
          <Badge className="text-cyan-300">Public demo</Badge>
        </motion.header>

        {!paid ? (
          <>
            <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {packages.map((pkg) => (
                <GlassCard key={pkg.id} className={`cursor-pointer p-4 ${selected.id === pkg.id ? "ring-1 ring-cyan-400/50" : ""}`}>
                  <button onClick={() => setSelected(pkg)} className="w-full text-left">
                    <p className="font-semibold">{pkg.name}</p>
                    <p className="text-xs text-muted-foreground">{pkg.durationMin} min • {pkg.speedMbps} Mbps</p>
                    <p className="mt-2 text-xl font-bold neon-heading">KSh {pkg.priceKsh}</p>
                  </button>
                </GlassCard>
              ))}
            </section>

            <GlassCard className="p-5">
              <p className="mb-3 text-sm text-muted-foreground">Enter phone and complete fake M-Pesa STK push</p>
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="relative">
                  <Smartphone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-9" placeholder="2547XXXXXXXX" />
                </div>
                <NeonButton onClick={() => setPaid(true)} disabled={!phone.trim()}>
                  Pay with M-Pesa
                </NeonButton>
              </div>
            </GlassCard>
          </>
        ) : (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <GlassCard className="p-5 text-center">
              <p className="text-sm text-muted-foreground">Payment successful. Internet session is active.</p>
              <p className="mt-2 text-2xl font-semibold neon-heading">Welcome online</p>
              <p className="mt-1 text-sm">Loyalty points earned: <span className="text-cyan-300">+{Math.max(10, selected.priceKsh / 2)} pts</span></p>
            </GlassCard>
            <SessionTimer totalSeconds={selected.durationMin * 60} />
            <GlassCard className="p-4 text-sm text-muted-foreground">
              Add to Home Screen for one-tap reconnect. On iPhone/Android browser: Share menu &gt; Add to Home Screen.
            </GlassCard>
          </motion.section>
        )}
      </div>
    </div>
  );
}
