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
  Settings, 
  Bell,
  Shield,
  Trash2,
  Plus,
  Edit,
  Calendar,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUser, mockCards, mockGoals } from "@/data/mockData";

const Profile = () => {
  const navigate = useNavigate();
  const [notificationSettings, setNotificationSettings] = useState({
    expirationAlerts: true,
    bonusCategories: true,
    weeklyReport: false,
    monthlyReport: true,
    recommendationAlerts: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    compactView: false,
    showCardImages: true,
  });

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
                          <Input id="phone" placeholder="+1 (555) 000-0000" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="location" placeholder="City, State" className="pl-10" />
                        </div>
                      </div>
                    </div>
                    <Button className="bg-gradient-primary">Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button variant="outline">
                      <Shield className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Account Stats */}
              <div className="space-y-6">
                <Card className="bg-gradient-accent text-white border-0">
                  <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-white/80 mb-1">Total Rewards Value</p>
                      <p className="text-2xl font-bold">{formatCurrency(mockUser.totalRewardsValue)}</p>
                    </div>
                    <Separator className="bg-white/20" />
                    <div>
                      <p className="text-sm text-white/80 mb-1">Credit Score</p>
                      <p className="text-2xl font-bold">{mockUser.creditScore}</p>
                    </div>
                    <Separator className="bg-white/20" />
                    <div>
                      <p className="text-sm text-white/80 mb-1">Optimization Score</p>
                      <p className="text-2xl font-bold">{mockUser.optimizationScore}%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full">
                      Export Account Data
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
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
                      <Button variant="outline" size="sm" onClick={() => navigate(`/card/${card.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
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

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Rewards Goals</CardTitle>
                    <CardDescription>Track and manage your redemption goals</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    New Goal
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockGoals.map((goal) => {
                  const progress = (goal.currentValue / goal.targetValue) * 100;
                  const daysRemaining = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={goal.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{goal.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(goal.currentValue)} of {formatCurrency(goal.targetValue)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-gradient-primary">
                            {Math.round(progress)}%
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {daysRemaining} days left
                          </p>
                        </div>
                      </div>
                      <Progress value={progress} className="h-3 mb-2" />
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline" className="capitalize">
                          {goal.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-muted-foreground">
                          Target: {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <CardTitle>Notification Preferences</CardTitle>
                  </div>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Points Expiration Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified when points are expiring</p>
                    </div>
                    <Switch
                      checked={notificationSettings.expirationAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, expirationAlerts: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Bonus Category Activations</p>
                      <p className="text-sm text-muted-foreground">Alerts for new bonus categories</p>
                    </div>
                    <Switch
                      checked={notificationSettings.bonusCategories}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, bonusCategories: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Summary Report</p>
                      <p className="text-sm text-muted-foreground">Weekly spending and rewards recap</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReport}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, weeklyReport: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Report</p>
                      <p className="text-sm text-muted-foreground">Monthly performance summary</p>
                    </div>
                    <Switch
                      checked={notificationSettings.monthlyReport}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, monthlyReport: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Card Recommendations</p>
                      <p className="text-sm text-muted-foreground">AI-powered optimization suggestions</p>
                    </div>
                    <Switch
                      checked={notificationSettings.recommendationAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, recommendationAlerts: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Display Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    <CardTitle>Display Preferences</CardTitle>
                  </div>
                  <CardDescription>Customize how CardGenie looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Use dark color scheme</p>
                    </div>
                    <Switch
                      checked={displaySettings.darkMode}
                      onCheckedChange={(checked) =>
                        setDisplaySettings({ ...displaySettings, darkMode: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-muted-foreground">Show more content on screen</p>
                    </div>
                    <Switch
                      checked={displaySettings.compactView}
                      onCheckedChange={(checked) =>
                        setDisplaySettings({ ...displaySettings, compactView: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Card Images</p>
                      <p className="text-sm text-muted-foreground">Display card visuals in lists</p>
                    </div>
                    <Switch
                      checked={displaySettings.showCardImages}
                      onCheckedChange={(checked) =>
                        setDisplaySettings({ ...displaySettings, showCardImages: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency Format</Label>
                    <select 
                      id="currency"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                    </select>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="pst">Pacific Time (PT)</option>
                      <option value="mst">Mountain Time (MT)</option>
                      <option value="cst">Central Time (CT)</option>
                      <option value="est">Eastern Time (ET)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;