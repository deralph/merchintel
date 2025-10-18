import type { IconName } from "@/lib/icon-map";
import type { Tone } from "@/lib/style-maps";

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  icon: IconName;
  tone: Tone;
}

export interface ClientActivityItem {
  id: string;
  event: string;
  timestamp: string;
  status: string;
}

export interface QuickAction {
  label: string;
  description: string;
  href: string;
}

export interface ClientDashboardResponse {
  kpis: KpiMetric[];
  recentActivity: ClientActivityItem[];
  quickActions: QuickAction[];
}

export interface CampaignSummary {
  id: string;
  clientId: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  totalScans: number;
  uniqueUsers: number;
  totalTags: number;
  activeTags: number;
  created: string;
  description: string;
  destinationUrl: string;
  emailConsent: boolean;
  locationConsent: boolean;
}

export interface CampaignScanTrendPoint {
  date: string;
  scans: number;
  conversions: number;
}

export interface CampaignTopTag {
  tag: string;
  scans: number;
  location: string;
}

export interface CampaignLocationDatum {
  region: string;
  value: number;
  tone: Tone;
}

export interface CampaignAnalytics {
  kpis: KpiMetric[];
  scanTrend: CampaignScanTrendPoint[];
  topTags: CampaignTopTag[];
  locationData: CampaignLocationDatum[];
}

export interface CampaignDetail extends CampaignSummary {
  analytics: CampaignAnalytics;
}

export interface ClientCampaignsResponse {
  campaigns: CampaignSummary[];
}

export interface ClientUsersResponse {
  users: Array<{
    id: string;
    email: string;
    items: number;
    lastActive: string;
    totalScans: number;
    campaigns: string[];
  }>;
}

export interface AdminDashboardResponse {
  kpis: KpiMetric[];
  recentActivity: Array<{
    client: string;
    action: string;
    time: string;
  }>;
  systemHealth: Array<{
    label: string;
    value: string;
    tone: Tone;
  }>;
}

export interface AdminCampaignsResponse {
  campaigns: Array<CampaignSummary & { client: string }>;
}

export interface TagDetail {
  uid: string;
  clientId: string;
  campaignId: string;
  material: string;
  description: string;
  sequence: number;
  status: string;
  claimed: boolean;
  scans: number;
  lastScan: string;
}

export interface AdminCampaignDetailResponse {
  campaign: CampaignSummary & { client: string };
  tags: Array<TagDetail & {
    experience?: {
      brand: string;
      campaignName: string;
      logo: string;
      material: string;
      description: string;
      redirectUrl: string;
    };
  }>;
}

export interface AdminClientsResponse {
  clients: Array<{
    id: string;
    name: string;
    email: string;
    status: string;
    campaigns: number;
    totalTags: number;
    mrr: number;
    joinDate: string;
  }>;
}

export interface ClientDetail {
  id: string;
  slug: string;
  name: string;
  email: string;
  status: string;
  joinDate: string;
  plan: string;
  mrr: number;
  billingContact: string;
  billingEmail: string;
  billingHistory: Array<{
    date: string;
    amount: number;
    status: string;
    invoice: string;
  }>;
  contact: {
    name: string;
    phone: string;
  };
}

export interface AdminClientDetailResponse {
  client: ClientDetail;
  campaigns: Array<{
    id: string;
    name: string;
    status: string;
    tags: number;
    scans: number;
  }>;
  billingHistory: ClientDetail["billingHistory"];
}

export interface AdminTagsResponse {
  tags: Array<{
    uid: string;
    client: string;
    campaign: string;
    status: string;
    claimed: boolean;
    scans: number;
    lastScan: string;
  }>;
}

export interface AdminRevenueResponse {
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    clients: number;
  }>;
  revenueByPlan: Array<{
    plan: string;
    revenue: number;
    clients: number;
  }>;
  recentInvoices: Array<{
    client: string;
    amount: number;
    date: string;
    status: string;
  }>;
  currentMRR: number;
  previousMRR: number;
  payingClients: number;
}

export interface TagExperienceResponse {
  campaign_name: string;
  brand: string;
  logo: string;
  material: string;
  description: string;
  redirect_url: string;
  is_claimed: boolean;
  claimed_by: string | null;
}

export interface CreateCampaignPayload {
  name: string;
  description: string;
  destinationUrl: string;
  tagQuantity: string;
  startDate: string;
  endDate: string;
  locationConsent: boolean;
  emailConsent: boolean;
}

export interface ScanEventPayload {
  tag_uid: string;
  client_slug?: string;
  email?: string | null;
  location_consent: boolean;
  session_id: string | null;
  timestamp?: string;
  campaign_id?: string;
}

export interface SessionPayload {
  sessionId: string;
  tagUid: string;
  clientSlug?: string;
}
