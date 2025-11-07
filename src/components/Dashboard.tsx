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
import CreditHealthModal from "./CreditHealthModal";
import ThemeToggle from "./ThemeToggle";
import mockDataJson from "@/data/mockData.json";
import { useCards } from "@/context/CardsContext";
import { useLoyalty } from "@/context/LoyaltyContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getConnectedCards, connectedCardIds } = useCards();
  const { getConnectedLoyaltyPrograms } = useLoyalty();
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showCreditHealthModal, setShowCreditHealthModal] = useState(false);

  const displayedCards = getConnectedCards();
  const displayedLoyaltyPrograms = getConnectedLoyaltyPrograms();
  
  // Calculate total rewards value from connected loyalty programs
  const totalRewardsValue = displayedLoyaltyPrograms.reduce((sum, acc) => sum + acc.valueCents, 0);
  
  // Calculate optimization score - more cards = harder to optimize
  const getOptimizationScore = () => {
    switch (connectedCardIds.length) {
      case 0: return null;
      case 1: return 85;
      case 2: return 78;
      case 3: return 73;
      case 4: return 68;
      default: return 68;
    }
  };
  
  const optimizationScore = getOptimizationScore();

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
              <ThemeToggle />
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
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardDescription>Total Rewards Value</CardDescription>
              <CardTitle className="text-4xl text-foreground">{formatCurrency(totalRewardsValue)}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">Across all your connected programs</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {optimizationScore === null ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your credit card accounts to start optimizing your rewards
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/profile")}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Add Your First Card
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Optimization Score</span>
                    <span className="font-semibold text-lg text-foreground">{optimizationScore}%</span>
                  </div>
                  <Progress value={optimizationScore} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {connectedCardIds.length === 1 
                      ? "Great start! Add more cards to unlock better recommendations."
                      : connectedCardIds.length === 4
                      ? "Having many cards increases rewards potential but makes manual optimization challenging."
                      : "More cards provide flexibility but require smarter optimization."}
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => navigate("/card-analysis")}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    View Optimization Details
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent border-0 shadow-glow-accent text-white overflow-hidden relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="h-6 w-6 animate-pulse" />
                Smart Card Selector
              </CardTitle>
              <CardDescription className="text-white/90 font-medium">
                Maximize rewards on every purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-sm text-white/95 mb-4 leading-relaxed">
                Get instant recommendations for which card to use based on your spending category, bonus offers, and rewards rates.
              </p>
              <Button 
                className="w-full bg-white/95 text-primary hover:bg-white hover:scale-105 transition-transform font-semibold shadow-lg"
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
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg"
            onClick={() => {
              navigate("/profile");
              setTimeout(() => {
                const goalsSection = document.getElementById("rewards-goals");
                if (goalsSection) {
                  goalsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }, 100);
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Active Goals
              </CardTitle>
              <CardDescription>Your reward targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockGoals.map((goal) => {
                const progress = (goal.currentValue / goal.targetValue) * 100;
                return (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(goal.currentValue)} / {formatCurrency(goal.targetValue)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => setShowCreditHealthModal(true)}
          >
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
              {displayedCards.map((card) => (
                <div 
                  key={card.id} 
                  className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                  onClick={() => {
                    navigate(`/card/${card.id}`);
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
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
            {displayedLoyaltyPrograms.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No loyalty programs connected yet</p>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/profile")}
                >
                  Add Loyalty Programs
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayedLoyaltyPrograms.map((account) => (
                <div 
                  key={account.id} 
                  className="group p-5 rounded-xl bg-gradient-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors ring-2 ring-accent/20">
                      <span className="text-3xl">{account.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">{account.program}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {account.balance > 0 && (
                      <p className="text-xs text-muted-foreground font-medium">
                        {account.balance.toLocaleString()} points
                      </p>
                    )}
                    <p className="font-bold text-xl text-foreground">{formatCurrency(account.valueCents)}</p>
                    {account.daysUntilExpiration && account.daysUntilExpiration < 150 && (
                      <Badge variant="destructive" className="text-xs font-semibold">
                        ⏰ {account.daysUntilExpiration}d left
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              </div>
            )}
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

      <CreditHealthModal
        isOpen={showCreditHealthModal}
        onClose={() => setShowCreditHealthModal(false)}
        creditScore={mockUser.creditScore}
        portfolioUtilization={mockUser.portfolioUtilization}
      />

      <FloatingChatButton />
    </div>
  );
};

export default Dashboard;
