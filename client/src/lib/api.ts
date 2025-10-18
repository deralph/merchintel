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
  IssueScanLinkResponse,
  ScanSessionResponse,
  CompleteScanPayload,
  TagExperienceResponse,
  LandingContentResponse,
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
    let message = await response.text();
    try {
      const parsed = JSON.parse(message);
      message = parsed.message ?? message;
    } catch (error) {
      // no-op: response was not JSON
    }
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (skipJson) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  getLandingContent: () => request<LandingContentResponse>("/content/landing"),
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

  issueScanLink: (tagUid: string, clientSlug?: string) =>
    request<IssueScanLinkResponse>(`/tags/${tagUid}/scan-link${clientSlug ? `?clientSlug=${clientSlug}` : ""}`),
  consumeScanSession: (token: string) => request<ScanSessionResponse>(`/scan-sessions/${token}`),
  completeScanSession: (token: string, payload: CompleteScanPayload) =>
    request<{ status: string; redirectUrl: string }>(`/scan-sessions/${token}/complete`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export type ApiClient = typeof api;
