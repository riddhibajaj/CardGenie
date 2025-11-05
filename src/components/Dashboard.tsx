import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  AlertTriangle, 
  CreditCard, 
  Target,
  ArrowRight,
  Sparkles,
  Bell,
  MessageSquare
} from "lucide-react";
import { mockUser, mockCards, mockLoyaltyAccounts, mockAlerts, mockGoals } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PortfolioOptimizationModal from "./PortfolioOptimizationModal";
import mockDataJson from "@/data/mockData.json";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CardGenie</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {mockUser.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => navigate("/alerts")}>
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigate("/chat")}>
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button onClick={() => navigate("/selector")} className="bg-gradient-primary">
                <Sparkles className="mr-2 h-4 w-4" />
                Smart Selector
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-accent text-white border-0">
            <CardHeader className="pb-3">
              <CardDescription className="text-white/80">Optimization Score</CardDescription>
              <CardTitle className="text-3xl">{mockUser.optimizationScore}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-white text-primary hover:bg-gray-100"
                onClick={() => setShowPortfolioModal(true)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Utilization Rate</CardDescription>
              <CardTitle className="text-3xl text-success">{mockUser.portfolioUtilization}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={mockUser.portfolioUtilization} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Healthy range (below 30%)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Credit Score</CardDescription>
              <CardTitle className="text-3xl text-primary">{mockUser.creditScore}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Excellent • Updated Nov 1</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-warning bg-warning/5">
            <CardHeader className="pb-3">
              <CardDescription>Expiring Soon</CardDescription>
              <CardTitle className="text-3xl text-warning">{formatCurrency(mockUser.expiringValueSoon)}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-warning text-warning hover:bg-warning hover:text-white"
                onClick={() => navigate("/alerts")}
              >
                View Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Cards */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Cards</CardTitle>
                    <CardDescription>Active credit cards in your portfolio</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCards.map((card) => (
                  <div 
                    key={card.id} 
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-16 w-24 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-mono text-sm`}>
                        •••• {card.lastFour}
                      </div>
                      <div>
                        <p className="font-semibold">{card.name}</p>
                        <p className="text-sm text-muted-foreground">{card.rewardsProgram}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(card.currentBalance)}</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((card.currentBalance / card.creditLimit) * 100)}% used
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Goals */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Rewards Goals</CardTitle>
                    <CardDescription>Track your progress toward redemption goals</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Target className="mr-2 h-4 w-4" />
                    New Goal
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGoals.map((goal) => {
                  const progress = (goal.currentValue / goal.targetValue) * 100;
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{goal.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(goal.currentValue)} of {formatCurrency(goal.targetValue)}
                          </p>
                        </div>
                        <Badge variant="secondary">{Math.round(progress)}%</Badge>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gradient-primary text-white border-0">
              <CardHeader>
                <CardTitle>Smart Card Selector</CardTitle>
                <CardDescription className="text-white/80">
                  Get instant recommendations for your next purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate("/selector")}
                >
                  Start Selector
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Loyalty Accounts */}
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Programs</CardTitle>
                <CardDescription>Your points and miles balances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockLoyaltyAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{account.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{account.program}</p>
                        <p className="text-xs text-muted-foreground">
                          {account.balance.toLocaleString()} pts
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{formatCurrency(account.valueCents)}</p>
                      {account.daysUntilExpiration && account.daysUntilExpiration < 120 && (
                        <Badge variant="destructive" className="text-xs">
                          {account.daysUntilExpiration}d left
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Alerts</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/alerts")}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <div className={`mt-1 ${
                      alert.severity === 'urgent' ? 'text-destructive' :
                      alert.severity === 'warning' ? 'text-warning' :
                      'text-accent'
                    }`}>
                      {alert.severity === 'urgent' ? <AlertTriangle className="h-5 w-5" /> :
                       alert.severity === 'warning' ? <Bell className="h-5 w-5" /> :
                       <Sparkles className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <PortfolioOptimizationModal
        isOpen={showPortfolioModal}
        onClose={() => setShowPortfolioModal(false)}
        userData={mockDataJson.user}
        cards={mockDataJson.cards}
        alerts={mockDataJson.alerts}
        optimizationRules={mockDataJson.optimizationRules}
      />
    </div>
  );
};

export default Dashboard;
