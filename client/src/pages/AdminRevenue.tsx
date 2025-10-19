import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, CreditCard, Users, Download } from "lucide-react";
import { api } from "@/lib/api";

const AdminRevenue = () => {
  const [dateRange, setDateRange] = useState("12m");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: api.getAdminRevenue,
  });

  if (isLoading) {
    return <LoadingScreen message="Loading revenue analytics" />;
  }

  if (isError || !data) {
    return <ErrorScreen message="Unable to load revenue data." onRetry={() => refetch()} />;
  }

  const { currentMRR, previousMRR, payingClients, monthlyRevenue, revenueByPlan, recentInvoices } = data;
  const mrrGrowth = previousMRR ? (((currentMRR - previousMRR) / previousMRR) * 100).toFixed(1) : "0.0";
  const arpu = payingClients ? Math.round(currentMRR / payingClients) : 0;

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
            <div className="text-3xl font-bold text-card-foreground">{payingClients}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">ARPU</div>
            <div className="text-3xl font-bold text-card-foreground">${arpu}</div>
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
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue" />
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
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
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
                  <TableRow key={`${invoice.client}-${invoice.date}-${i}`}>
                    <TableCell className="font-medium">{invoice.client}</TableCell>
                    <TableCell className="font-semibold text-primary">${invoice.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          invoice.status === "paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </TableCell>
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
        </Card>
      </main>
    </div>
  );
};

export default AdminRevenue;
