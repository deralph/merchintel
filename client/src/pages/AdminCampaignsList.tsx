import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import { Search, Filter } from "lucide-react";
import { api } from "@/lib/api";

const AdminCampaignsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-campaigns"],
    queryFn: api.getAdminCampaigns,
  });

  const filteredCampaigns = useMemo(() => {
    if (!data?.campaigns) {
      return [];
    }

    return data.campaigns.filter((campaign) => {
      const query = searchQuery.toLowerCase();
      return campaign.name.toLowerCase().includes(query) || campaign.client.toLowerCase().includes(query);
    });
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
              <h1 className="text-2xl font-bold text-foreground">All Campaigns</h1>
              <p className="text-muted-foreground">Global view of all platform campaigns</p>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
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
              placeholder="Search campaigns or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        {/* Campaigns Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Tags</TableHead>
                  <TableHead>Total Scans</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow
                    key={campaign.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/admin/campaigns/${campaign.id}`)}
                  >
                    <TableCell className="font-semibold">{campaign.name}</TableCell>
                    <TableCell className="text-muted-foreground">{campaign.client}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                    </TableCell>
                    <TableCell>{campaign.totalTags.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">{campaign.totalScans.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{campaign.created}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/campaigns/${campaign.id}`);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No campaigns found matching your search.</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminCampaignsList;
