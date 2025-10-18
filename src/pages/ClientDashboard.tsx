import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import { api } from "@/lib/api";
import { getIconByName } from "@/lib/icon-map";
import { toneBackgroundStyle, toneTextClass } from "@/lib/style-maps";

const ClientDashboard = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["client-dashboard"],
    queryFn: api.getClientDashboard,
  });

  if (isLoading) {
    return <LoadingScreen message="Loading client dashboard" />;
  }

  if (isError || !data) {
    return <ErrorScreen message="Unable to load client dashboard." onRetry={() => refetch()} />;
  }

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
          {data.kpis.map((kpi) => {
            const Icon = getIconByName(kpi.icon);
            const changeClass = kpi.change?.startsWith("-") ? "text-warning" : "text-success";

            return (
              <Card key={kpi.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={toneBackgroundStyle(kpi.tone)}
                  >
                    <Icon className={`w-5 h-5 ${toneTextClass[kpi.tone]}`} />
                  </div>
                  <span className={`text-sm font-medium ${changeClass}`}>{kpi.change}</span>
                </div>
                <div className="text-3xl font-bold text-card-foreground mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{activity.event}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded capitalize">
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {data.quickActions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="block p-3 border border-border rounded-md hover:bg-muted transition-colors"
                >
                  <p className="font-medium text-card-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
