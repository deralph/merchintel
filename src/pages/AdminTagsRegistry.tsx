import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import { Search, Filter, Download } from "lucide-react";
import { api } from "@/lib/api";

const AdminTagsRegistry = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-tags"],
    queryFn: api.getAdminTags,
  });

  const filteredTags = useMemo(() => {
    if (!data?.tags) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return data.tags.filter((tag) => {
      const matchesSearch =
        tag.uid.toLowerCase().includes(query) ||
        tag.client.toLowerCase().includes(query) ||
        tag.campaign.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || tag.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "disabled":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Loading tag registry" />;
  }

  if (isError || !data) {
    return <ErrorScreen message="Unable to load tag registry." onRetry={() => refetch()} />;
  }

  const totalScans = data.tags.reduce((sum, tag) => sum + tag.scans, 0);
  const activeTags = data.tags.filter((tag) => tag.status === "active").length;
  const claimedTags = data.tags.filter((tag) => tag.claimed).length;

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
            <div className="text-3xl font-bold text-card-foreground">{data.tags.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Tags</div>
            <div className="text-3xl font-bold text-success">{activeTags}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Claimed Tags</div>
            <div className="text-3xl font-bold text-accent">{claimedTags}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Scans</div>
            <div className="text-3xl font-bold text-primary">{totalScans.toLocaleString()}</div>
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
                      <Badge variant={getStatusColor(tag.status)}>{tag.status}</Badge>
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
