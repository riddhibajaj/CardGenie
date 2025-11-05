import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, AlertTriangle, Sparkles, Clock } from "lucide-react";

interface PortfolioOptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  cards: any[];
  alerts: any[];
  optimizationRules: any;
}

const PortfolioOptimizationModal = ({
  isOpen,
  onClose,
  userData,
  cards,
  alerts,
  optimizationRules,
}: PortfolioOptimizationModalProps) => {
  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // Calculate optimization metrics
  const capturedValue = userData.totalRewardsValue;
  const potentialValue = userData.potentialRewardsValue;
  const missedValue = potentialValue - capturedValue;
  const optimizationScore = userData.optimizationScore;

  // TODO: Replace with actual transaction-derived data when available
  // For now using placeholder that matches user.monthlySpendingAverage
  const categoryData = [
    { category: "Grocery", value: 42700, percent: 37, color: "#10b981" },
    { category: "Dining", value: 31200, percent: 27, color: "#f59e0b" },
    { category: "Gas", value: 18000, percent: 16, color: "#ef4444" },
    { category: "Other", value: 15600, percent: 13, color: "#8b5cf6" },
    { category: "Travel", value: 8500, percent: 7, color: "#3b82f6" },
  ];

  // TODO: Replace with actual data when available
  const cardPerformance = [
    {
      cardId: "chase-sapphire-preferred",
      name: "Chase Sapphire Preferred",
      optimizationRate: 95,
      missedOpportunityCents: 1200,
      strongCategories: ["Dining", "Travel"],
    },
    {
      cardId: "chase-freedom-flex",
      name: "Chase Freedom Flex",
      optimizationRate: 45,
      missedOpportunityCents: 12000,
      strongCategories: ["Grocery", "Gas"],
    },
    {
      cardId: "sound-cu-cashback",
      name: "Sound CU Cash Back",
      optimizationRate: 88,
      missedOpportunityCents: 800,
      strongCategories: ["General"],
    },
    {
      cardId: "citi-double-cash",
      name: "Citi Double Cash",
      optimizationRate: 92,
      missedOpportunityCents: 500,
      strongCategories: ["General"],
    },
  ];

  const getOptimizationColor = (rate: number) => {
    if (rate >= 90) return "text-success border-success bg-success/10";
    if (rate >= 75) return "text-primary border-primary bg-primary/10";
    if (rate >= 60) return "text-warning border-warning bg-warning/10";
    return "text-destructive border-destructive bg-destructive/10";
  };

  const insights = [
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Activate Freedom Q4 Bonus",
      description:
        "You haven't activated Chase Freedom Flex 5% grocery & gas bonus for Q4. Worth $120 this quarter.",
      action: "Activate Now",
      severity: "warning",
      borderColor: "border-l-warning",
      bgColor: "bg-warning/5",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Use Sapphire for Dining",
      description:
        "Your Chase Sapphire Preferred earns 3x on dining vs 1.5x on Sound CU. That's 2x more rewards! Potential: +$45/month on your dining spend.",
      action: null,
      severity: "info",
      borderColor: "border-l-primary",
      bgColor: "bg-primary/5",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "United Miles Expiring",
      description:
        "15,000 United miles expire in 23 days = $210 value. Transfer Chase points or book a flight to extend.",
      action: "View Options",
      severity: "urgent",
      borderColor: "border-l-destructive",
      bgColor: "bg-destructive/5",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Portfolio Optimization Analysis</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Section 1: Optimization Score Badge */}
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <TrendingUp className="h-8 w-8" />
                  <div>
                    <div className="text-sm opacity-90">Optimization Score</div>
                    <div className="text-5xl font-bold">{optimizationScore}%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-sm opacity-90">You're Capturing</div>
                    <div className="text-2xl font-bold">{formatCurrency(capturedValue)}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Of Potential</div>
                    <div className="text-2xl font-bold">{formatCurrency(potentialValue)}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-lg font-semibold">
                      {formatCurrency(missedValue)} more available
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Category Breakdown */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Rewards by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={80} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Section 3: Card Performance */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Card Performance</h3>
              <div className="space-y-3">
                {cardPerformance.map((card) => (
                  <div
                    key={card.cardId}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{card.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {card.strongCategories.map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Missed</div>
                        <div className="font-semibold">{formatCurrency(card.missedOpportunityCents)}</div>
                      </div>
                      <Badge className={`text-lg px-4 py-2 ${getOptimizationColor(card.optimizationRate)}`}>
                        {card.optimizationRate}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Optimization Insights */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Quick Wins
              </h3>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${insight.borderColor} ${insight.bgColor}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{insight.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{insight.title}</div>
                        <div className="text-sm text-muted-foreground mb-3">{insight.description}</div>
                        {insight.action && (
                          <Button size="sm" variant="outline">
                            {insight.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioOptimizationModal;
