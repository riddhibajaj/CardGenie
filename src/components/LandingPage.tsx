import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, TrendingUp, Bell, Shield, CreditCard, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="h-8 w-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <span>CardGenie</span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
              <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </a>
              <a href="#why" className="text-sm font-medium hover:text-primary transition-colors">
                Why CardGenie
              </a>
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how" className="text-sm font-medium hover:text-primary transition-colors">
                How it Works
              </a>
            </div>
            <Button onClick={() => navigate("/dashboard")} className="bg-gradient-primary">
              Try Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 mb-8">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">AI-powered</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Maximize Rewards,{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Minimize Effort
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Personalized recommendations, real-time alerts, and portfolio insights to help you capture every dollar in rewards value
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-primary text-lg h-14 px-8 shadow-glow"
            >
              Try Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-success" />
              Quick Setup
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              Secure
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-success" />
              Free to Try
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section id="why" className="bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              The Difference
            </div>
            <h2 className="text-4xl font-bold mb-8">Same Cards. Same Spending. Dramatically Different Results.</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-destructive/20 bg-destructive/5">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-6 text-center flex items-center justify-center gap-2">
                    ❌ Without CardGenie
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-destructive/40 pl-4">
                      <div className="font-semibold mb-1">😵 Wrong 40%</div>
                      <div className="text-sm text-muted-foreground">Guessing which card</div>
                    </div>
                    <div className="border-l-4 border-destructive/40 pl-4">
                      <div className="font-semibold mb-1">💸 $847 lost</div>
                      <div className="text-sm text-muted-foreground">Left on table yearly</div>
                    </div>
                    <div className="border-l-4 border-destructive/40 pl-4">
                      <div className="font-semibold mb-1">⏰ 3 hrs/month</div>
                      <div className="text-sm text-muted-foreground">Manual tracking</div>
                    </div>
                    <div className="border-l-4 border-destructive/40 pl-4">
                      <div className="font-semibold mb-1">📉 Silent loss</div>
                      <div className="text-sm text-muted-foreground">Points expire quietly</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-success/20 bg-success/5">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-6 text-center flex items-center justify-center gap-2">
                    ✅ With CardGenie
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-success pl-4">
                      <div className="font-semibold mb-1">✨ Best 95%</div>
                      <div className="text-sm text-muted-foreground">AI-powered optimal choice</div>
                    </div>
                    <div className="border-l-4 border-success pl-4">
                      <div className="font-semibold mb-1">💰 $847 captured</div>
                      <div className="text-sm text-muted-foreground">Maximum value secured</div>
                    </div>
                    <div className="border-l-4 border-success pl-4">
                      <div className="font-semibold mb-1">⏱️ 5 mins/month</div>
                      <div className="text-sm text-muted-foreground">Automated tracking</div>
                    </div>
                    <div className="border-l-4 border-success pl-4">
                      <div className="font-semibold mb-1">🔔 30-day alerts</div>
                      <div className="text-sm text-muted-foreground">Never miss expiration</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              Features
            </div>
            <h2 className="text-4xl font-bold mb-4">Unlock Your Cards' Superpowers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover and use your card's premium perks, effortlessly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="border-2 hover:shadow-glow transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Card Selector</h3>
                <p className="text-muted-foreground mb-4">
                  AI analyzes your wallet and recommends the optimal card for every purchase
                </p>
                <div className="hidden group-hover:block text-sm text-muted-foreground space-y-1">
                  <div>• Real-time recommendations based on merchant category</div>
                  <div>• Shows exact rewards difference ($7.50 vs $2.25)</div>
                  <div>• Explains reasoning in plain English</div>
                  <div>• 85-99% confidence scores</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-glow transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Unified Rewards Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Track credit cards and loyalty programs all in one place
                </p>
                <div className="hidden group-hover:block text-sm text-muted-foreground space-y-1">
                  <div>• See total portfolio value at a glance ($2,847)</div>
                  <div>• Airlines, hotels, and credit card points combined</div>
                  <div>• Visual breakdowns with charts and graphs</div>
                  <div>• Real-time sync across all programs</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-glow transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Chat Assistant</h3>
                <p className="text-muted-foreground mb-4">
                  Ask questions in natural language, get smart answers
                </p>
                <div className="hidden group-hover:block text-sm text-muted-foreground space-y-1">
                  <div>• "Which card should I use at Target?"</div>
                  <div>• "Am I leaving money on the table?"</div>
                  <div>• "How can I redeem points for Hawaii?"</div>
                  <div>• Conversational, personalized responses</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-glow transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Credit Health Monitoring</h3>
                <p className="text-muted-foreground mb-4">
                  Build great credit while maximizing rewards
                </p>
                <div className="hidden group-hover:block text-sm text-muted-foreground space-y-1">
                  <div>• Track utilization across all cards (18%)</div>
                  <div>• Alerts when approaching 30% threshold</div>
                  <div>• Suggestions for score improvement</div>
                  <div>• Budget protection features</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              How it Works
            </div>
            <h2 className="text-4xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-accent flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Connect Your Wallet</h3>
              <p className="text-muted-foreground">
                Add cards & loyalty programs in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Get AI Recommendations</h3>
              <p className="text-muted-foreground">
                Know the best card for every purchase
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-accent flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Maximize Your Value</h3>
              <p className="text-muted-foreground">
                Never miss rewards, points, or bonuses
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Maximize Your Rewards?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join smart cardholders who are capturing every dollar in rewards value.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="bg-white text-primary hover:bg-gray-100 text-lg h-14 px-8"
          >
            Start Optimizing Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 CardGenie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
