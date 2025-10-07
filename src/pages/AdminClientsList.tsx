import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Building2 } from "lucide-react";
import { useState } from "react";

const AdminClientsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock clients data
  const clients = [
    { id: "client-1", name: "Acme Corp", email: "admin@acme.com", status: "active", campaigns: 5, totalTags: 3200, mrr: 1200, joinDate: "2024-03-15" },
    { id: "client-2", name: "Brand X Inc", email: "contact@brandx.com", status: "active", campaigns: 3, totalTags: 1800, mrr: 800, joinDate: "2024-06-20" },
    { id: "client-3", name: "Festival Co", email: "info@festivalco.com", status: "active", campaigns: 8, totalTags: 5400, mrr: 2400, joinDate: "2024-01-10" },
    { id: "client-4", name: "Startup Labs", email: "hello@startuplabs.io", status: "trial", campaigns: 1, totalTags: 300, mrr: 0, joinDate: "2025-01-05" },
    { id: "client-5", name: "Global Events", email: "admin@globalevents.com", status: "active", campaigns: 12, totalTags: 8900, mrr: 3600, joinDate: "2023-11-22" },
    { id: "client-6", name: "TechCon", email: "team@techcon.com", status: "paused", campaigns: 2, totalTags: 600, mrr: 0, joinDate: "2024-09-14" },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "trial": return "secondary";
      case "paused": return "outline";
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
            <div className="text-3xl font-bold text-card-foreground">{clients.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Active</div>
            <div className="text-3xl font-bold text-success">
              {clients.filter(c => c.status === "active").length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total MRR</div>
            <div className="text-3xl font-bold text-primary">
              ${clients.reduce((sum, c) => sum + c.mrr, 0).toLocaleString()}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Tags</div>
            <div className="text-3xl font-bold text-accent">
              {clients.reduce((sum, c) => sum + c.totalTags, 0).toLocaleString()}
            </div>
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
                      <Badge variant={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.campaigns}</TableCell>
                    <TableCell className="font-medium">{client.totalTags.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-primary">
                      ${client.mrr.toLocaleString()}
                    </TableCell>
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
