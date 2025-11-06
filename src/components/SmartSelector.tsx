import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Sparkles, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockCards, mockRecommendation } from "@/data/mockData";

const SmartSelector = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [showResults, setShowResults] = useState(false);

  const categories = [
    "Dining",
    "Groceries", 
    "Travel",
    "Gas",
    "Shopping",
    "Entertainment",
    "Other"
  ];

  const getRecommendationForCategory = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    const amt = parseFloat(amount);
    
    if (lowerCat === "dining") {
      return {
        bestCard: mockCards[2], // Chase Freedom Flex
        estimatedReward: Math.floor(amt * 3.5),
        reasoning: "Chase Freedom Flex offers 3% cashback on dining purchases, making it your best option for restaurant spending.",
        alternatives: [
          { card: mockCards[3], reward: Math.floor(amt * 2), reason: "Citi Double Cash gives 2% flat cashback on all purchases" },
          { card: mockCards[0], reward: Math.floor(amt * 1), reason: "Sound Rewards offers 1% on all purchases" }
        ]
      };
    }
    
    if (lowerCat === "groceries") {
      return {
        bestCard: mockCards[2], // Chase Freedom Flex
        estimatedReward: Math.floor(amt * 3.5),
        reasoning: "Chase Freedom Flex offers rotating 5% categories which often include grocery stores, plus 3% on select merchants.",
        alternatives: [
          { card: mockCards[1], reward: Math.floor(amt * 1.5), reason: "Sound Cashback gives 1.5% flat cashback" },
          { card: mockCards[0], reward: Math.floor(amt * 1), reason: "Sound Rewards offers 1% on all purchases" }
        ]
      };
    }
    
    if (lowerCat === "travel") {
      return {
        bestCard: mockCards[2], // Chase Freedom Flex
        estimatedReward: Math.floor(amt * 3.5),
        reasoning: "Chase Freedom Flex earns 3% on travel and can transfer points to United and Hyatt for even more value.",
        alternatives: [
          { card: mockCards[3], reward: Math.floor(amt * 2), reason: "Citi Double Cash offers 2% on all travel purchases" },
          { card: mockCards[1], reward: Math.floor(amt * 1.5), reason: "Sound Cashback provides 1.5% on all spending" }
        ]
      };
    }
    
    if (lowerCat === "gas") {
      return {
        bestCard: mockCards[3], // Citi Double Cash
        estimatedReward: Math.floor(amt * 2),
        reasoning: "Citi Double Cash is your best option for gas with a flat 2% cashback on all purchases.",
        alternatives: [
          { card: mockCards[1], reward: Math.floor(amt * 1.5), reason: "Sound Cashback gives 1.5% on all purchases" },
          { card: mockCards[0], reward: Math.floor(amt * 1), reason: "Sound Rewards offers 1% points" }
        ]
      };
    }
    
    if (lowerCat === "shopping") {
      return {
        bestCard: mockCards[1], // Sound Cashback
        estimatedReward: Math.floor(amt * 1.5),
        reasoning: "Sound Cashback offers 1.5% flat cashback on all purchases, providing solid rewards for shopping.",
        alternatives: [
          { card: mockCards[3], reward: Math.floor(amt * 2), reason: "Citi Double Cash provides 2% flat cashback" },
          { card: mockCards[0], reward: Math.floor(amt * 1), reason: "Sound Rewards gives 1% points" }
        ]
      };
    }
    
    if (lowerCat === "entertainment") {
      return {
        bestCard: mockCards[0], // Sound Rewards
        estimatedReward: Math.floor(amt * 1),
        reasoning: "Sound Rewards offers 1% points on all purchases, which you can redeem for entertainment and more.",
        alternatives: [
          { card: mockCards[3], reward: Math.floor(amt * 2), reason: "Citi Double Cash offers 2% cashback" },
          { card: mockCards[1], reward: Math.floor(amt * 1.5), reason: "Sound Cashback provides 1.5% flat cashback" }
        ]
      };
    }
    
    // Default for "other" or unknown categories
    return {
      bestCard: mockCards[1], // Sound Cashback
      estimatedReward: Math.floor(amt * 1.5),
      reasoning: "Sound Cashback offers 1.5% flat cashback on all purchases, providing consistent value.",
      alternatives: [
        { card: mockCards[3], reward: Math.floor(amt * 2), reason: "Citi Double Cash offers 2% on everything" },
        { card: mockCards[0], reward: Math.floor(amt * 1), reason: "Sound Rewards gives 1% points on all spending" }
      ]
    };
  };

  const handleAnalyze = () => {
    if (category && amount) {
      setShowResults(true);
    }
  };

  const recommendation = category && amount ? getRecommendationForCategory(category) : mockRecommendation;

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
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
              <h1 className="text-xl font-bold">Smart Card Selector</h1>
              <p className="text-sm text-muted-foreground">Find the best card for your purchase</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Details</CardTitle>
              <CardDescription>Tell us about your planned purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="merchant">Merchant (optional)</Label>
                <Input
                  id="merchant"
                  placeholder="e.g., Whole Foods, United Airlines"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-7"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-primary" 
                size="lg"
                onClick={handleAnalyze}
                disabled={!category || !amount}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Get Recommendation
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {showResults ? (
            <div className="space-y-4">
              {/* Best Card */}
              <Card className="border-2 border-accent shadow-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-accent border-0">Best Choice</Badge>
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-2xl mt-3">{recommendation.bestCard.name}</CardTitle>
                  <CardDescription>Estimated reward: {formatCurrency(recommendation.estimatedReward)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`h-32 rounded-lg bg-gradient-to-br ${recommendation.bestCard.color} flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <div className="font-mono text-lg mb-2">•••• {recommendation.bestCard.lastFour}</div>
                      <div className="text-sm opacity-90">{recommendation.bestCard.network}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{recommendation.reasoning}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="font-semibold text-sm">Key Benefits:</p>
                    {recommendation.bestCard.categories.map((cat, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{cat.name}</span>
                        <Badge variant="secondary">{cat.rate}x points</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alternative Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Alternative Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendation.alternatives.map((alt, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">{alt.card.name}</p>
                        <Badge variant="outline">{formatCurrency(alt.reward)}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{alt.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Value Breakdown */}
              <Card className="bg-gradient-accent text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Value Maximized
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {formatCurrency(recommendation.estimatedReward)}
                  </div>
                  <p className="text-sm text-white/80">
                    You're earning {((recommendation.estimatedReward / (parseFloat(amount || "0") * 100)) * 100).toFixed(1)}% back on this purchase
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Enter your purchase details to see personalized recommendations
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Pro Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Check for bonuses</p>
                  <p className="text-muted-foreground">Some cards have rotating 5X categories</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Stack offers</p>
                  <p className="text-muted-foreground">Combine card rewards with merchant deals</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Track spending</p>
                  <p className="text-muted-foreground">Meet minimum spends for sign-up bonuses</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SmartSelector;
