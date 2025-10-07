import { Card } from "@/components/ui/card";
import { BarChart3, Users, Clock, Zap } from "lucide-react";

const ClientDashboard = () => {
  const kpis = [
    { label: "Total Scans", value: "12,847", change: "+23%", icon: Zap, color: "text-primary" },
    { label: "Unique Users", value: "8,392", change: "+18%", icon: Users, color: "text-accent" },
    { label: "Active Campaigns", value: "5", change: "+2", icon: BarChart3, color: "text-success" },
    { label: "Avg. Dwell Time", value: "2m 34s", change: "-8%", icon: Clock, color: "text-muted-foreground" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-card-foreground">Resurge Client Portal</h1>
          <div className="flex items-center gap-4">
            <a href="/client/campaigns/create" className="text-primary hover:text-primary-hover font-medium">
              Create Campaign
            </a>
            <button className="text-muted-foreground hover:text-card-foreground">Profile</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-card-foreground mb-6">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                <span className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-success' : 'text-muted-foreground'}`}>
                  {kpi.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-1">{kpi.value}</div>
              <div className="text-sm text-muted-foreground">{kpi.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Campaign scan</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">New</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a 
                href="/client/campaigns/create" 
                className="block p-3 border border-border rounded-md hover:bg-muted transition-colors"
              >
                <p className="font-medium text-card-foreground">Create New Campaign</p>
                <p className="text-xs text-muted-foreground">Set up tracking for new merch</p>
              </a>
              <a 
                href="/client/campaigns" 
                className="block p-3 border border-border rounded-md hover:bg-muted transition-colors"
              >
                <p className="font-medium text-card-foreground">View All Campaigns</p>
                <p className="text-xs text-muted-foreground">Manage your active campaigns</p>
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
