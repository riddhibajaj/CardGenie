import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, AlertTriangle, Bell, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockAlerts } from "@/data/mockData";
import { useCards } from "@/context/CardsContext";
import { useLoyalty } from "@/context/LoyaltyContext";

const AlertsCenter = () => {
  const navigate = useNavigate();
  const { connectedCardIds } = useCards();
  const { getConnectedLoyaltyPrograms } = useLoyalty();
  const displayedLoyaltyPrograms = getConnectedLoyaltyPrograms();
  const hasConnections = connectedCardIds.length > 0 || displayedLoyaltyPrograms.length > 0;

  const urgentAlerts = mockAlerts.filter(a => a.severity === 'urgent');
  const warningAlerts = mockAlerts.filter(a => a.severity === 'warning');
  const infoAlerts = mockAlerts.filter(a => a.severity === 'info');

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'urgent': return <AlertTriangle className="h-5 w-5" />;
      case 'warning': return <Bell className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'urgent': return 'destructive';
      case 'warning': return 'warning';
      default: return 'accent';
    }
  };

  const AlertCard = ({ alert }: { alert: typeof mockAlerts[0] }) => {
    const colorClass = alert.severity === 'urgent' ? 'border-destructive bg-destructive/5' :
                       alert.severity === 'warning' ? 'border-warning bg-warning/5' :
                       'border-accent bg-accent/5';

    return (
      <Card className={`${colorClass} border-2`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`mt-1 ${
              alert.severity === 'urgent' ? 'text-destructive' :
              alert.severity === 'warning' ? 'text-warning' :
              'text-accent'
            }`}>
              {getAlertIcon(alert.severity)}
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{alert.title}</h3>
                  <Badge variant={getAlertColor(alert.severity) as any}>
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                {alert.valueAtRisk && (
                  <p className="text-sm font-semibold mt-2">
                    Value at risk: {formatCurrency(alert.valueAtRisk)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  {alert.action}
                </Button>
                <Button size="sm" variant="ghost">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Read
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Alerts Center</h1>
              <p className="text-sm text-muted-foreground">Stay on top of your rewards opportunities</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {!hasConnections ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Alerts Yet</h3>
              <p className="text-muted-foreground mb-6">Connect your cards and loyalty programs to start receiving alerts and opportunities</p>
              <Button onClick={() => navigate("/profile")} className="bg-gradient-primary">
                Connect Accounts
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-destructive bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Urgent
              </CardTitle>
              <CardDescription>{urgentAlerts.length} alert{urgentAlerts.length !== 1 && 's'} require immediate attention</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Warnings
              </CardTitle>
              <CardDescription>{warningAlerts.length} alert{warningAlerts.length !== 1 && 's'} to review</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-accent bg-accent/5">
            <CardHeader>
              <CardTitle className="text-accent flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Opportunities
              </CardTitle>
              <CardDescription>{infoAlerts.length} way{infoAlerts.length !== 1 && 's'} to earn more</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Alerts Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="all">
              All ({mockAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="urgent">
              Urgent ({urgentAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="warning">
              Warning ({warningAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="info">
              Info ({infoAlerts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockAlerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4">
            {urgentAlerts.length > 0 ? (
              urgentAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                  <p className="text-muted-foreground">No urgent alerts - you're all caught up!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="warning" className="space-y-4">
            {warningAlerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            {infoAlerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>
        </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default AlertsCenter;
