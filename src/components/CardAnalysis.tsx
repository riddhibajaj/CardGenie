import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, Calendar, Target, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ThemeToggle from "./ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { mockCards, mockTransactions } from "@/data/mockData";
import { useCards } from "@/context/CardsContext";

const CardAnalysis = () => {
  const navigate = useNavigate();
  const { getConnectedCards } = useCards();
  const displayedCards = getConnectedCards();
  
  const [selectedCardId, setSelectedCardId] = useState(displayedCards[0]?.id || "");

  // Show notification when Citi Double Cash tab is clicked
  useEffect(() => {
    // Check if the selected card is Citi Double Cash (id "3")
    if (selectedCardId === "3") {
      const timer = setTimeout(() => {
        toast({
          title: "Lunch Time, Riddhi!",
          description: (
            <span>
              Planning to grab something from Zeeks Pizza today? Remember to use your{" "}
              <strong className="text-primary font-bold">Chase Freedom Flex</strong> to earn{" "}
              <strong className="text-accent font-bold">3x rewards</strong>.
            </span>
          ),
          duration: Infinity,
          className: "animate-scale-in",
        });
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [selectedCardId]);
  
  const card = displayedCards.find(c => c.id === selectedCardId);
  const cardTransactions = mockTransactions.filter(t => t.cardId === selectedCardId);
  
  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">No cards found</h1>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Calculate spending by category
  const spendingByCategory = cardTransactions.reduce((acc, transaction) => {
    const existing = acc.find(item => item.category === transaction.category);
    if (existing) {
      existing.amount += transaction.amount;
      existing.rewards += transaction.rewardsEarned;
    } else {
      acc.push({
        category: transaction.category,
        amount: transaction.amount,
        rewards: transaction.rewardsEarned,
      });
    }
    return acc;
  }, [] as Array<{ category: string; amount: number; rewards: number }>);

  // Calculate monthly spending trend - with specific data for Citi Double Cash
  const getMonthlySpending = () => {
    if (card.id === "4") { // Citi Double Cash
      return [
        { month: "Jul", amount: 3800, rewards: 76 },
        { month: "Aug", amount: 4200, rewards: 84 },
        { month: "Sep", amount: 5100, rewards: 102 },
        { month: "Oct", amount: 4500, rewards: 90 },
        { month: "Nov", amount: cardTransactions.reduce((sum, t) => sum + t.amount, 0), rewards: cardTransactions.reduce((sum, t) => sum + t.rewardsEarned, 0) },
      ];
    }
    return [
      { month: "Jul", amount: 4200, rewards: 168 },
      { month: "Aug", amount: 5100, rewards: 204 },
      { month: "Sep", amount: 3800, rewards: 152 },
      { month: "Oct", amount: 4900, rewards: 196 },
      { month: "Nov", amount: cardTransactions.reduce((sum, t) => sum + t.amount, 0), rewards: cardTransactions.reduce((sum, t) => sum + t.rewardsEarned, 0) },
    ];
  };

  const monthlySpending = getMonthlySpending();

  const totalSpent = cardTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalRewards = Math.min(
    cardTransactions.reduce((sum, t) => sum + t.rewardsEarned, 0),
    totalSpent
  );
  const utilizationPercent = (card.currentBalance / card.creditLimit) * 100;
  const avgRewardRate = totalSpent > 0 ? (totalRewards / totalSpent) * 100 : 0;

  // Optimization opportunities - specific tips per card
  const getOptimizationTips = () => {
    if (card.id === "4") { // Citi Double Cash
      return [
        {
          type: "success",
          title: "Excellent All-Around Card",
          description: "You're earning a flat 2% cashback on all purchases with this card. Perfect for everyday spending that doesn't fall into bonus categories!",
          potential: 0,
        },
        {
          type: "info",
          title: "Maximize Bonus Categories First",
          description: "For groceries and dining, consider using Chase Freedom Flex (3% back) instead. You could earn an extra $5-10/month on those categories.",
          potential: 75,
        },
        {
          type: "warning",
          title: "Utilization Watch",
          description: `At ${Math.round(utilizationPercent)}% utilization, you're close to the 30% threshold. Consider paying down balance before the statement closes.`,
          potential: 0,
        },
      ];
    }
    return [
      {
        type: "warning",
        title: "Underutilized Category",
        description: `You spent ${formatCurrency(890)} on gas this month. Consider using a gas-specific card for better rewards.`,
        potential: 45,
      },
      {
        type: "info",
        title: "Bonus Category Active",
        description: `${card.categories[0]?.name} category is earning ${card.categories[0]?.rate}X points. Maximize this before it expires.`,
        potential: 120,
      },
      {
        type: "success",
        title: "Optimal Usage",
        description: `You're maximizing rewards on ${card.categories[0]?.name} purchases. Great job!`,
        potential: 0,
      },
    ];
  };

  const optimizationTips = getOptimizationTips();

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--primary))",
    },
    rewards: {
      label: "Rewards",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-card border-b border-border/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold">Card Analysis</h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Card Tabs */}
        <Tabs value={selectedCardId} onValueChange={setSelectedCardId} className="mb-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 h-auto bg-transparent">
            {displayedCards.map((c) => (
              <TabsTrigger 
                key={c.id} 
                value={c.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white border border-border bg-card h-auto py-3"
              >
                <div className="flex flex-col items-start w-full">
                  <span className="font-semibold text-sm">{c.issuer}</span>
                  <span className="text-xs opacity-80">{c.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {/* Card Header */}
        <Card className={`mb-8 bg-gradient-to-r ${card.color} text-white border-0`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{card.name}</CardTitle>
                <CardDescription className="text-white/80">
                  {card.issuer} • {card.network} • ****{card.lastFour}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {card.rewardsProgram}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Current Balance</p>
                <p className="text-xl font-bold">{formatCurrency(card.currentBalance)}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Credit Limit</p>
                <p className="text-xl font-bold">{formatCurrency(card.creditLimit)}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Utilization</p>
                <p className="text-xl font-bold">{utilizationPercent.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Annual Fee</p>
                <p className="text-xl font-bold">{formatCurrency(card.annualFee)}</p>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={utilizationPercent} className="h-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Spent (This Month)</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(totalSpent)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Rewards Earned</CardDescription>
              <CardTitle className="text-2xl">{totalRewards.toLocaleString()} pts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Target className="mr-2 h-4 w-4 text-blue-500" />
                <span>{formatCurrency(totalRewards)} value</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg Reward Rate</CardDescription>
              <CardTitle className="text-2xl">{avgRewardRate.toFixed(1)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                <span>{cardTransactions.length} transactions</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="spending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="spending">Spending Patterns</TabsTrigger>
            <TabsTrigger value="rewards">Reward History</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="spending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Your spending breakdown for this card</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingByCategory}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="category" 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                       <YAxis 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(value) => `$${(value / 100).toFixed(0)}`}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent 
                          formatter={(value) => `$${(Number(value) / 100).toFixed(2)}`}
                        />} 
                      />
                      <Bar 
                        dataKey="amount" 
                        fill="hsl(var(--primary))" 
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <div className="mt-6 space-y-3">
                  {spendingByCategory.map((item) => (
                    <div key={item.category} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">{item.rewards} points earned</p>
                      </div>
                      <p className="font-bold">{formatCurrency(item.amount)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Last {cardTransactions.length} transactions on this card</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cardTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.merchant}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatDate(transaction.date)}</span>
                          <span>•</span>
                          <span>{transaction.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(transaction.amount)}</p>
                        <p className="text-sm text-green-600">+{transaction.rewardsEarned} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rewards Trend</CardTitle>
                <CardDescription>Your reward earnings over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlySpending}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="month" 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="rewards" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Earning Breakdown</CardTitle>
                <CardDescription>How you're earning rewards on this card</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {card.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">{category.rate}X points per dollar</p>
                        </div>
                        <Badge variant="secondary">{category.rate}X</Badge>
                      </div>
                      <Progress value={category.rate * 20} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimization Opportunities</CardTitle>
                <CardDescription>Smart recommendations to maximize your rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationTips.map((tip, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border"
                    >
                      <div className="mt-1">
                        <AlertCircle 
                          className={`h-5 w-5 ${
                            tip.type === 'warning' ? 'text-yellow-500' : 
                            tip.type === 'info' ? 'text-blue-500' : 
                            'text-green-500'
                          }`} 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                        {tip.potential > 0 && (
                          <p className="text-sm font-medium text-green-600">
                            Potential savings: {formatCurrency(tip.potential)}/month
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Performance</CardTitle>
                <CardDescription>How well you're using this card</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Reward Optimization</span>
                      <span className="text-sm font-bold">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      You're capturing 82% of available rewards
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Credit Utilization</span>
                      <span className="text-sm font-bold">{utilizationPercent.toFixed(1)}%</span>
                    </div>
                    <Progress value={utilizationPercent} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {utilizationPercent < 30 ? 'Excellent - Keep it below 30%' : 'Consider paying down balance'}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Bonus Category Usage</span>
                      <span className="text-sm font-bold">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Room to improve on bonus category spending
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CardAnalysis;
