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
  MessageSquare,
  User
} from "lucide-react";
import { mockUser, mockCards, mockLoyaltyAccounts, mockAlerts, mockGoals } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PortfolioOptimizationModal from "./PortfolioOptimizationModal";
import FloatingChatButton from "./FloatingChatButton";
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
              <Button onClick={() => navigate("/profile")} className="bg-gradient-primary">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section - Financial Health Snapshot */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-primary text-white border-0">
            <CardHeader>
              <CardDescription className="text-white/80">Total Rewards Value</CardDescription>
              <CardTitle className="text-4xl">{formatCurrency(mockLoyaltyAccounts.reduce((sum, acc) => sum + acc.valueCents, 0))}</CardTitle>
              <p className="text-sm text-white/90 mt-2">Across all your cards and programs</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">Optimization Score</span>
                <span className="font-semibold text-lg">{mockUser.optimizationScore}%</span>
              </div>
              <Progress value={mockUser.optimizationScore} className="h-2 bg-white/20" />
              <Button 
                className="w-full bg-white text-primary hover:bg-gray-100 mt-4"
                onClick={() => navigate("/card-analysis")}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                View Optimization Details
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Smart Card Selector
              </CardTitle>
              <CardDescription className="text-white/80">
                Maximize rewards on every purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/90 mb-4">
                Get instant recommendations for which card to use based on your spending category, bonus offers, and rewards rates.
              </p>
              <Button 
                className="w-full bg-white text-primary hover:bg-gray-100"
                onClick={() => navigate("/selector")}
              >
                Start Smart Selector
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>


        {/* Key Metrics - 3 Equal Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Goals</CardTitle>
              <CardDescription>Your rewards targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockGoals.map((goal) => {
                const progress = (goal.currentValue / goal.targetValue) * 100;
                const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{goal.name}</p>
                      <Badge variant="secondary">{Math.round(progress)}%</Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(goal.currentValue)} of {formatCurrency(goal.targetValue)} • {daysLeft} days left
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Credit Health</CardTitle>
              <CardDescription>Your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{mockUser.creditScore}</div>
                <p className="text-sm text-muted-foreground mb-4">Good • Updated Nov 5</p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className="font-medium">{mockUser.portfolioUtilization}%</span>
                  </div>
                  <Progress value={mockUser.portfolioUtilization} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    ✓ Healthy (below 30% is ideal)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning">Expiration Alerts</CardTitle>
              <CardDescription>Rewards expiring soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-warning mb-1">{formatCurrency(mockUser.expiringValueSoon)}</div>
                <p className="text-sm text-muted-foreground">Total value at risk</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-warning text-warning hover:bg-warning hover:text-white"
                onClick={() => navigate("/alerts")}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                View Alerts
              </Button>
            </CardContent>
          </Card>
        </div>


        {/* Your Cards - 2x2 Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Cards</CardTitle>
                <CardDescription>Your credit card portfolio</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {mockCards.map((card) => (
                <div 
                  key={card.id} 
                  className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                  onClick={() => navigate(`/card/${card.id}`)}
                >
                  <div className={`h-32 rounded-lg bg-gradient-to-br ${card.color} p-4 flex flex-col justify-between text-white mb-3`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{card.issuer}</span>
                      <span className="text-xs">{card.network}</span>
                    </div>
                    <div>
                      <div className="font-mono text-lg mb-1">•••• {card.lastFour}</div>
                      <div className="text-xs opacity-90">{card.name}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Balance</span>
                      <span className="font-semibold">{formatCurrency(card.currentBalance)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Limit</span>
                      <span className="font-medium">{formatCurrency(card.creditLimit)}</span>
                    </div>
                    <Progress value={(card.currentBalance / card.creditLimit) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">
                      {Math.round((card.currentBalance / card.creditLimit) * 100)}% utilization
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Programs */}
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Programs</CardTitle>
            <CardDescription>Your points and miles balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockLoyaltyAccounts.map((account) => (
                <div key={account.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center">
                      <span className="text-2xl">{account.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{account.program}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {account.balance > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {account.balance.toLocaleString()} points
                      </p>
                    )}
                    <p className="font-semibold text-lg">{formatCurrency(account.valueCents)}</p>
                    {account.daysUntilExpiration && account.daysUntilExpiration < 150 && (
                      <Badge variant="destructive" className="text-xs">
                        {account.daysUntilExpiration}d left
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Opportunities - Actionable Insights */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Alerts & Opportunities</CardTitle>
                <CardDescription>Stay informed and take action on time-sensitive items</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate("/alerts")}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`mt-0.5 ${
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
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{alert.message}</p>
                    </div>
                  </div>
                  {alert.severity === 'urgent' && (
                    <Button size="sm" variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white">
                      Take Action
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <PortfolioOptimizationModal
        isOpen={showPortfolioModal}
        onClose={() => setShowPortfolioModal(false)}
        userData={mockDataJson.user}
        cards={mockDataJson.cards}
        alerts={mockDataJson.alerts}
        optimizationRules={mockDataJson.optimizationRules}
      />

      <FloatingChatButton />
    </div>
  );
};

export default Dashboard;
