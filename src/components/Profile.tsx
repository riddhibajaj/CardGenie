import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Target, 
  Plus,
  Edit,
  Calendar,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Gift
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUser, mockCards, mockGoals, mockLoyaltyAccounts } from "@/data/mockData";

const Profile = () => {
  const navigate = useNavigate();

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Profile & Settings</h1>
                <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Programs</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={mockUser.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="email" defaultValue={mockUser.email} className="pl-10" />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="phone" defaultValue={mockUser.phone} className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="location" defaultValue={mockUser.location} className="pl-10" />
                        </div>
                      </div>
                    </div>
                    <Button className="bg-gradient-primary">Save Changes</Button>
                  </CardContent>
                </Card>

                <Card id="rewards-goals">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Rewards Goals</CardTitle>
                        <CardDescription>Track your redemption goals</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockGoals.map((goal) => {
                      const progress = (goal.currentValue / goal.targetValue) * 100;
                      const daysRemaining = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <div key={goal.id} className="p-4 rounded-lg border border-border">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                                <Target className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{goal.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {formatCurrency(goal.currentValue)} of {formatCurrency(goal.targetValue)}
                                </p>
                              </div>
                            </div>
                            <Badge className="bg-gradient-primary">
                              {Math.round(progress)}%
                            </Badge>
                          </div>
                          <Progress value={progress} className="h-2 mb-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <Badge variant="outline" className="capitalize">
                              {goal.type.replace('_', ' ')}
                            </Badge>
                            <span>
                              <Calendar className="inline h-3 w-3 mr-1" />
                              {daysRemaining} days left
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Button 
                  variant="outline" 
                  className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => navigate("/")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>

            </div>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Linked Credit Cards</CardTitle>
                    <CardDescription>Manage your connected credit cards</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCards.map((card) => (
                  <div key={card.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-16 w-24 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-mono text-sm`}>
                          •••• {card.lastFour}
                        </div>
                        <div>
                          <p className="font-semibold">{card.name}</p>
                          <p className="text-sm text-muted-foreground">{card.issuer} • {card.network}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Credit Limit</p>
                        <p className="font-semibold">{formatCurrency(card.creditLimit)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Balance</p>
                        <p className="font-semibold">{formatCurrency(card.currentBalance)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Utilization</p>
                        <p className="font-semibold">
                          {Math.round((card.currentBalance / card.creditLimit) * 100)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress 
                        value={(card.currentBalance / card.creditLimit) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {card.categories.map((category, idx) => (
                        <Badge key={idx} variant="secondary">
                          {category.name}: {category.rate}x
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loyalty Programs Tab */}
          <TabsContent value="loyalty" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Linked Loyalty Programs</CardTitle>
                    <CardDescription>Manage your connected loyalty accounts</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Loyalty Program
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockLoyaltyAccounts.map((account) => (
                  <div key={account.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-gradient-accent flex items-center justify-center text-3xl">
                          {account.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{account.program}</p>
                          <p className="text-sm text-muted-foreground">
                            {account.balance.toLocaleString()} points
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Estimated Value</p>
                        <p className="font-semibold text-lg">{formatCurrency(account.valueCents)}</p>
                      </div>
                      {account.expirationDate ? (
                        <div>
                          <p className="text-muted-foreground">Expiration</p>
                          <div className="flex items-center gap-1">
                            <Badge variant={account.daysUntilExpiration && account.daysUntilExpiration < 120 ? "destructive" : "secondary"}>
                              {account.daysUntilExpiration} days
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-muted-foreground">Expiration</p>
                          <p className="font-semibold text-sm flex items-center gap-1">
                            <Gift className="h-4 w-4 text-green-500" />
                            Never expires
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
};

export default Profile;