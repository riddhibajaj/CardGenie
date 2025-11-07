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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Gift,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUser, mockCards, mockGoals, mockLoyaltyAccounts } from "@/data/mockData";
import { PlaidConnectModal } from "./PlaidConnectModal";
import { AwardWalletConnectModal } from "./AwardWalletConnectModal";
import { useToast } from "@/hooks/use-toast";
import { useCards } from "@/context/CardsContext";
import { useLoyalty } from "@/context/LoyaltyContext";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connectedCardIds, addCards, removeCard, getConnectedCards } = useCards();
  const { connectedLoyaltyIds, addLoyaltyPrograms, removeLoyaltyProgram, getConnectedLoyaltyPrograms } = useLoyalty();
  const [plaidModalOpen, setPlaidModalOpen] = useState(false);
  const [awardWalletModalOpen, setAwardWalletModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [programToDelete, setProgramToDelete] = useState<string | null>(null);

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleCardsConnected = (newCardIds: string[]) => {
    addCards(newCardIds);
  };

  const handleProgramsConnected = (newProgramIds: string[]) => {
    addLoyaltyPrograms(newProgramIds);
    toast({
      title: `${newProgramIds.length} program${newProgramIds.length !== 1 ? 's' : ''} added successfully!`,
      description: "Your loyalty programs have been connected.",
    });
  };

  const handleDeleteCard = () => {
    if (cardToDelete) {
      const cardName = mockCards.find(c => c.id === cardToDelete)?.name || "Card";
      removeCard(cardToDelete);
      toast({
        title: "Card removed successfully",
        description: `${cardName} has been removed from your portfolio.`,
      });
      setCardToDelete(null);
    }
  };

  const handleDeleteProgram = () => {
    if (programToDelete) {
      const programName = mockLoyaltyAccounts.find(p => p.id === programToDelete)?.program || "Program";
      removeLoyaltyProgram(programToDelete);
      toast({
        title: "Program removed successfully",
        description: `${programName} has been removed from your portfolio.`,
      });
      setProgramToDelete(null);
    }
  };

  const displayedCards = getConnectedCards();
  const displayedLoyaltyPrograms = getConnectedLoyaltyPrograms();

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
                <h1 className="text-xl font-bold">Profile</h1>
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
                      <Button size="sm" className="bg-gradient-primary">
                        <Target className="mr-2 h-4 w-4" />
                        Add Goal
                      </Button>
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
                  <Button 
                    className="bg-gradient-primary" 
                    onClick={() => setPlaidModalOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {displayedCards.map((card) => (
                  <div key={card.id} className="p-4 rounded-lg border border-border relative group">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setCardToDelete(card.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                  <Button 
                    className="bg-gradient-primary"
                    onClick={() => setAwardWalletModalOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Loyalty Program
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {displayedLoyaltyPrograms.map((account) => (
                  <div key={account.id} className="p-4 rounded-lg border border-border relative group">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setProgramToDelete(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

      <PlaidConnectModal
        open={plaidModalOpen}
        onOpenChange={setPlaidModalOpen}
        onCardsConnected={handleCardsConnected}
        connectedCardIds={connectedCardIds}
      />

      <AwardWalletConnectModal
        open={awardWalletModalOpen}
        onOpenChange={setAwardWalletModalOpen}
        onProgramsConnected={handleProgramsConnected}
        connectedLoyaltyIds={connectedLoyaltyIds}
      />

      <AlertDialog open={!!cardToDelete} onOpenChange={() => setCardToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <span className="text-destructive">⚠️</span>
              Remove Card?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              {cardToDelete && (
                <>
                  <p>Are you sure you want to remove:</p>
                  <p className="font-semibold text-foreground">
                    {mockCards.find(c => c.id === cardToDelete)?.name} (••{mockCards.find(c => c.id === cardToDelete)?.lastFour})
                  </p>
                  <p className="text-sm">This will:</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Remove card from your portfolio</li>
                    <li>Delete all transaction history</li>
                    <li>Update optimization calculations</li>
                    <li>Remove from card analysis</li>
                  </ul>
                  <p className="font-semibold text-destructive">This action cannot be undone.</p>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCard}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Card
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!programToDelete} onOpenChange={() => setProgramToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <span className="text-destructive">⚠️</span>
              Remove Loyalty Program?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              {programToDelete && (
                <>
                  <p>Are you sure you want to remove:</p>
                  <p className="font-semibold text-foreground">
                    {mockLoyaltyAccounts.find(p => p.id === programToDelete)?.program} ({mockLoyaltyAccounts.find(p => p.id === programToDelete)?.balance.toLocaleString()} points)
                  </p>
                  <p className="text-sm">This will:</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Remove program from your portfolio</li>
                    <li>Stop tracking this account</li>
                    <li>Remove from dashboard and portfolio value</li>
                    <li>Remove expiration alerts for this program</li>
                  </ul>
                  <p className="text-sm">You can reconnect anytime via AwardWallet.</p>
                  <p className="font-semibold text-destructive">This action cannot be undone.</p>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProgram}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Program
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;