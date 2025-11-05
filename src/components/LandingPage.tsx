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
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <span>CardGenie</span>
          </div>
          <div className="flex items-center gap-6">
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
            Get the Most from Every Card{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              in Your Wallet
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
              Why CardGenie
            </div>
            <h2 className="text-4xl font-bold mb-8">Rewards Made Simple. Value Made Real.</h2>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-muted-foreground">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">50+</div>
                <div className="text-sm">integrations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">30 secs</div>
                <div className="text-sm">setup</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">$750</div>
                <div className="text-sm">Hidden Rewards</div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2 border-destructive/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4 text-center">WITHOUT CardGenie</h3>
                  <div className="space-y-4">
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">😵 Guessing</div>
                      <div className="text-sm text-muted-foreground">Which card to use?</div>
                      <div className="text-sm text-destructive">Wrong 40% of time</div>
                    </div>
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">💸 $847/year</div>
                      <div className="text-sm text-muted-foreground">Left on table</div>
                    </div>
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">⏰ 3 hours/month</div>
                      <div className="text-sm text-muted-foreground">Tracking manually</div>
                    </div>
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">📉 Points expire</div>
                      <div className="text-sm text-muted-foreground">Silently</div>
                    </div>
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">❓ No clue</div>
                      <div className="text-sm text-muted-foreground">What points worth</div>
                    </div>
                    <div className="pb-3">
                      <div className="font-medium mb-1">🤷 Forgot to</div>
                      <div className="text-sm text-muted-foreground">Activate 5% bonus</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-success/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4 text-center">WITH CardGenie</h3>
                  <div className="space-y-4">
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">✨ AI Recommends</div>
                      <div className="text-sm text-muted-foreground">Best card instantly</div>
                      <div className="text-sm text-success">Optimal 95% of time</div>
                    </div>
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">💰 $847/year</div>
                      <div className="text-sm text-muted-foreground">Captured & saved</div>
                    </div>
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">⏱️ 5 minutes/month</div>
                      <div className="text-sm text-muted-foreground">Automated tracking</div>
                    </div>
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">🔔 Alerted 30 days</div>
                      <div className="text-sm text-muted-foreground">Before expiration</div>
                    </div>
                    <div className="border-b border-border pb-3">
                      <div className="font-medium mb-1">📊 $2,847 total</div>
                      <div className="text-sm text-muted-foreground">Value at a glance</div>
                    </div>
                    <div className="pb-3">
                      <div className="font-medium mb-1">✅ Never miss</div>
                      <div className="text-sm text-muted-foreground">Auto-reminders</div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expiration Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  Never lose rewards value to expiration again
                </p>
                <div className="hidden group-hover:block text-sm text-muted-foreground space-y-1">
                  <div>• Monitors all programs 24/7</div>
                  <div>• Alerts at 30, 7, and 1 day before expiration</div>
                  <div>• Shows value at risk ($340 United miles)</div>
                  <div>• Suggests actions to save points</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-glow transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
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
                <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
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
            Join thousands of smart cardholders who are capturing every dollar in rewards value.
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
          <p>&copy; 2024 CardGenie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
