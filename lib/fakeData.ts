import type { LoyaltyUser, NetworkUser, PackageItem, Redemption, RouterItem, Tenant } from "@/lib/types";

export const demoUsers = {
  super_admin: {
    email: "super_admin@admin.com",
    password: "admin123",
    role: "super_admin" as const,
    name: "Peter Mwangi",
  },
  tenant_admin: {
    email: "mall@tworivers.com",
    password: "tenant123",
    role: "tenant_admin" as const,
    name: "Two Rivers Admin",
    tenantId: "t1",
  },
};

export const tenants: Tenant[] = [
  { id: "t1", name: "Two Rivers Mall", location: "Nairobi", status: "active", monthlySubscription: "paid", revenue: 412000, activeRouters: 6 },
  { id: "t2", name: "Sarit Centre", location: "Westlands", status: "active", monthlySubscription: "paid", revenue: 350400, activeRouters: 5 },
  { id: "t3", name: "Village Market", location: "Gigiri", status: "active", monthlySubscription: "paid", revenue: 298200, activeRouters: 4 },
  { id: "t4", name: "Gikomba Market", location: "Nairobi CBD", status: "suspended", monthlySubscription: "overdue", revenue: 194700, activeRouters: 3 },
  { id: "t5", name: "Nyali Centre", location: "Mombasa", status: "active", monthlySubscription: "paid", revenue: 221900, activeRouters: 2 },
];

export const routers: RouterItem[] = Array.from({ length: 20 }).map((_, i) => {
  const tenant = tenants[i % tenants.length];
  const online = i % 4 !== 0;
  return {
    id: `r${i + 1}`,
    name: `${tenant.name.split(" ")[0]}-RTR-${String(i + 1).padStart(2, "0")}`,
    tenantId: tenant.id,
    ip: `10.${(i % 5) + 1}.${Math.floor(i / 5) + 10}.${(i + 12) % 254}`,
    status: online ? "online" : "offline",
    lastSeen: online ? "Just now" : `${(i % 8) + 3} mins ago`,
  };
});

export const packages: PackageItem[] = [
  { id: "p1", name: "Quick Browse", durationMin: 30, priceKsh: 20, speedMbps: 5 },
  { id: "p2", name: "Power Hour", durationMin: 60, priceKsh: 40, speedMbps: 10 },
  { id: "p3", name: "Half Day Plus", durationMin: 360, priceKsh: 120, speedMbps: 15 },
  { id: "p4", name: "All Day Max", durationMin: 1440, priceKsh: 250, speedMbps: 20 },
];

export const tenantSessionsSeries = [
  { time: "08:00", sessions: 55 },
  { time: "10:00", sessions: 88 },
  { time: "12:00", sessions: 132 },
  { time: "14:00", sessions: 175 },
  { time: "16:00", sessions: 160 },
  { time: "18:00", sessions: 120 },
  { time: "20:00", sessions: 90 },
];

export const topEarningLocations = [
  { name: "Two Rivers Mall", revenue: 412000 },
  { name: "Sarit Centre", revenue: 350400 },
  { name: "Village Market", revenue: 298200 },
  { name: "Nyali Centre", revenue: 221900 },
];

export const loyaltyUsers: LoyaltyUser[] = [
  { phone: "254712000111", points: 980, tier: "Gold" },
  { phone: "254733222333", points: 820, tier: "Gold" },
  { phone: "254701654321", points: 510, tier: "Silver" },
  { phone: "254799123456", points: 320, tier: "Silver" },
  { phone: "254722987654", points: 180, tier: "Bronze" },
  { phone: "254745000999", points: 140, tier: "Bronze" },
];

export const redemptionLog: Redemption[] = [
  { id: "red1", phone: "254712000111", pointsSpent: 200, reward: "2-Hour Pass", time: "Today, 10:24" },
  { id: "red2", phone: "254701654321", pointsSpent: 120, reward: "1-Hour Pass", time: "Today, 09:11" },
  { id: "red3", phone: "254733222333", pointsSpent: 250, reward: "Premium Speed Boost", time: "Yesterday, 18:02" },
];

export function tierBreakdown() {
  const bronze = loyaltyUsers.filter((x) => x.tier === "Bronze").length;
  const silver = loyaltyUsers.filter((x) => x.tier === "Silver").length;
  const gold = loyaltyUsers.filter((x) => x.tier === "Gold").length;
  const total = loyaltyUsers.length || 1;
  return {
    Bronze: Math.round((bronze / total) * 100),
    Silver: Math.round((silver / total) * 100),
    Gold: Math.round((gold / total) * 100),
  };
}

export const networkUsers: NetworkUser[] = [
  { id: "u1", phoneOrUsername: "254712100001", activePackage: "Power Hour", dataUsedMb: 420, dataRemainingMb: 580, connectedSince: "08:12 AM", deviceMac: "A4:5E:60:12:99:01", deviceIp: "10.1.11.24", status: "Active" },
  { id: "u2", phoneOrUsername: "sarah.k", activePackage: "All Day Max", dataUsedMb: 1820, dataRemainingMb: 3180, connectedSince: "07:40 AM", deviceMac: "BC:91:2B:FA:11:02", deviceIp: "10.1.11.31", status: "Active" },
  { id: "u3", phoneOrUsername: "254733200003", activePackage: "Quick Browse", dataUsedMb: 260, dataRemainingMb: 0, connectedSince: "09:05 AM", deviceMac: "10:3D:1C:8F:AA:03", deviceIp: "10.1.12.19", status: "Expired" },
  { id: "u4", phoneOrUsername: "kevin.m", activePackage: "Half Day Plus", dataUsedMb: 940, dataRemainingMb: 1060, connectedSince: "06:58 AM", deviceMac: "F0:9F:C2:45:10:04", deviceIp: "10.1.12.25", status: "Active" },
  { id: "u5", phoneOrUsername: "254701300005", activePackage: "Power Hour", dataUsedMb: 600, dataRemainingMb: 400, connectedSince: "10:11 AM", deviceMac: "CC:5B:76:20:99:05", deviceIp: "10.2.10.14", status: "Active" },
  { id: "u6", phoneOrUsername: "linda.n", activePackage: "Quick Browse", dataUsedMb: 210, dataRemainingMb: 0, connectedSince: "10:33 AM", deviceMac: "44:22:91:09:70:06", deviceIp: "10.2.10.23", status: "Expired" },
  { id: "u7", phoneOrUsername: "254745400007", activePackage: "All Day Max", dataUsedMb: 2240, dataRemainingMb: 2760, connectedSince: "05:51 AM", deviceMac: "08:7A:4C:B1:66:07", deviceIp: "10.2.11.8", status: "Active" },
  { id: "u8", phoneOrUsername: "denis.w", activePackage: "Half Day Plus", dataUsedMb: 1300, dataRemainingMb: 700, connectedSince: "08:49 AM", deviceMac: "2C:E4:12:AB:42:08", deviceIp: "10.2.11.16", status: "Active" },
  { id: "u9", phoneOrUsername: "254799500009", activePackage: "Power Hour", dataUsedMb: 510, dataRemainingMb: 490, connectedSince: "09:57 AM", deviceMac: "50:ED:3C:01:7B:09", deviceIp: "10.3.10.11", status: "Active" },
  { id: "u10", phoneOrUsername: "mina.g", activePackage: "Quick Browse", dataUsedMb: 300, dataRemainingMb: 0, connectedSince: "11:02 AM", deviceMac: "34:AE:99:CD:22:10", deviceIp: "10.3.10.27", status: "Expired" },
];
