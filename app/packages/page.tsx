"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NeonButton } from "@/components/neon-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { packages as seed } from "@/lib/fakeData";

export default function PackagesPage() {
  const [items, setItems] = useState(seed);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", durationMin: "", priceKsh: "", speedMbps: "" });

  const addPackage = () => {
    if (!form.name) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: form.name,
        durationMin: Number(form.durationMin) || 0,
        priceKsh: Number(form.priceKsh) || 0,
        speedMbps: Number(form.speedMbps) || 0,
      },
    ]);
    setOpen(false);
    setForm({ name: "", durationMin: "", priceKsh: "", speedMbps: "" });
  };

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold neon-heading">Packages</h1>
          <NeonButton onClick={() => setOpen(true)}>Create Package</NeonButton>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Time-based WiFi packages</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Duration (min)</TableHead>
                  <TableHead>Price (KSh)</TableHead>
                  <TableHead>Speed (Mbps)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.durationMin}</TableCell>
                    <TableCell>{p.priceKsh}</TableCell>
                    <TableCell>{p.speedMbps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen} title="Create New Package">
          <div className="space-y-3">
            <Input placeholder="Package name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
            <Input placeholder="Duration minutes" value={form.durationMin} onChange={(e) => setForm((s) => ({ ...s, durationMin: e.target.value }))} />
            <Input placeholder="Price KSh" value={form.priceKsh} onChange={(e) => setForm((s) => ({ ...s, priceKsh: e.target.value }))} />
            <Input placeholder="Speed Mbps" value={form.speedMbps} onChange={(e) => setForm((s) => ({ ...s, speedMbps: e.target.value }))} />
            <NeonButton className="w-full" onClick={addPackage}>Save Package</NeonButton>
          </div>
        </Dialog>
      </motion.div>
    </AppShell>
  );
}
