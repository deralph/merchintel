import type {
  AdminCampaignDetailResponse,
  AdminCampaignsResponse,
  AdminClientDetailResponse,
  AdminClientsResponse,
  AdminDashboardResponse,
  AdminRevenueResponse,
  AdminTagsResponse,
  CampaignDetail,
  ClientCampaignsResponse,
  ClientDashboardResponse,
  ClientUsersResponse,
  CreateCampaignPayload,
  ScanEventPayload,
  SessionPayload,
  TagExperienceResponse,
} from "@/types/api";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

type RequestOptions = RequestInit & { skipJson?: boolean };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { skipJson, headers, ...rest } = options;

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    ...rest,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (skipJson) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  getClientDashboard: () => request<ClientDashboardResponse>("/client/dashboard"),
  getClientCampaigns: () => request<ClientCampaignsResponse>("/client/campaigns"),
  getClientCampaignDetail: (campaignId: string) => request<CampaignDetail>(`/client/campaigns/${campaignId}`),
  createClientCampaign: (payload: CreateCampaignPayload) =>
    request<CampaignDetail>("/client/campaigns", { method: "POST", body: JSON.stringify(payload) }),
  getClientUsers: () => request<ClientUsersResponse>("/client/users"),

  getAdminDashboard: () => request<AdminDashboardResponse>("/admin/dashboard"),
  getAdminCampaigns: () => request<AdminCampaignsResponse>("/admin/campaigns"),
  getAdminCampaignDetail: (campaignId: string) => request<AdminCampaignDetailResponse>(`/admin/campaigns/${campaignId}`),
  getAdminClients: () => request<AdminClientsResponse>("/admin/clients"),
  getAdminClientDetail: (clientId: string) => request<AdminClientDetailResponse>(`/admin/clients/${clientId}`),
  getAdminTags: () => request<AdminTagsResponse>("/admin/tags"),
  getAdminRevenue: () => request<AdminRevenueResponse>("/admin/revenue"),

  getTagExperience: (tagUid: string, clientSlug?: string) =>
    request<TagExperienceResponse>(`/tags/${tagUid}${clientSlug ? `?clientSlug=${clientSlug}` : ""}`),

  startSession: (payload: SessionPayload) =>
    request<{ status: string }>("/sessions", { method: "POST", body: JSON.stringify(payload) }),
  heartbeat: (sessionId: string) => request<{ status: string }>(`/sessions/${sessionId}/heartbeat`, { method: "POST" }),
  recordScanEvent: (payload: ScanEventPayload) =>
    request<{ status: string }>("/events/scan", { method: "POST", body: JSON.stringify(payload) }),
};

export type ApiClient = typeof api;
