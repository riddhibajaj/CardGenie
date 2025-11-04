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
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/dashboard")} className="bg-gradient-primary">
              Try Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 mb-8">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">AI-Powered Rewards Optimization</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Maximize Your Credit Card Rewards{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Effortlessly
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            AI-powered recommendations, real-time alerts, and portfolio insights
            to help you capture every dollar in rewards value
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-primary text-lg h-14 px-8 shadow-glow"
            >
              Try Demo as Sarah
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8">
              Get Started Free
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-success" />
              2-minute setup
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              Bank-level security
            </div>
          </div>
        </div>

        {/* Floating Stats Preview */}
        <div className="mt-16 max-w-5xl mx-auto relative">
          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">$2,847</div>
                <div className="text-sm text-muted-foreground">Portfolio Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">18%</div>
                <div className="text-sm text-muted-foreground">Utilization</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">$340</div>
                <div className="text-sm text-muted-foreground">Expiring Soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Win at Rewards</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop leaving money on the table. CardGenie helps you optimize every purchase.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Recommendations</h3>
                <p className="text-muted-foreground">
                  AI-powered card selector tells you exactly which card to use for every purchase to maximize rewards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Track All Programs</h3>
                <p className="text-muted-foreground">
                  Aggregate all your credit card rewards and loyalty points in one beautiful dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Never Miss Rewards</h3>
                <p className="text-muted-foreground">
                  Get alerts for expiring points, bonus opportunities, and optimal redemption timing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-destructive/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
              The Problem
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Americans Are Leaving $47 Billion on the Table
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Despite having rewards cards, most people aren't maximizing their value
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="text-5xl font-bold text-destructive mb-4">70%</div>
                <p className="text-muted-foreground">
                  of cardholders have unused rewards sitting in accounts
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="text-5xl font-bold text-warning mb-4">$800-$2K</div>
                <p className="text-muted-foreground">
                  in potential rewards value lost annually per household
                </p>
              </div>
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
