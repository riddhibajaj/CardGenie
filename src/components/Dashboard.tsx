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

        {/* Smart Insights - Educational Section */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <CardTitle>Smart Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Optimization Opportunity</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You could earn an estimated $50 more this month by using the Smart Selector for grocery and dining purchases. Your Chase Sapphire card offers 3x points on dining.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate("/selector")}>
                    Use Smart Selector
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Goal Progress Update</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You're 75% toward your "Summer Vacation Fund" goal! Keep using your travel cards to reach it faster.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Health Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Credit Score</CardDescription>
              <CardTitle className="text-3xl text-primary">{mockUser.creditScore}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Excellent • Updated Nov 1</p>
              <p className="text-xs text-muted-foreground mt-2">
                💡 Maintaining low utilization helps your score
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Credit Utilization</CardDescription>
              <CardTitle className="text-3xl text-success">{mockUser.portfolioUtilization}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={mockUser.portfolioUtilization} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                ✓ Healthy (below 30% is ideal)
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-warning bg-warning/5">
            <CardHeader className="pb-3">
              <CardDescription>Rewards Expiring Soon</CardDescription>
              <CardTitle className="text-3xl text-warning">{formatCurrency(mockUser.expiringValueSoon)}</CardTitle>
            </CardHeader>
            <CardContent>
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

        {/* Active Goals - Visual Progress Trackers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Rewards Goals</CardTitle>
                <CardDescription>Track progress and stay motivated to reach your targets</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Target className="mr-2 h-4 w-4" />
                New Goal
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockGoals.map((goal) => {
              const progress = (goal.currentValue / goal.targetValue) * 100;
              const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={goal.id} className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-lg">{goal.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatCurrency(goal.currentValue)} of {formatCurrency(goal.targetValue)} • {daysLeft} days left
                      </p>
                    </div>
                    <Badge 
                      variant={progress >= 75 ? "default" : "secondary"}
                      className="text-lg px-3 py-1"
                    >
                      {Math.round(progress)}%
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-3 mb-3" />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {progress >= 75 ? "🎯 Almost there! Keep going!" : 
                       progress >= 50 ? "💪 Great progress!" : 
                       "🚀 You've got this!"}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => navigate("/selector")}>
                      Earn More
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Cards & Loyalty Programs - Combined Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Cards</CardTitle>
                  <CardDescription>Manage your credit card portfolio</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCards.map((card) => (
                <div 
                  key={card.id} 
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                  onClick={() => navigate(`/card/${card.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-20 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-mono text-xs`}>
                      •••• {card.lastFour}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{card.name}</p>
                      <p className="text-xs text-muted-foreground">{card.rewardsProgram}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{formatCurrency(card.currentBalance)}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((card.currentBalance / card.creditLimit) * 100)}% used
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loyalty Programs</CardTitle>
              <CardDescription>Your points and miles balances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLoyaltyAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center">
                      <span className="text-xl">{account.icon}</span>
                    </div>
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
        </div>

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
    </div>
  );
};

export default Dashboard;
