import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import { BarChart3, TrendingUp, Users, MousePointerClick, Download, Settings, Calendar, MapPin } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { api } from "@/lib/api";
import { getIconByName } from "@/lib/icon-map";
import { toneBackgroundStyle, toneTextClass, toneColorStyle } from "@/lib/style-maps";

const metricIconFallback = {
  "total-scans": MousePointerClick,
  "unique-scanners": Users,
  "conversion-rate": TrendingUp,
  "avg-time": Calendar,
};

const CampaignDashboard = () => {
  const [dateRange, setDateRange] = useState("30d");
  const { campaignId } = useParams<{ campaignId: string }>();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => api.getClientCampaignDetail(campaignId ?? ""),
    enabled: Boolean(campaignId),
  });

  if (!campaignId) {
    return <ErrorScreen message="Campaign ID is missing from the URL." />;
  }

  if (isLoading) {
    return <LoadingScreen message="Loading campaign dashboard" />;
  }

  if (isError || !data) {
    return <ErrorScreen message="Unable to load campaign analytics." onRetry={() => refetch()} />;
  }

  const chartColors = data.analytics.locationData.map((entry) => toneColorStyle(entry.tone).color);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{data.name}</h1>
              <p className="text-muted-foreground">Campaign Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.analytics.kpis.map((kpi, i) => {
            const IconComponent = getIconByName(kpi.icon) ?? metricIconFallback[kpi.id as keyof typeof metricIconFallback];
            const changeClass = kpi.change?.startsWith("-") ? "text-warning" : "text-success";

            return (
              <Card key={kpi.id} className="p-6 border border-border bg-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={toneBackgroundStyle(kpi.tone)}>
                    <IconComponent className={`w-5 h-5 ${toneTextClass[kpi.tone]}`} />
                  </div>
                  <span className={`text-sm font-medium ${changeClass}`}>{kpi.change}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                <p className="text-3xl font-bold text-card-foreground">{kpi.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Scan Trend Chart */}
          <Card className="lg:col-span-2 p-6 border border-border bg-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Scan Trends</h3>
                <p className="text-sm text-muted-foreground">Daily scans and conversions over time</p>
              </div>
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.analytics.scanTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line type="monotone" dataKey="scans" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Total Scans" />
                <Line type="monotone" dataKey="conversions" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Regional Distribution */}
          <Card className="p-6 border border-border bg-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Regional Split</h3>
                <p className="text-sm text-muted-foreground">Scans by region</p>
              </div>
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.analytics.locationData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                  {data.analytics.locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index] ?? "hsl(var(--chart-1))"} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {data.analytics.locationData.slice(0, 3).map((region, i) => (
                <div key={region.region} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors[i] ?? "hsl(var(--chart-1))" }} />
                    <span className="text-card-foreground">{region.region}</span>
                  </div>
                  <span className="text-muted-foreground font-medium">{region.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Tags Table */}
        <Card className="p-6 border border-border bg-card">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Top Performing Tags</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tag ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Scans</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Location</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.analytics.topTags.map((tag) => (
                  <tr key={tag.tag} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-card-foreground">{tag.tag}</td>
                    <td className="py-3 px-4 text-sm text-card-foreground font-medium">{tag.scans.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{tag.location}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Webhook Settings Hint */}
        <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-card-foreground">
            <strong>Integration Ready:</strong> Configure webhooks to send scan events to your CRM or data warehouse in real-time.
            <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-hover">
              Set up webhooks →
            </Button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CampaignDashboard;
