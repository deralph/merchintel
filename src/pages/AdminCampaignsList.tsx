import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

const AdminCampaignsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock campaigns data
  const campaigns = [
    { id: "camp-1", name: "Summer Festival 2025", client: "Acme Corp", status: "active", tags: 1500, scans: 12847, created: "2025-01-01" },
    { id: "camp-2", name: "Spring Launch", client: "Brand X Inc", status: "active", tags: 800, scans: 5632, created: "2024-12-15" },
    { id: "camp-3", name: "Holiday Giveaway", client: "Festival Co", status: "completed", tags: 2000, scans: 23145, created: "2024-11-20" },
    { id: "camp-4", name: "Conference Swag", client: "TechCon", status: "active", tags: 500, scans: 1234, created: "2025-01-10" },
    { id: "camp-5", name: "Beta Rewards", client: "Startup Labs", status: "draft", tags: 300, scans: 0, created: "2025-01-05" },
    { id: "camp-6", name: "Product Launch 2025", client: "Global Events", status: "active", tags: 2500, scans: 18945, created: "2024-10-15" },
  ];

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.client.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="text-3xl font-bold text-card-foreground">{campaigns.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Campaigns</div>
            <div className="text-3xl font-bold text-success">
              {campaigns.filter(c => c.status === "active").length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Tags</div>
            <div className="text-3xl font-bold text-accent">
              {campaigns.reduce((sum, c) => sum + c.tags, 0).toLocaleString()}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Scans</div>
            <div className="text-3xl font-bold text-primary">
              {campaigns.reduce((sum, c) => sum + c.scans, 0).toLocaleString()}
            </div>
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
                      <Badge variant={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.tags.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">{campaign.scans.toLocaleString()}</TableCell>
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
