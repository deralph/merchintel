import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download } from "lucide-react";
import { useState } from "react";

const AdminTagsRegistry = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock tags data
  const tags = [
    { uid: "TAG-A1B2C3D4", client: "Acme Corp", campaign: "Summer Festival", status: "active", claimed: true, scans: 47, lastScan: "2025-01-15" },
    { uid: "TAG-E5F6G7H8", client: "Brand X Inc", campaign: "Spring Launch", status: "active", claimed: false, scans: 23, lastScan: "2025-01-14" },
    { uid: "TAG-I9J0K1L2", client: "Festival Co", campaign: "Holiday Giveaway", status: "active", claimed: true, scans: 89, lastScan: "2025-01-16" },
    { uid: "TAG-M3N4O5P6", client: "TechCon", campaign: "Conference Swag", status: "disabled", claimed: false, scans: 12, lastScan: "2025-01-10" },
    { uid: "TAG-Q7R8S9T0", client: "Startup Labs", campaign: "Beta Rewards", status: "active", claimed: false, scans: 0, lastScan: "-" },
    { uid: "TAG-U1V2W3X4", client: "Global Events", campaign: "Product Launch", status: "active", claimed: true, scans: 156, lastScan: "2025-01-15" },
    { uid: "TAG-Y5Z6A7B8", client: "Acme Corp", campaign: "Summer Festival", status: "active", claimed: true, scans: 34, lastScan: "2025-01-13" },
    { uid: "TAG-C9D0E1F2", client: "Brand X Inc", campaign: "Spring Launch", status: "pending", claimed: false, scans: 0, lastScan: "-" },
  ];

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tag.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tag.campaign.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tag.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "disabled": return "secondary";
      case "pending": return "outline";
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
              <h1 className="text-2xl font-bold text-foreground">Tags Registry</h1>
              <p className="text-muted-foreground">Global registry of all platform tags</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Registry
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Tags</div>
            <div className="text-3xl font-bold text-card-foreground">{tags.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Tags</div>
            <div className="text-3xl font-bold text-success">
              {tags.filter(t => t.status === "active").length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Claimed Tags</div>
            <div className="text-3xl font-bold text-accent">
              {tags.filter(t => t.claimed).length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Scans</div>
            <div className="text-3xl font-bold text-primary">
              {tags.reduce((sum, t) => sum + t.scans, 0).toLocaleString()}
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by tag UID, client, or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Tags Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tag UID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Claimed</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.map((tag) => (
                  <TableRow key={tag.uid}>
                    <TableCell className="font-mono text-sm">{tag.uid}</TableCell>
                    <TableCell className="font-medium">{tag.client}</TableCell>
                    <TableCell className="text-muted-foreground">{tag.campaign}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(tag.status)}>
                        {tag.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {tag.claimed ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{tag.scans}</TableCell>
                    <TableCell className="text-muted-foreground">{tag.lastScan}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTags.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tags found matching your filters.</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminTagsRegistry;
