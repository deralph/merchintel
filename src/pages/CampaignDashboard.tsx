import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, MousePointerClick, Download, Settings, Calendar, MapPin } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CampaignDashboard = () => {
  const [dateRange, setDateRange] = useState("30d");

  // Mock data
  const kpis = [
    { label: "Total Scans", value: "12,847", change: "+23%", icon: MousePointerClick, color: "text-chart-1" },
    { label: "Unique Scanners", value: "8,392", change: "+18%", icon: Users, color: "text-chart-2" },
    { label: "Conversion Rate", value: "64.3%", change: "+5.2%", icon: TrendingUp, color: "text-chart-3" },
    { label: "Avg. Time to Scan", value: "4.2 days", change: "-12%", icon: Calendar, color: "text-chart-4" },
  ];

  const scanTrend = [
    { date: "Jan 1", scans: 320, conversions: 205 },
    { date: "Jan 8", scans: 445, conversions: 289 },
    { date: "Jan 15", scans: 612, conversions: 394 },
    { date: "Jan 22", scans: 738, conversions: 475 },
    { date: "Jan 29", scans: 891, conversions: 573 },
    { date: "Feb 5", scans: 1024, conversions: 658 },
  ];

  const topTags = [
    { tag: "TAG-001", scans: 1247, location: "San Francisco, CA" },
    { tag: "TAG-002", scans: 1089, location: "Austin, TX" },
    { tag: "TAG-003", scans: 967, location: "New York, NY" },
    { tag: "TAG-004", scans: 834, location: "Seattle, WA" },
    { tag: "TAG-005", scans: 721, location: "Denver, CO" },
  ];

  const locationData = [
    { region: "West Coast", value: 4200, color: "hsl(var(--chart-1))" },
    { region: "East Coast", value: 3100, color: "hsl(var(--chart-2))" },
    { region: "Midwest", value: 2400, color: "hsl(var(--chart-3))" },
    { region: "South", value: 1900, color: "hsl(var(--chart-4))" },
    { region: "Other", value: 1247, color: "hsl(var(--chart-5))" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Summer Festival 2025</h1>
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
          {kpis.map((kpi, i) => (
            <Card key={i} className="p-6 border border-border bg-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-${kpi.color}/10 flex items-center justify-center`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <span className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-success' : 'text-warning'}`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-card-foreground">{kpi.value}</p>
            </Card>
          ))}
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
              <LineChart data={scanTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                  dataKey="scans" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  name="Total Scans"
                />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2}
                  name="Conversions"
                />
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
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {locationData.slice(0, 3).map((region, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
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
                {topTags.map((tag, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-card-foreground">{tag.tag}</td>
                    <td className="py-3 px-4 text-sm text-card-foreground font-medium">{tag.scans.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{tag.location}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">View Details</Button>
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
            <strong>Integration Ready:</strong> Configure webhooks to send scan events to your CRM or data warehouse in real-time.{" "}
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
