"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { networkUsers } from "@/lib/fakeData";

export default function UsersPage() {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return networkUsers;
    return networkUsers.filter((user) => user.phoneOrUsername.toLowerCase().includes(q));
  }, [query]);

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-8">
        <h1 className="text-2xl font-semibold neon-heading">Users</h1>

        <Card>
          <CardHeader>
            <CardTitle>Connected users</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by phone or username"
              className="max-w-md"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session and usage details</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone / Username</TableHead>
                  <TableHead>Active Package</TableHead>
                  <TableHead>Data Used / Remaining</TableHead>
                  <TableHead>Connected Since</TableHead>
                  <TableHead>Device MAC/IP</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.phoneOrUsername}</TableCell>
                    <TableCell>{user.activePackage}</TableCell>
                    <TableCell>{user.dataUsedMb}MB / {user.dataRemainingMb}MB</TableCell>
                    <TableCell>{user.connectedSince}</TableCell>
                    <TableCell>{user.deviceMac} / {user.deviceIp}</TableCell>
                    <TableCell className={user.status === "Active" ? "text-green-300" : "text-red-300"}>
                      {user.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </AppShell>
  );
}
