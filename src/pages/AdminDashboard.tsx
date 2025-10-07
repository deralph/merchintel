import { Card } from "@/components/ui/card";
import { Users, Tag, BarChart3, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const kpis = [
    { label: "Total Clients", value: "47", icon: Users, color: "text-primary" },
    { label: "Active Tags", value: "125,430", icon: Tag, color: "text-accent" },
    { label: "Daily Scans", value: "3,247", icon: BarChart3, color: "text-success" },
    { label: "MRR", value: "$23,400", icon: DollarSign, color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-card-foreground">Resurge Admin Portal</h1>
          <nav className="flex items-center gap-6">
            <a href="/admin/clients" className="text-muted-foreground hover:text-card-foreground">Clients</a>
            <a href="/admin/campaigns" className="text-muted-foreground hover:text-card-foreground">Campaigns</a>
            <a href="/admin/tags" className="text-muted-foreground hover:text-card-foreground">Tags</a>
            <a href="/admin/revenue" className="text-muted-foreground hover:text-card-foreground">Revenue</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-card-foreground mb-6">Platform Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="p-6">
              <kpi.icon className={`w-8 h-8 ${kpi.color} mb-4`} />
              <div className="text-3xl font-bold text-card-foreground mb-1">{kpi.value}</div>
              <div className="text-sm text-muted-foreground">{kpi.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Client Activity</h3>
            <div className="space-y-3">
              {[
                { client: "Acme Corp", action: "Created campaign", time: "5m ago" },
                { client: "Brand X", action: "Generated 500 tags", time: "1h ago" },
                { client: "Festival Co", action: "Exported analytics", time: "2h ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{item.client}</p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">System Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Response Time</span>
                <span className="text-sm font-medium text-success">124ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database Status</span>
                <span className="text-sm font-medium text-success">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Webhooks</span>
                <span className="text-sm font-medium text-card-foreground">23</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
