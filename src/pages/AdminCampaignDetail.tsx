import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, ExternalLink, Search, Filter } from "lucide-react";
import { useState } from "react";

const AdminCampaignDetail = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock campaign data
  const campaign = {
    id: campaignId,
    name: "Summer Festival 2025",
    client: "Acme Corp",
    description: "Annual music festival merchandise tracking campaign with exclusive branded items",
    destinationUrl: "https://acmefestival.com/promo",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    status: "active",
    totalTags: 1500,
    emailConsent: true,
    locationConsent: true,
  };

  // Mock tags data
  const tags = [
    { uid: "TAG-A1B2C3D4", material: "Baseball Cap", description: "Black cap with embroidered logo", sequence: 1, status: "active", claimed: false, scans: 47 },
    { uid: "TAG-E5F6G7H8", material: "T-Shirt", description: "White cotton tee, size L", sequence: 2, status: "active", claimed: true, scans: 23 },
    { uid: "TAG-I9J0K1L2", material: "Tote Bag", description: "Canvas tote with screen print", sequence: 3, status: "active", claimed: true, scans: 89 },
    { uid: "TAG-M3N4O5P6", material: "Water Bottle", description: "Insulated stainless steel", sequence: 4, status: "active", claimed: false, scans: 12 },
    { uid: "TAG-Q7R8S9T0", material: "Hoodie", description: "Gray pullover hoodie, size M", sequence: 5, status: "active", claimed: true, scans: 56 },
    { uid: "TAG-U1V2W3X4", material: "Baseball Cap", description: "Navy cap with patch logo", sequence: 6, status: "active", claimed: false, scans: 8 },
    { uid: "TAG-Y5Z6A7B8", material: "T-Shirt", description: "Black cotton tee, size M", sequence: 7, status: "disabled", claimed: false, scans: 0 },
    { uid: "TAG-C9D0E1F2", material: "Sticker Pack", description: "Set of 10 vinyl stickers", sequence: 8, status: "active", claimed: true, scans: 134 },
  ];

  const filteredTags = tags.filter(tag => 
    tag.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    console.log("Exporting tags to CSV...");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/campaigns")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{campaign.name}</h1>
                <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                  {campaign.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">Client: {campaign.client} • Campaign ID: {campaignId}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export All Tags
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent-hover">
                Generate More Tags
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Tags</div>
            <div className="text-3xl font-bold text-card-foreground">{campaign.totalTags}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Tags</div>
            <div className="text-3xl font-bold text-success">{tags.filter(t => t.status === "active").length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Claimed</div>
            <div className="text-3xl font-bold text-accent">{tags.filter(t => t.claimed).length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Scans</div>
            <div className="text-3xl font-bold text-primary">{tags.reduce((sum, t) => sum + t.scans, 0)}</div>
          </Card>
        </div>

        {/* Campaign Details */}
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Campaign Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Description</div>
              <div className="text-card-foreground">{campaign.description}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Destination URL</div>
              <a href={campaign.destinationUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover flex items-center gap-1">
                {campaign.destinationUrl}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Campaign Duration</div>
              <div className="text-card-foreground">{campaign.startDate} to {campaign.endDate}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Data Collection</div>
              <div className="flex gap-2">
                <Badge variant={campaign.emailConsent ? "default" : "secondary"}>
                  Email: {campaign.emailConsent ? "Enabled" : "Disabled"}
                </Badge>
                <Badge variant={campaign.locationConsent ? "default" : "secondary"}>
                  Location: {campaign.locationConsent ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Tags List */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-card-foreground">Campaign Tags & Materials</h2>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tag UID</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Sequence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Claimed</TableHead>
                  <TableHead className="text-right">Scans</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.map((tag) => (
                  <TableRow key={tag.uid}>
                    <TableCell className="font-mono text-sm">{tag.uid}</TableCell>
                    <TableCell className="font-medium">{tag.material}</TableCell>
                    <TableCell className="text-muted-foreground">{tag.description}</TableCell>
                    <TableCell className="text-muted-foreground">#{tag.sequence}</TableCell>
                    <TableCell>
                      <Badge variant={tag.status === "active" ? "default" : "secondary"}>
                        {tag.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {tag.claimed ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Claimed
                        </Badge>
                      ) : (
                        <Badge variant="outline">Unclaimed</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">{tag.scans}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTags.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tags found matching your search.</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminCampaignDetail;
