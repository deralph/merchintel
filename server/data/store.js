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
    activeTags: 1423,
    created: "2025-01-01",
    description: "Annual music festival merchandise tracking campaign with exclusive branded items",
    destinationUrl: "https://acmefestival.com/promo",
    emailConsent: true,
    locationConsent: true,
  },
  {
    id: "camp-2",
    clientId: "client-1",
    name: "Spring Product Launch",
    status: "active",
    startDate: "2025-04-15",
    endDate: "2025-06-30",
    totalScans: 5632,
    uniqueUsers: 3421,
    totalTags: 800,
    activeTags: 756,
    created: "2024-12-15",
    description: "Limited edition merch to support the spring product launch",
    destinationUrl: "https://acme.com/spring-launch",
    emailConsent: true,
    locationConsent: true,
  },
  {
    id: "camp-3",
    clientId: "client-1",
    name: "Holiday Giveaway 2024",
    status: "completed",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    totalScans: 23145,
    uniqueUsers: 15678,
    totalTags: 2000,
    activeTags: 0,
    created: "2024-10-20",
    description: "Holiday season giveaway for loyal customers",
    destinationUrl: "https://acme.com/holiday",
    emailConsent: true,
    locationConsent: false,
  },
  {
    id: "camp-4",
    clientId: "client-1",
    name: "Conference Swag Bag",
    status: "active",
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    totalScans: 1234,
    uniqueUsers: 892,
    totalTags: 500,
    activeTags: 487,
    created: "2025-01-10",
    description: "Swag items for conference attendees",
    destinationUrl: "https://acme.com/conference",
    emailConsent: true,
    locationConsent: true,
  },
  {
    id: "camp-5",
    clientId: "client-1",
    name: "Beta User Rewards",
    status: "draft",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    totalScans: 0,
    uniqueUsers: 0,
    totalTags: 300,
    activeTags: 0,
    created: "2025-01-05",
    description: "Rewards program for beta testers",
    destinationUrl: "https://acme.com/beta",
    emailConsent: true,
    locationConsent: false,
  },
  {
    id: "camp-6",
    clientId: "client-5",
    name: "Product Launch 2025",
    status: "active",
    startDate: "2024-10-15",
    endDate: "2025-03-31",
    totalScans: 18945,
    uniqueUsers: 13210,
    totalTags: 2500,
    activeTags: 2310,
    created: "2024-09-01",
    description: "Global events merch tracking",
    destinationUrl: "https://globalevents.com/launch",
    emailConsent: true,
    locationConsent: true,
  },
];

const tags = [
  {
    uid: "TAG-A1B2C3D4",
    clientId: "client-1",
    campaignId: "camp-1",
    material: "Baseball Cap",
    description: "Black cap with embroidered logo",
    sequence: 1,
    status: "active",
    claimed: false,
    scans: 47,
    lastScan: "2025-01-15",
    experience: {
      brand: "Acme Events",
      campaignName: "Summer Festival 2025",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
      material: "Cap",
      description: "Thanks for checking out our merch! Scan to unlock exclusive content.",
      redirectUrl: "https://acmefestival.com/promo",
    },
  },
  {
    uid: "TAG-E5F6G7H8",
    clientId: "client-1",
    campaignId: "camp-1",
    material: "T-Shirt",
    description: "White cotton tee, size L",
    sequence: 2,
    status: "active",
    claimed: true,
    scans: 23,
    lastScan: "2025-01-14",
    experience: {
      brand: "Acme Events",
      campaignName: "Summer Festival 2025",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
      material: "T-Shirt",
      description: "Limited drop tee with exclusive track list.",
      redirectUrl: "https://acmefestival.com/promo",
    },
  },
  {
    uid: "TAG-I9J0K1L2",
    clientId: "client-1",
    campaignId: "camp-1",
    material: "Tote Bag",
    description: "Canvas tote with screen print",
    sequence: 3,
    status: "active",
    claimed: true,
    scans: 89,
    lastScan: "2025-01-16",
    experience: {
      brand: "Acme Events",
      campaignName: "Summer Festival 2025",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
      material: "Tote Bag",
      description: "Collect stamps at every stage to unlock backstage content.",
      redirectUrl: "https://acmefestival.com/promo",
    },
  },
  {
    uid: "TAG-M3N4O5P6",
    clientId: "client-1",
    campaignId: "camp-1",
    material: "Water Bottle",
    description: "Insulated stainless steel",
    sequence: 4,
    status: "active",
    claimed: false,
    scans: 12,
    lastScan: "2025-01-10",
    experience: {
      brand: "Acme Events",
      campaignName: "Summer Festival 2025",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
      material: "Water Bottle",
      description: "Stay hydrated and unlock artist set times.",
      redirectUrl: "https://acmefestival.com/promo",
    },
  },
  {
    uid: "TAG-Q7R8S9T0",
    clientId: "client-1",
    campaignId: "camp-1",
    material: "Hoodie",
    description: "Gray pullover hoodie, size M",
    sequence: 5,
    status: "active",
    claimed: true,
    scans: 56,
    lastScan: "2025-01-13",
    experience: {
      brand: "Acme Events",
      campaignName: "Summer Festival 2025",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
      material: "Hoodie",
      description: "Tap to redeem VIP lounge upgrades.",
      redirectUrl: "https://acmefestival.com/promo",
    },
  },
  {
    uid: "TAG-U1V2W3X4",
    clientId: "client-1",
    campaignId: "camp-2",
    material: "Baseball Cap",
    description: "Navy cap with patch logo",
    sequence: 6,
    status: "active",
    claimed: false,
    scans: 8,
    lastScan: "2025-01-09",
    experience: {
      brand: "Acme Events",
      campaignName: "Spring Product Launch",
      logo: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=200&h=200&fit=crop",
      material: "Cap",
      description: "Access early-bird discounts for the new product drop.",
      redirectUrl: "https://acme.com/spring-launch",
    },
  },
  {
    uid: "TAG-Y5Z6A7B8",
    clientId: "client-1",
    campaignId: "camp-2",
    material: "T-Shirt",
    description: "Black cotton tee, size M",
    sequence: 7,
    status: "disabled",
    claimed: false,
    scans: 0,
    lastScan: "-",
    experience: {
      brand: "Acme Events",
      campaignName: "Spring Product Launch",
      logo: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=200&h=200&fit=crop",
      material: "T-Shirt",
      description: "Scan for exclusive launch-day livestream access.",
      redirectUrl: "https://acme.com/spring-launch",
    },
  },
  {
    uid: "TAG-C9D0E1F2",
    clientId: "client-1",
    campaignId: "camp-2",
    material: "Sticker Pack",
    description: "Set of 10 vinyl stickers",
    sequence: 8,
    status: "active",
    claimed: true,
    scans: 134,
    lastScan: "2025-01-15",
    experience: {
      brand: "Acme Events",
      campaignName: "Spring Product Launch",
      logo: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=200&h=200&fit=crop",
      material: "Sticker Pack",
      description: "Collect the full sticker set to unlock limited merch.",
      redirectUrl: "https://acme.com/spring-launch",
    },
  },
  {
    uid: "TAG-G1H2I3J4",
    clientId: "client-2",
    campaignId: "camp-7",
    material: "Poster",
    description: "Glossy limited edition poster",
    sequence: 1,
    status: "active",
    claimed: true,
    scans: 67,
    lastScan: "2025-01-14",
    experience: {
      brand: "Brand X",
      campaignName: "Spring Launch",
      logo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=200&fit=crop",
      material: "Poster",
      description: "Unlock behind-the-scenes footage from the launch.",
      redirectUrl: "https://brandx.com/spring",
    },
  },
  {
    uid: "TAG-K5L6M7N8",
    clientId: "client-2",
    campaignId: "camp-7",
    material: "Keychain",
    description: "Chrome keychain with logo",
    sequence: 2,
    status: "pending",
    claimed: false,
    scans: 0,
    lastScan: "-",
    experience: {
      brand: "Brand X",
      campaignName: "Spring Launch",
      logo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=200&fit=crop",
      material: "Keychain",
      description: "Use this tag to join the launch waitlist.",
      redirectUrl: "https://brandx.com/spring",
    },
  },
  {
    uid: "TAG-P1Q2R3S4",
    clientId: "client-5",
    campaignId: "camp-6",
    material: "Event Lanyard",
    description: "VIP lanyard with NFC tap",
    sequence: 12,
    status: "active",
    claimed: true,
    scans: 156,
    lastScan: "2025-01-15",
    experience: {
      brand: "Global Events",
      campaignName: "Product Launch 2025",
      logo: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&h=200&fit=crop",
      material: "Lanyard",
      description: "Tap to see the event agenda and meet the speakers.",
      redirectUrl: "https://globalevents.com/launch",
    },
  },
];

const clientUsers = [
  { id: "usr-1", clientId: "client-1", email: "user***@gmail.com", items: 5, lastActive: "2025-01-15", totalScans: 23, campaigns: ["Summer Festival 2025", "Spring Product Launch"] },
  { id: "usr-2", clientId: "client-1", email: "mark***@yahoo.com", items: 3, lastActive: "2025-01-14", totalScans: 12, campaigns: ["Holiday Giveaway 2024"] },
  { id: "usr-3", clientId: "client-1", email: "sarah***@outlook.com", items: 8, lastActive: "2025-01-16", totalScans: 47, campaigns: ["Summer Festival 2025", "Conference Swag Bag", "Spring Product Launch"] },
  { id: "usr-4", clientId: "client-1", email: "john***@gmail.com", items: 2, lastActive: "2025-01-10", totalScans: 8, campaigns: ["Beta User Rewards"] },
  { id: "usr-5", clientId: "client-1", email: "emily***@proton.me", items: 6, lastActive: "2025-01-15", totalScans: 34, campaigns: ["Summer Festival 2025", "Spring Product Launch"] },
  { id: "usr-6", clientId: "client-1", email: "alex***@gmail.com", items: 4, lastActive: "2025-01-13", totalScans: 19, campaigns: ["Conference Swag Bag"] },
  { id: "usr-7", clientId: "client-1", email: "chris***@icloud.com", items: 1, lastActive: "2025-01-12", totalScans: 3, campaigns: ["Holiday Giveaway 2024"] },
];

const revenue = {
  monthlyRevenue: [
    { month: "Jan", revenue: 18400, clients: 42 },
    { month: "Feb", revenue: 19200, clients: 43 },
    { month: "Mar", revenue: 20100, clients: 45 },
    { month: "Apr", revenue: 21800, clients: 46 },
    { month: "May", revenue: 22400, clients: 47 },
    { month: "Jun", revenue: 23200, clients: 48 },
    { month: "Jul", revenue: 24100, clients: 49 },
    { month: "Aug", revenue: 25600, clients: 51 },
    { month: "Sep", revenue: 26400, clients: 52 },
    { month: "Oct", revenue: 27800, clients: 54 },
    { month: "Nov", revenue: 28900, clients: 55 },
    { month: "Dec", revenue: 30200, clients: 57 },
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

const scanEvents = [];
const activeSessions = new Map();

const getClientCampaigns = (clientId) => campaigns.filter((campaign) => campaign.clientId === clientId);

const formatNumber = (value) => value.toLocaleString();

const getClientDashboard = (clientId) => {
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

const getCampaignAnalytics = (campaignId) => {
  const analytics = campaignAnalytics[campaignId] ?? {
    kpis: [
      { id: "total-scans", label: "Total Scans", value: "0", change: "0%", icon: "MousePointerClick", tone: "chart-1" },
      { id: "unique-scanners", label: "Unique Scanners", value: "0", change: "0%", icon: "Users", tone: "chart-2" },
      { id: "conversion-rate", label: "Conversion Rate", value: "0%", change: "0%", icon: "TrendingUp", tone: "chart-3" },
      { id: "avg-time", label: "Avg. Time to Scan", value: "0 days", change: "0%", icon: "Calendar", tone: "chart-4" },
    ],
    scanTrend: [],
    topTags: [],
    locationData: [],
  };

  const relatedTags = tags.filter((tag) => tag.campaignId === campaignId);

  if (!campaignAnalytics[campaignId]) {
    analytics.topTags = relatedTags
      .sort((a, b) => b.scans - a.scans)
      .slice(0, 5)
      .map((tag) => ({ tag: tag.uid, scans: tag.scans, location: tag.lastScan === "-" ? "-" : "Most recent scan" }));
  }

  return analytics;
};

const getClientCampaignDetail = (clientId, campaignId) => {
  const campaign = campaigns.find((c) => c.id === campaignId && c.clientId === clientId);
  if (!campaign) {
    return null;
  }

  return {
    ...campaign,
    analytics: getCampaignAnalytics(campaignId),
  };
};

const createClientCampaign = (clientId, payload) => {
  const id = `camp-${Date.now()}`;
  const campaign = {
    id,
    clientId,
    name: payload.name,
    status: "draft",
    startDate: payload.startDate,
    endDate: payload.endDate,
    totalScans: 0,
    uniqueUsers: 0,
    totalTags: Number(payload.tagQuantity) || 0,
    activeTags: 0,
    created: now.toISOString().slice(0, 10),
    description: payload.description,
    destinationUrl: payload.destinationUrl,
    emailConsent: Boolean(payload.emailConsent),
    locationConsent: Boolean(payload.locationConsent),
  };

  campaigns.unshift(campaign);
  campaignAnalytics[id] = getCampaignAnalytics(id);

  return campaign;
};

const getClientUsers = (clientId) => clientUsers.filter((user) => user.clientId === clientId);

const getAdminDashboard = () => {
  const totalClients = clients.length;
  const activeTags = tags.filter((tag) => tag.status === "active").length;
  const dailyScans = scanEvents.slice(-25).length + 3247;
  const mrr = revenue.monthlyRevenue[revenue.monthlyRevenue.length - 1]?.revenue ?? 0;

  return {
    kpis: [
      { id: "total-clients", label: "Total Clients", value: String(totalClients), icon: "Users", tone: "primary" },
      { id: "active-tags", label: "Active Tags", value: formatNumber(activeTags), icon: "Tag", tone: "accent" },
      { id: "daily-scans", label: "Daily Scans", value: "3,247", icon: "BarChart3", tone: "success" },
      { id: "mrr", label: "MRR", value: `$${formatNumber(23400)}`, icon: "DollarSign", tone: "primary" },
    ],
    recentActivity: [
      { client: "Acme Corp", action: "Created campaign", time: "5m ago" },
      { client: "Brand X", action: "Generated 500 tags", time: "1h ago" },
      { client: "Festival Co", action: "Exported analytics", time: "2h ago" },
    ],
    systemHealth: [
      { label: "API Response Time", value: "124ms", tone: "success" },
      { label: "Database Status", value: "Healthy", tone: "success" },
      { label: "Active Webhooks", value: "23", tone: "primary" },
    ],
  };
};

const getAdminCampaigns = () => campaigns.map((campaign) => ({
  ...campaign,
  client: clients.find((client) => client.id === campaign.clientId)?.name ?? "Unknown",
}));

const getAdminCampaignDetail = (campaignId) => {
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

const getAdminClients = () => clients.map((client) => {
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
});

const getAdminClientDetail = (clientId) => {
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

const getAdminTags = () => tags.map((tag) => ({
  uid: tag.uid,
  client: clients.find((client) => client.id === tag.clientId)?.name ?? "Unknown",
  campaign: campaigns.find((campaign) => campaign.id === tag.campaignId)?.name ?? "Unknown",
  status: tag.status,
  claimed: tag.claimed,
  scans: tag.scans,
  lastScan: tag.lastScan,
}));

const getAdminRevenue = () => {
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

const getTagExperience = (clientSlug, tagUid) => {
  const client = clientSlug ? clients.find((c) => c.slug === clientSlug) : null;
  const tag = tags.find((t) => t.uid === tagUid && (!clientSlug || t.clientId === client?.id));
  if (!tag) {
    return null;
  }
  const clientName = clients.find((c) => c.id === tag.clientId)?.name ?? "Unknown";

  return {
    campaign_name: campaigns.find((c) => c.id === tag.campaignId)?.name ?? "Campaign",
    brand: clientName,
    logo: tag.experience.logo,
    material: tag.experience.material,
    description: tag.experience.description,
    redirect_url: tag.experience.redirectUrl,
    is_claimed: tag.claimed,
    claimed_by: null,
  };
};

const startSession = ({ sessionId, tagUid, clientSlug }) => {
  activeSessions.set(sessionId, {
    tagUid,
    clientSlug,
    lastHeartbeat: Date.now(),
  });
};

const recordHeartbeat = (sessionId) => {
  const session = activeSessions.get(sessionId);
  if (session) {
    session.lastHeartbeat = Date.now();
    activeSessions.set(sessionId, session);
  }
};

const recordScanEvent = (payload) => {
  scanEvents.push({ ...payload, id: randomUUID(), timestamp: payload.timestamp ?? new Date().toISOString() });

  const tag = tags.find((t) => t.uid === payload.tag_uid);
  if (tag) {
    tag.scans += 1;
    tag.lastScan = new Date().toISOString().slice(0, 10);
    if (!tag.claimed) {
      tag.claimed = true;
    }
  }

  const campaign = campaigns.find((c) => c.id === payload.campaign_id || c.id === tag?.campaignId);
  if (campaign) {
    campaign.totalScans += 1;
    if (payload.email) {
      campaign.uniqueUsers += 1;
    }
  }
};

const store = {
  getClientDashboard,
  getClientCampaigns,
  getClientCampaignDetail,
  createClientCampaign,
  getClientUsers,
  getAdminDashboard,
  getAdminCampaigns,
  getAdminCampaignDetail,
  getAdminClients,
  getAdminClientDetail,
  getAdminTags,
  getAdminRevenue,
  getTagExperience,
  recordScanEvent,
  startSession,
  recordHeartbeat,
};

export default store;
