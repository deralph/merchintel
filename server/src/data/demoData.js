import { randomUUID } from "node:crypto";

const now = new Date("2025-01-16T12:00:00Z");

const clients = [
  {
    id: "client-1",
    slug: "acme-corp",
    name: "Acme Corp",
    email: "admin@acme.com",
    status: "active",
    joinDate: "2024-03-15",
    plan: "Professional",
    mrr: 1200,
    billingContact: "John Doe",
    billingEmail: "billing@acme.com",
    billingHistory: [
      { date: "2025-01-01", amount: 1200, status: "paid", invoice: "INV-2501" },
      { date: "2024-12-01", amount: 1200, status: "paid", invoice: "INV-2412" },
      { date: "2024-11-01", amount: 1200, status: "paid", invoice: "INV-2411" },
    ],
    contact: {
      name: "Avery Lee",
      phone: "+1 (415) 555-0101",
    },
  },
  {
    id: "client-2",
    slug: "brand-x-inc",
    name: "Brand X Inc",
    email: "contact@brandx.com",
    status: "active",
    joinDate: "2024-06-20",
    plan: "Starter",
    mrr: 800,
    billingContact: "Maria Stone",
    billingEmail: "finance@brandx.com",
    billingHistory: [
      { date: "2025-01-01", amount: 800, status: "paid", invoice: "INV-2502" },
      { date: "2024-12-01", amount: 800, status: "paid", invoice: "INV-2413" },
    ],
    contact: {
      name: "Maria Stone",
      phone: "+1 (917) 555-0199",
    },
  },
  {
    id: "client-3",
    slug: "festival-co",
    name: "Festival Co",
    email: "info@festivalco.com",
    status: "active",
    joinDate: "2024-01-10",
    plan: "Enterprise",
    mrr: 2400,
    billingContact: "Noah Patel",
    billingEmail: "billing@festivalco.com",
    billingHistory: [
      { date: "2025-01-01", amount: 2400, status: "paid", invoice: "INV-2503" },
      { date: "2024-12-01", amount: 2400, status: "paid", invoice: "INV-2414" },
    ],
    contact: {
      name: "Noah Patel",
      phone: "+1 (303) 555-0120",
    },
  },
  {
    id: "client-4",
    slug: "startup-labs",
    name: "Startup Labs",
    email: "hello@startuplabs.io",
    status: "trial",
    joinDate: "2025-01-05",
    plan: "Trial",
    mrr: 0,
    billingContact: "Jules Carter",
    billingEmail: "billing@startuplabs.io",
    billingHistory: [
      { date: "2025-01-05", amount: 0, status: "trial", invoice: "INV-TRIAL-01" },
    ],
    contact: {
      name: "Jules Carter",
      phone: "+1 (206) 555-0113",
    },
  },
  {
    id: "client-5",
    slug: "global-events",
    name: "Global Events",
    email: "admin@globalevents.com",
    status: "active",
    joinDate: "2023-11-22",
    plan: "Enterprise",
    mrr: 3600,
    billingContact: "Riley Summers",
    billingEmail: "finance@globalevents.com",
    billingHistory: [
      { date: "2025-01-01", amount: 3600, status: "paid", invoice: "INV-2504" },
      { date: "2024-12-01", amount: 3600, status: "paid", invoice: "INV-2415" },
    ],
    contact: {
      name: "Riley Summers",
      phone: "+1 (702) 555-0137",
    },
  },
  {
    id: "client-6",
    slug: "techcon",
    name: "TechCon",
    email: "team@techcon.com",
    status: "paused",
    joinDate: "2024-09-14",
    plan: "Professional",
    mrr: 0,
    billingContact: "Chris Howard",
    billingEmail: "billing@techcon.com",
    billingHistory: [
      { date: "2024-12-01", amount: 600, status: "refunded", invoice: "INV-2416" },
    ],
    contact: {
      name: "Chris Howard",
      phone: "+1 (512) 555-0165",
    },
  },
];

const campaignAnalytics = {
  "camp-1": {
    kpis: [
      { id: "total-scans", label: "Total Scans", value: "12,847", change: "+23%", icon: "MousePointerClick", tone: "chart-1" },
      { id: "unique-scanners", label: "Unique Scanners", value: "8,392", change: "+18%", icon: "Users", tone: "chart-2" },
      { id: "conversion-rate", label: "Conversion Rate", value: "64.3%", change: "+5.2%", icon: "TrendingUp", tone: "chart-3" },
      { id: "avg-time", label: "Avg. Time to Scan", value: "4.2 days", change: "-12%", icon: "Calendar", tone: "chart-4" },
    ],
    scanTrend: [
      { date: "Jan 1", scans: 320, conversions: 205 },
      { date: "Jan 8", scans: 445, conversions: 289 },
      { date: "Jan 15", scans: 612, conversions: 394 },
      { date: "Jan 22", scans: 738, conversions: 475 },
      { date: "Jan 29", scans: 891, conversions: 573 },
      { date: "Feb 5", scans: 1024, conversions: 658 },
    ],
    topTags: [
      { tag: "TAG-A1B2C3D4", scans: 1247, location: "San Francisco, CA" },
      { tag: "TAG-E5F6G7H8", scans: 1089, location: "Austin, TX" },
      { tag: "TAG-I9J0K1L2", scans: 967, location: "New York, NY" },
      { tag: "TAG-M3N4O5P6", scans: 834, location: "Seattle, WA" },
      { tag: "TAG-Q7R8S9T0", scans: 721, location: "Denver, CO" },
    ],
    locationData: [
      { region: "West Coast", value: 4200, tone: "chart-1" },
      { region: "East Coast", value: 3100, tone: "chart-2" },
      { region: "Midwest", value: 2400, tone: "chart-3" },
      { region: "South", value: 1900, tone: "chart-4" },
      { region: "Other", value: 1247, tone: "chart-5" },
    ],
  },
  "camp-2": {
    kpis: [
      { id: "total-scans", label: "Total Scans", value: "5,632", change: "+12%", icon: "MousePointerClick", tone: "chart-1" },
      { id: "unique-scanners", label: "Unique Scanners", value: "3,421", change: "+9%", icon: "Users", tone: "chart-2" },
      { id: "conversion-rate", label: "Conversion Rate", value: "52.1%", change: "+3.1%", icon: "TrendingUp", tone: "chart-3" },
      { id: "avg-time", label: "Avg. Time to Scan", value: "3.6 days", change: "-6%", icon: "Calendar", tone: "chart-4" },
    ],
    scanTrend: [
      { date: "Jan 1", scans: 220, conversions: 135 },
      { date: "Jan 8", scans: 310, conversions: 189 },
      { date: "Jan 15", scans: 402, conversions: 254 },
      { date: "Jan 22", scans: 455, conversions: 276 },
      { date: "Jan 29", scans: 512, conversions: 308 },
      { date: "Feb 5", scans: 588, conversions: 356 },
    ],
    topTags: [
      { tag: "TAG-U1V2W3X4", scans: 612, location: "Chicago, IL" },
      { tag: "TAG-Y5Z6A7B8", scans: 498, location: "Los Angeles, CA" },
      { tag: "TAG-C9D0E1F2", scans: 412, location: "Miami, FL" },
      { tag: "TAG-G1H2I3J4", scans: 367, location: "Boston, MA" },
      { tag: "TAG-K5L6M7N8", scans: 305, location: "Denver, CO" },
    ],
    locationData: [
      { region: "West Coast", value: 1800, tone: "chart-1" },
      { region: "East Coast", value: 1500, tone: "chart-2" },
      { region: "Midwest", value: 900, tone: "chart-3" },
      { region: "South", value: 700, tone: "chart-4" },
      { region: "Other", value: 732, tone: "chart-5" },
    ],
  },
};

const campaigns = [
  {
    id: "camp-1",
    clientId: "client-1",
    name: "Summer Festival 2025",
    status: "active",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    totalScans: 12847,
    uniqueUsers: 8392,
    totalTags: 1500,
    activeTags: 1320,
    created: "2024-12-15",
    description: "Limited-edition drop with NFC tags that unlock exclusive artist content.",
    destinationUrl: "https://festival.acme.com",
    emailConsent: true,
    locationConsent: true,
  },
  {
    id: "camp-2",
    clientId: "client-2",
    name: "Brand X Capsule",
    status: "active",
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    totalScans: 5632,
    uniqueUsers: 3421,
    totalTags: 950,
    activeTags: 910,
    created: "2024-11-04",
    description: "Collaborative capsule with NFC-enabled loyalty experiences.",
    destinationUrl: "https://brandx.com/capsule",
    emailConsent: true,
    locationConsent: false,
  },
  {
    id: "camp-3",
    clientId: "client-3",
    name: "Festival Co VIP",
    status: "paused",
    startDate: "2024-05-01",
    endDate: "2024-09-30",
    totalScans: 9821,
    uniqueUsers: 6023,
    totalTags: 2000,
    activeTags: 0,
    created: "2024-02-18",
    description: "VIP access passes with location-based perks and rescan rewards.",
    destinationUrl: "https://festivalco.com/vip",
    emailConsent: true,
    locationConsent: true,
  },
];

const users = [
  { id: "user-1", email: "collectors@acme.com", items: 23, lastActive: "2025-01-15", totalScans: 481, campaigns: ["camp-1"] },
  { id: "user-2", email: "vip@brandx.com", items: 12, lastActive: "2025-01-14", totalScans: 298, campaigns: ["camp-2"] },
  { id: "user-3", email: "street@festivalco.com", items: 31, lastActive: "2025-01-12", totalScans: 726, campaigns: ["camp-3"] },
  { id: "user-4", email: "drops@acme.com", items: 18, lastActive: "2025-01-11", totalScans: 412, campaigns: ["camp-1"] },
];

const tags = [
  {
    uid: "TAG-A1B2C3D4",
    clientId: "client-1",
    campaignId: "camp-1",
    material: "Organic Cotton",
    description: "Limited hoodie",
    sequence: 1,
    status: "active",
    claimed: true,
    scans: 1247,
    lastScan: "2025-01-14",
    experience: {
      brand: "Merchly",
      campaignName: "Summer Festival 2025",
      logo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=128&q=80",
      material: "Organic Cotton",
      description: "Tap to unlock behind-the-scenes sets and exclusive drops.",
      redirectUrl: "https://festival.acme.com/limited-hoodie",
    },
  },
  {
    uid: "TAG-E5F6G7H8",
    clientId: "client-2",
    campaignId: "camp-2",
    material: "Recycled Nylon",
    description: "Capsule jacket",
    sequence: 2,
    status: "active",
    claimed: false,
    scans: 890,
    lastScan: "2025-01-12",
    experience: {
      brand: "Merchly",
      campaignName: "Brand X Capsule",
      logo: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=128&q=80",
      material: "Recycled Nylon",
      description: "Tap to claim early access to the next drop.",
      redirectUrl: "https://brandx.com/capsule/jacket",
    },
  },
  {
    uid: "TAG-I9J0K1L2",
    clientId: "client-3",
    campaignId: "camp-3",
    material: "Performance Mesh",
    description: "VIP wristband",
    sequence: 3,
    status: "archived",
    claimed: true,
    scans: 1765,
    lastScan: "2024-09-10",
    experience: {
      brand: "Merchly",
      campaignName: "Festival Co VIP",
      logo: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=128&q=80",
      material: "Performance Mesh",
      description: "Tap to relive the headliner encore.",
      redirectUrl: "https://festivalco.com/vip",
    },
  },
];

const revenue = {
  monthlyRevenue: [
    { month: "Aug", revenue: 18400, clients: 42 },
    { month: "Sep", revenue: 20500, clients: 47 },
    { month: "Oct", revenue: 23750, clients: 50 },
    { month: "Nov", revenue: 28900, clients: 55 },
    { month: "Dec", revenue: 30200, clients: 57 },
    { month: "Jan", revenue: 31600, clients: 58 },
  ],
  revenueByPlan: [
    { plan: "Starter", revenue: 4800, clients: 24 },
    { plan: "Professional", revenue: 16800, clients: 21 },
    { plan: "Enterprise", revenue: 8600, clients: 12 },
  ],
  recentInvoices: [
    { client: "Acme Corp", amount: 1200, date: "2025-01-15", status: "paid" },
    { client: "Brand X Inc", amount: 800, date: "2025-01-14", status: "paid" },
    { client: "Festival Co", amount: 2400, date: "2025-01-13", status: "paid" },
    { client: "TechCon", amount: 600, date: "2025-01-12", status: "pending" },
    { client: "Global Events", amount: 3600, date: "2025-01-11", status: "paid" },
  ],
};

const formatNumber = (value) => value.toLocaleString();

const getClientCampaigns = (clientId) => campaigns.filter((campaign) => campaign.clientId === clientId);

export const getClientDashboard = (clientId) => {
  const clientCampaigns = getClientCampaigns(clientId);
  const totalScans = clientCampaigns.reduce((sum, c) => sum + c.totalScans, 0);
  const uniqueUsers = clientCampaigns.reduce((sum, c) => sum + c.uniqueUsers, 0);
  const activeCampaigns = clientCampaigns.filter((c) => c.status === "active").length;
  const avgDwell = "2m 34s";

  const recentActivity = tags
    .filter((tag) => tag.clientId === clientId)
    .sort((a, b) => (b.lastScan || "").localeCompare(a.lastScan || ""))
    .slice(0, 5)
    .map((tag) => ({
      id: tag.uid,
      event: `${tag.material} scanned`,
      timestamp: tag.lastScan === "-" ? "No scans yet" : tag.lastScan,
      status: tag.claimed ? "claimed" : "new",
    }));

  return {
    kpis: [
      { id: "total-scans", label: "Total Scans", value: formatNumber(totalScans), change: "+23%", icon: "Zap", tone: "primary" },
      { id: "unique-users", label: "Unique Users", value: formatNumber(uniqueUsers), change: "+18%", icon: "Users", tone: "accent" },
      { id: "active-campaigns", label: "Active Campaigns", value: String(activeCampaigns), change: "+2", icon: "BarChart3", tone: "success" },
      { id: "avg-dwell", label: "Avg. Dwell Time", value: avgDwell, change: "-8%", icon: "Clock", tone: "muted" },
    ],
    recentActivity,
    quickActions: [
      { label: "Create New Campaign", description: "Set up tracking for new merch", href: "/client/campaigns/create" },
      { label: "View All Campaigns", description: "Manage your active campaigns", href: "/client/campaigns" },
    ],
  };
};

export const getClientCampaignsResponse = (clientId) => ({ campaigns: getClientCampaigns(clientId) });

export const getClientCampaignDetail = (clientId, campaignId) => {
  const campaign = campaigns.find((c) => c.id === campaignId && c.clientId === clientId);
  if (!campaign) {
    return null;
  }
  const analytics = campaignAnalytics[campaignId] ?? {
    kpis: [],
    scanTrend: [],
    topTags: [],
    locationData: [],
  };

  return {
    ...campaign,
    analytics,
  };
};

export const createClientCampaign = (clientId, payload) => {
  const id = randomUUID();
  const campaign = {
    id,
    clientId,
    name: payload.name,
    status: "draft",
    startDate: payload.startDate,
    endDate: payload.endDate,
    totalScans: 0,
    uniqueUsers: 0,
    totalTags: Number(payload.tagQuantity ?? 0),
    activeTags: 0,
    created: now.toISOString().slice(0, 10),
    description: payload.description,
    destinationUrl: payload.destinationUrl,
    emailConsent: payload.emailConsent,
    locationConsent: payload.locationConsent,
  };
  campaigns.push(campaign);
  return {
    ...campaign,
    analytics: {
      kpis: [],
      scanTrend: [],
      topTags: [],
      locationData: [],
    },
  };
};

export const getClientUsers = (clientId) => {
  if (!clientId) {
    return { users };
  }

  const campaignIds = new Set(campaigns.filter((campaign) => campaign.clientId === clientId).map((campaign) => campaign.id));
  return {
    users: users.filter((user) => user.campaigns.some((campaignId) => campaignIds.has(campaignId))),
  };
};

export const getAdminDashboard = () => ({
  kpis: [
    { id: "total-scans", label: "Total Scans", value: "28,300", change: "+19%", icon: "MousePointerClick", tone: "chart-1" },
    { id: "active-campaigns", label: "Active Campaigns", value: "42", change: "+3", icon: "Flag", tone: "chart-2" },
    { id: "avg-rescans", label: "Avg. Rescans", value: "2.6x", change: "+0.4x", icon: "Repeat", tone: "chart-3" },
    { id: "atlas-latency", label: "Atlas latency", value: "53ms", change: "-7ms", icon: "Activity", tone: "chart-4" },
  ],
  recentActivity: [
    { client: "Acme Corp", action: "launched summer drop", time: "2h ago" },
    { client: "Brand X Inc", action: "added VIP reward", time: "4h ago" },
    { client: "Festival Co", action: "synced Atlas events", time: "6h ago" },
  ],
  systemHealth: [
    { label: "Data API", value: "Operational", tone: "success" },
    { label: "Atlas cluster", value: "Healthy", tone: "success" },
    { label: "Webhook queue", value: "4 pending", tone: "warning" },
  ],
});

export const getAdminCampaigns = () => ({
  campaigns: campaigns.map((campaign) => ({
    ...campaign,
    client: clients.find((client) => client.id === campaign.clientId)?.name ?? "Unknown",
  })),
});

export const getAdminCampaignDetail = (campaignId) => {
  const campaign = campaigns.find((c) => c.id === campaignId);
  if (!campaign) {
    return null;
  }

  return {
    campaign: {
      ...campaign,
      client: clients.find((client) => client.id === campaign.clientId)?.name ?? "Unknown",
    },
    tags: tags.filter((tag) => tag.campaignId === campaignId),
  };
};

export const getAdminClients = () => ({
  clients: clients.map((client) => {
    const clientCampaigns = campaigns.filter((campaign) => campaign.clientId === client.id);
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      status: client.status,
      campaigns: clientCampaigns.length,
      totalTags: clientCampaigns.reduce((sum, campaign) => sum + campaign.totalTags, 0),
      mrr: client.mrr,
      joinDate: client.joinDate,
    };
  }),
});

export const getAdminClientDetail = (clientId) => {
  const client = clients.find((c) => c.id === clientId);
  if (!client) {
    return null;
  }

  const clientCampaigns = campaigns.filter((campaign) => campaign.clientId === clientId).map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    status: campaign.status,
    tags: campaign.totalTags,
    scans: campaign.totalScans,
  }));

  return {
    client,
    campaigns: clientCampaigns,
    billingHistory: client.billingHistory,
  };
};

export const getAdminTags = () => ({
  tags: tags.map((tag) => ({
    uid: tag.uid,
    client: clients.find((client) => client.id === tag.clientId)?.name ?? "Unknown",
    campaign: campaigns.find((campaign) => campaign.id === tag.campaignId)?.name ?? "Unknown",
    status: tag.status,
    claimed: tag.claimed,
    scans: tag.scans,
    lastScan: tag.lastScan,
  })),
});

export const getAdminRevenue = () => {
  const currentMRR = revenue.monthlyRevenue[revenue.monthlyRevenue.length - 1]?.revenue ?? 0;
  const previousMRR = revenue.monthlyRevenue[revenue.monthlyRevenue.length - 2]?.revenue ?? currentMRR;
  const payingClients = revenue.monthlyRevenue[revenue.monthlyRevenue.length - 1]?.clients ?? clients.length;

  return {
    ...revenue,
    currentMRR,
    previousMRR,
    payingClients,
  };
};

export const tagDataset = tags;
export const clientsDataset = clients;
export const campaignsDataset = campaigns;
export const usersDataset = users;
export const revenueDataset = revenue;
export const defaultClientId = clients[0]?.id ?? "client-1";
