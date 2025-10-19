import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import { Plus, Search, Calendar, Tag } from "lucide-react";
import { api } from "@/lib/api";

const ClientCampaignsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["client-campaigns"],
    queryFn: api.getClientCampaigns,
  });

  const filteredCampaigns = useMemo(() => {
    if (!data?.campaigns) {
      return [];
    }

    return data.campaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "completed":
        return "secondary";
      case "draft":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Loading campaigns" />;
  }

  if (isError || !data) {
    return <ErrorScreen message="Unable to load campaigns." onRetry={() => refetch()} />;
  }

  const totalTags = data.campaigns.reduce((sum, campaign) => sum + campaign.totalTags, 0);
  const totalScans = data.campaigns.reduce((sum, campaign) => sum + campaign.totalScans, 0);
  const activeCampaigns = data.campaigns.filter((campaign) => campaign.status === "active").length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Campaigns</h1>
              <p className="text-muted-foreground">Manage and track your merchandise campaigns</p>
            </div>
            <Button onClick={() => navigate("/client/campaigns/create")} className="bg-accent hover:bg-accent-hover">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Campaigns</div>
            <div className="text-3xl font-bold text-card-foreground">{data.campaigns.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Campaigns</div>
            <div className="text-3xl font-bold text-success">{activeCampaigns}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Tags</div>
            <div className="text-3xl font-bold text-accent">{totalTags.toLocaleString()}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Scans</div>
            <div className="text-3xl font-bold text-primary">{totalScans.toLocaleString()}</div>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/client/campaigns/${campaign.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{campaign.name}</h3>
                  <Badge variant={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary">{campaign.totalScans.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Scans</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{campaign.uniqueUsers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Unique Users</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{campaign.startDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>
                    {campaign.activeTags}/{campaign.totalTags} active
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/client/campaigns/${campaign.id}`);
                }}
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No campaigns found.</p>
            <Button onClick={() => navigate("/client/campaigns/create")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Campaign
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ClientCampaignsList;
