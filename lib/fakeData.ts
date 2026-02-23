import type { LoyaltyUser, PackageItem, Redemption, RouterItem, Tenant } from "@/lib/types";

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
