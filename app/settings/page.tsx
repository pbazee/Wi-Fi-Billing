"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NeonButton } from "@/components/neon-button";

export default function SettingsPage() {
  return (
    <AppShell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-8">
        <h1 className="text-2xl font-semibold neon-heading">Settings</h1>
        <Card>
          <CardHeader><CardTitle>Brand & Notification Preferences</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Brand name" defaultValue="PeterPay WiFi" />
            <Input placeholder="Support email" defaultValue="support@peterpaywifi.com" />
            <Input placeholder="M-Pesa shortcode" defaultValue="123456" />
            <Input placeholder="Auto-disconnect timeout (min)" defaultValue="10" />
            <div className="md:col-span-2">
              <NeonButton>Save Settings</NeonButton>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppShell>
  );
}
