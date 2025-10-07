import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, CreditCard, Users, Download } from "lucide-react";
import { useState } from "react";

const AdminRevenue = () => {
  const [dateRange, setDateRange] = useState("12m");

  // Mock revenue data
  const monthlyRevenue = [
    { month: "Jan", revenue: 18400, clients: 42 },
    { month: "Feb", revenue: 19200, clients: 43 },
    { month: "Mar", revenue: 20100, clients: 45 },
    { month: "Apr", revenue: 21800, clients: 46 },
    { month: "May", revenue: 22400, clients: 47 },
    { month: "Jun", revenue: 23200, clients: 48 },
    { month: "Jul", revenue: 24100, clients: 49 },
    { month: "Aug", revenue: 25600, clients: 51 },
    { month: "Sep", revenue: 26400, clients: 52 },
    { month: "Oct", revenue: 27800, clients: 54 },
    { month: "Nov", revenue: 28900, clients: 55 },
    { month: "Dec", revenue: 30200, clients: 57 },
  ];

  const revenueByPlan = [
    { plan: "Starter", revenue: 4800, clients: 24 },
    { plan: "Professional", revenue: 16800, clients: 21 },
    { plan: "Enterprise", revenue: 8600, clients: 12 },
  ];

  const recentInvoices = [
    { client: "Acme Corp", amount: 1200, date: "2025-01-15", status: "paid" },
    { client: "Brand X Inc", amount: 800, date: "2025-01-14", status: "paid" },
    { client: "Festival Co", amount: 2400, date: "2025-01-13", status: "paid" },
    { client: "TechCon", amount: 600, date: "2025-01-12", status: "pending" },
    { client: "Global Events", amount: 3600, date: "2025-01-11", status: "paid" },
  ];

  const currentMRR = 30200;
  const previousMRR = 28900;
  const mrrGrowth = ((currentMRR - previousMRR) / previousMRR * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Revenue Dashboard</h1>
              <p className="text-muted-foreground">Track platform revenue and billing</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">Last 3 months</SelectItem>
                  <SelectItem value="6m">Last 6 months</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-success">+{mrrGrowth}%</span>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Current MRR</div>
            <div className="text-3xl font-bold text-card-foreground">${currentMRR.toLocaleString()}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Annual Run Rate</div>
            <div className="text-3xl font-bold text-card-foreground">${(currentMRR * 12).toLocaleString()}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Paying Clients</div>
            <div className="text-3xl font-bold text-card-foreground">57</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">ARPU</div>
            <div className="text-3xl font-bold text-card-foreground">${Math.round(currentMRR / 57)}</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2 p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-6">Monthly Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Revenue by Plan */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-6">Revenue by Plan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByPlan} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="plan" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Recent Invoices</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.map((invoice, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{invoice.client}</TableCell>
                    <TableCell className="font-semibold text-primary">${invoice.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        invoice.status === 'paid' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminRevenue;
