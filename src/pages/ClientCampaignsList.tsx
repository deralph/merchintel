import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, Tag } from "lucide-react";
import { useState } from "react";

const ClientCampaignsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock campaigns data
  const campaigns = [
    {
      id: "camp-1",
      name: "Summer Festival 2025",
      status: "active",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      totalScans: 12847,
      uniqueUsers: 8392,
      totalTags: 1500,
      activeTags: 1423,
    },
    {
      id: "camp-2",
      name: "Spring Product Launch",
      status: "active",
      startDate: "2025-04-15",
      endDate: "2025-06-30",
      totalScans: 5632,
      uniqueUsers: 3421,
      totalTags: 800,
      activeTags: 756,
    },
    {
      id: "camp-3",
      name: "Holiday Giveaway 2024",
      status: "completed",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      totalScans: 23145,
      uniqueUsers: 15678,
      totalTags: 2000,
      activeTags: 0,
    },
    {
      id: "camp-4",
      name: "Conference Swag Bag",
      status: "active",
      startDate: "2025-03-01",
      endDate: "2025-05-31",
      totalScans: 1234,
      uniqueUsers: 892,
      totalTags: 500,
      activeTags: 487,
    },
    {
      id: "camp-5",
      name: "Beta User Rewards",
      status: "draft",
      startDate: "2025-07-01",
      endDate: "2025-09-30",
      totalScans: 0,
      uniqueUsers: 0,
      totalTags: 300,
      activeTags: 0,
    },
  ];

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "completed": return "secondary";
      case "draft": return "outline";
      default: return "secondary";
    }
  };

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
            <Button 
              onClick={() => navigate("/client/campaigns/create")}
              className="bg-accent hover:bg-accent-hover"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {campaign.name}
                  </h3>
                  <Badge variant={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
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
                  <span>{campaign.activeTags}/{campaign.totalTags} active</span>
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
