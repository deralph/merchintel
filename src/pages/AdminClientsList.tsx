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
import { Plus, Search, Building2 } from "lucide-react";
import { api } from "@/lib/api";

const AdminClientsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: api.getAdminClients,
  });

  const filteredClients = useMemo(() => {
    if (!data?.clients) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return data.clients.filter(
      (client) => client.name.toLowerCase().includes(query) || client.email.toLowerCase().includes(query),
    );
  }, [data, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "trial":
        return "secondary";
      case "paused":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Loading clients" />;
  }

  if (isError || !data) {
    return <ErrorScreen message="Unable to load client list." onRetry={() => refetch()} />;
  }

  const totalTags = data.clients.reduce((sum, client) => sum + client.totalTags, 0);
  const totalMRR = data.clients.reduce((sum, client) => sum + client.mrr, 0);
  const activeClients = data.clients.filter((client) => client.status === "active").length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Clients Management</h1>
              <p className="text-muted-foreground">Manage all platform clients and accounts</p>
            </div>
            <Button className="bg-accent hover:bg-accent-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-primary" />
              <div className="text-sm text-muted-foreground">Total Clients</div>
            </div>
            <div className="text-3xl font-bold text-card-foreground">{data.clients.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Active</div>
            <div className="text-3xl font-bold text-success">{activeClients}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total MRR</div>
            <div className="text-3xl font-bold text-primary">${totalMRR.toLocaleString()}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Tags</div>
            <div className="text-3xl font-bold text-accent">{totalTags.toLocaleString()}</div>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        {/* Clients Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Campaigns</TableHead>
                  <TableHead>Total Tags</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/admin/clients/${client.id}`)}
                  >
                    <TableCell className="font-semibold">{client.name}</TableCell>
                    <TableCell className="text-muted-foreground">{client.email}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(client.status)}>{client.status}</Badge>
                    </TableCell>
                    <TableCell>{client.campaigns}</TableCell>
                    <TableCell className="font-medium">{client.totalTags.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-primary">${client.mrr.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{client.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/clients/${client.id}`);
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

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No clients found matching your search.</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminClientsList;
