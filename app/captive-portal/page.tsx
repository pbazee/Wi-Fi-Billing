"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Wifi, Zap } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { NeonButton } from "@/components/neon-button";
import { ParticleBg } from "@/components/particle-bg";
import { Button } from "@/components/ui/button";

type PortalPackage = {
  id: string;
  name: string;
  priceKsh: number;
  durationMinutes: number;
  detail: string;
};

const captivePackages: PortalPackage[] = [
  { id: "cp1", name: "Quick 1 Hour", priceKsh: 50, durationMinutes: 60, detail: "1 Hour Unlimited" },
  { id: "cp2", name: "Daily Unlimited", priceKsh: 150, durationMinutes: 24 * 60, detail: "24 Hours Unlimited" },
  { id: "cp3", name: "Weekend Plus", priceKsh: 300, durationMinutes: 72 * 60, detail: "3 Days Unlimited" },
  { id: "cp4", name: "Workday Boost", priceKsh: 80, durationMinutes: 120, detail: "2 Hours + Priority Speed" },
  { id: "cp5", name: "Night Owl", priceKsh: 100, durationMinutes: 480, detail: "8 Hours (10PM - 6AM)" },
];

type PaymentStage = "select" | "payment" | "processing" | "pin" | "success";

function formatCountdown(seconds: number) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function CaptivePortalPage() {
  const [selectedPackage, setSelectedPackage] = useState<PortalPackage | null>(null);
  const [stage, setStage] = useState<PaymentStage>("select");
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (stage !== "processing") {
      return;
    }
    const processingTimer = setTimeout(() => setStage("pin"), 2500);
    const pinTimer = setTimeout(() => setStage("success"), 5000);
    return () => {
      clearTimeout(processingTimer);
      clearTimeout(pinTimer);
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "success" || !selectedPackage) {
      return;
    }
    setRemainingSeconds(Math.max(selectedPackage.durationMinutes * 60 - 1, 0));
  }, [stage, selectedPackage]);

  useEffect(() => {
    if (stage !== "success" || remainingSeconds <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, remainingSeconds]);

  const timerLabel = useMemo(() => formatCountdown(remainingSeconds), [remainingSeconds]);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <ParticleBg />

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl border-white/15 p-4 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-purple-500/30">
                <Wifi className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-xl font-semibold neon-heading sm:text-2xl">Welcome to Best Net WiFi Connect</p>
                <p className="mt-1 text-sm text-muted-foreground">Two Rivers Mall</p>
                <p className="mt-2 text-sm text-cyan-200">Choose your package</p>
              </div>
            </div>
          </div>
        </motion.header>

        {stage === "select" && (
          <section className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {captivePackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  <GlassCard className="rounded-3xl p-4 sm:p-5">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">{pkg.name}</p>
                      <p className="text-sm text-muted-foreground">{pkg.detail}</p>
                      <div className="flex items-center gap-2 text-sm text-cyan-200">
                        <Clock className="h-4 w-4" />
                        <span>{Math.round(pkg.durationMinutes / 60)} hr session</span>
                      </div>
                      <p className="pt-1 text-2xl font-bold neon-heading">KSh {pkg.priceKsh}</p>
                    </div>
                    <NeonButton
                      className="mt-4 w-full"
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setStage("payment");
                      }}
                    >
                      Select
                    </NeonButton>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {(stage === "payment" || stage === "processing" || stage === "pin") && selectedPackage && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="rounded-3xl p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Selected package</p>
                  <p className="mt-1 text-xl font-semibold">{selectedPackage.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedPackage.detail}</p>
                  <p className="mt-3 text-2xl font-bold neon-heading">KSh {selectedPackage.priceKsh}</p>
                </div>
                <div className="rounded-2xl bg-cyan-400/15 p-2">
                  <Zap className="h-5 w-5 text-cyan-300" />
                </div>
              </div>

              {stage === "payment" && (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <NeonButton className="w-full sm:w-auto" onClick={() => setStage("processing")}>
                    Pay with M-Pesa
                  </NeonButton>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => setStage("select")}>
                    Back to packages
                  </Button>
                </div>
              )}

              {(stage === "processing" || stage === "pin") && (
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <motion.div
                    className="h-5 w-5 rounded-full border-2 border-cyan-300 border-t-transparent"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-sm text-cyan-100">
                    {stage === "processing" ? "Sending STK push to your phone..." : "Enter PIN on your phone..."}
                  </p>
                </div>
              )}
            </GlassCard>
          </motion.section>
        )}

        {stage === "success" && selectedPackage && (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <GlassCard className="rounded-3xl border-emerald-400/40 p-5 text-center sm:p-7">
              <CheckCircle className="mx-auto h-12 w-12 text-emerald-400" />
              <p className="mt-3 text-3xl font-semibold text-emerald-300">You&apos;re Connected!</p>
              <p className="mt-2 text-sm text-muted-foreground">Payment Successful! Enjoy the Internet.</p>
              <div className="mx-auto mt-5 max-w-xs rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3">
                <p className="text-xs text-emerald-200/90">Session timer</p>
                <p className="mt-1 text-3xl font-bold text-emerald-300">{timerLabel}</p>
              </div>
              <NeonButton className="mt-6 w-full sm:w-auto" onClick={() => (window.location.href = "https://www.google.com")}>
                Enjoy the Internet
              </NeonButton>
            </GlassCard>
          </motion.section>
        )}
      </div>
    </div>
  );
}
