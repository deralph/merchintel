import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import { api } from "@/lib/api";
import { getIconByName } from "@/lib/icon-map";
import { toneBackgroundStyle, toneTextClass } from "@/lib/style-maps";

const AdminDashboard = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: api.getAdminDashboard,
  });

  if (isLoading) {
    return <LoadingScreen message="Loading admin overview" />;
  }

  if (isError || !data) {
    return <ErrorScreen message="Unable to load admin dashboard." onRetry={() => refetch()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-card-foreground">Merchly Admin Portal</h1>
          <nav className="flex items-center gap-6">
            <a href="/admin/clients" className="text-muted-foreground hover:text-card-foreground">
              Clients
            </a>
            <a href="/admin/campaigns" className="text-muted-foreground hover:text-card-foreground">
              Campaigns
            </a>
            <a href="/admin/tags" className="text-muted-foreground hover:text-card-foreground">
              Tags
            </a>
            <a href="/admin/revenue" className="text-muted-foreground hover:text-card-foreground">
              Revenue
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-card-foreground mb-6">Platform Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.kpis.map((kpi) => {
            const Icon = getIconByName(kpi.icon);
            return (
              <Card key={kpi.id} className="p-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={toneBackgroundStyle(kpi.tone)}>
                  <Icon className={`w-6 h-6 ${toneTextClass[kpi.tone]}`} />
                </div>
                <div className="text-3xl font-bold text-card-foreground mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Client Activity</h3>
            <div className="space-y-3">
              {data.recentActivity.map((item, i) => (
                <div key={`${item.client}-${i}`} className="flex items-center justify-between py-2 border-b border-border last:border-0">
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
              {data.systemHealth.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <span className={`text-sm font-medium ${toneTextClass[metric.tone]}`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
