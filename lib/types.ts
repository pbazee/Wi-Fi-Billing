export type Role = "super_admin" | "tenant_admin";

export type Tenant = {
  id: string;
  name: string;
  location: string;
  status: "active" | "suspended";
  monthlySubscription: "paid" | "overdue";
  revenue: number;
  activeRouters: number;
};

export type RouterItem = {
  id: string;
  name: string;
  tenantId: string;
  ip: string;
  status: "online" | "offline";
  lastSeen: string;
};

export type PackageItem = {
  id: string;
  name: string;
  durationMin: number;
  priceKsh: number;
  speedMbps: number;
};

export type LoyaltyUser = {
  phone: string;
  points: number;
  tier: "Bronze" | "Silver" | "Gold";
};

export type Redemption = {
  id: string;
  phone: string;
  pointsSpent: number;
  reward: string;
  time: string;
};

export type NetworkUser = {
  id: string;
  phoneOrUsername: string;
  activePackage: string;
  dataUsedMb: number;
  dataRemainingMb: number;
  connectedSince: string;
  deviceMac: string;
  deviceIp: string;
  status: "Active" | "Expired";
};
