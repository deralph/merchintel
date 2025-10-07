import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, Mail, DollarSign } from "lucide-react";

const AdminClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  // Mock client data
  const client = {
    id: clientId,
    name: "Acme Corp",
    email: "admin@acme.com",
    status: "active",
    joinDate: "2024-03-15",
    billingContact: "John Doe",
    billingEmail: "billing@acme.com",
    plan: "Professional",
    mrr: 1200,
  };

  const campaigns = [
    { id: "camp-1", name: "Summer Festival 2025", status: "active", tags: 1500, scans: 12847 },
    { id: "camp-2", name: "Spring Launch", status: "active", tags: 800, scans: 5632 },
    { id: "camp-3", name: "Holiday Giveaway", status: "completed", tags: 2000, scans: 23145 },
  ];

  const billingHistory = [
    { date: "2025-01-01", amount: 1200, status: "paid", invoice: "INV-2501" },
    { date: "2024-12-01", amount: 1200, status: "paid", invoice: "INV-2412" },
    { date: "2024-11-01", amount: 1200, status: "paid", invoice: "INV-2411" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/clients")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Clients
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
                <Badge variant={client.status === "active" ? "default" : "secondary"}>
                  {client.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">Client ID: {clientId}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Contact Client
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent-hover">
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Plan</div>
            <div className="text-2xl font-bold text-card-foreground">{client.plan}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">MRR</div>
            <div className="text-2xl font-bold text-primary">${client.mrr}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Campaigns</div>
            <div className="text-2xl font-bold text-accent">{campaigns.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Tags</div>
            <div className="text-2xl font-bold text-success">
              {campaigns.reduce((sum, c) => sum + c.tags, 0).toLocaleString()}
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList>
            <TabsTrigger value="info">Client Info</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Company Name</div>
                  <div className="text-card-foreground font-medium">{client.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Primary Email</div>
                  <div className="text-card-foreground font-medium">{client.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Billing Contact</div>
                  <div className="text-card-foreground font-medium">{client.billingContact}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Billing Email</div>
                  <div className="text-card-foreground font-medium">{client.billingEmail}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Join Date</div>
                  <div className="text-card-foreground font-medium">{client.joinDate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Account Status</div>
                  <Badge variant="default">{client.status}</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Client Campaigns</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Tags</TableHead>
                    <TableHead>Total Scans</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.tags.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">{campaign.scans.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/admin/campaigns/${campaign.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-card-foreground">Billing History</h3>
                <Button variant="outline" size="sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Generate Invoice
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((bill, i) => (
                    <TableRow key={i}>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell className="font-mono text-sm">{bill.invoice}</TableCell>
                      <TableCell className="font-medium">${bill.amount}</TableCell>
                      <TableCell>
                        <Badge variant="default">{bill.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Account Settings</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Reset Client Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Configure API Access
                </Button>
                <Button variant="outline" className="w-full justify-start text-warning">
                  Pause Account
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  Terminate Account
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminClientDetail;
