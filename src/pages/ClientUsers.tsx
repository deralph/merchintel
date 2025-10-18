import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import { Search, Download, Mail } from "lucide-react";
import { api } from "@/lib/api";

const ClientUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["client-users"],
    queryFn: api.getClientUsers,
  });

  const filteredUsers = useMemo(() => {
    if (!data?.users) {
      return [];
    }

    return data.users.filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [data, searchQuery]);

  const handleExportCSV = () => {
    // Placeholder for actual export implementation
    console.info("Exporting users to CSV...");
  };

  if (isLoading) {
    return <LoadingScreen message="Loading user data" />;
  }

  if (isError || !data) {
    return <ErrorScreen message="Unable to load user analytics." onRetry={() => refetch()} />;
  }

  const totalItems = data.users.reduce((sum, user) => sum + user.items, 0);
  const averageItems = data.users.length ? (totalItems / data.users.length).toFixed(1) : "0.0";
  const totalScans = data.users.reduce((sum, user) => sum + user.totalScans, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Tracking</h1>
              <p className="text-muted-foreground">View top users and their merchandise activity</p>
            </div>
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export Users
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Users</div>
            <div className="text-3xl font-bold text-card-foreground">{data.users.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Avg Items per User</div>
            <div className="text-3xl font-bold text-accent">{averageItems}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Interactions</div>
            <div className="text-3xl font-bold text-primary">{totalScans.toLocaleString()}</div>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-card-foreground">User List</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Email</TableHead>
                  <TableHead>Items Claimed</TableHead>
                  <TableHead>Total Scans</TableHead>
                  <TableHead>Campaigns</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.items} items</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{user.totalScans}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.campaigns.slice(0, 2).map((campaign, i) => (
                          <Badge key={`${user.id}-${campaign}-${i}`} variant="secondary" className="text-xs">
                            {campaign}
                          </Badge>
                        ))}
                        {user.campaigns.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{user.campaigns.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found matching your search.</p>
            </div>
          )}
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-card-foreground">
            <strong>Privacy Note:</strong> Email addresses are hashed for privacy. Users who opted in to communications will receive
            campaign updates via webhook integration.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ClientUsers;
