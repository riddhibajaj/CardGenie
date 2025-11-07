import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { mockCards } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface PlaidConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCardsConnected: (cardIds: string[]) => void;
  connectedCardIds: string[];
}

type Bank = {
  id: string;
  name: string;
  icon: string;
  subtitle: string;
  cardIds: string[];
};

const banks: Bank[] = [
  {
    id: "sound",
    name: "Sound Credit Union",
    icon: "🏦",
    subtitle: "Connect your Sound CU credit cards",
    cardIds: ["1", "2"],
  },
  {
    id: "chase",
    name: "Chase",
    icon: "🏦",
    subtitle: "Connect your Chase credit cards",
    cardIds: ["3"],
  },
  {
    id: "citi",
    name: "Citi",
    icon: "🏦",
    subtitle: "Connect your Citi credit cards",
    cardIds: ["4"],
  },
];

type Step = "bank-selection" | "account-selection" | "loading" | "success";

export const PlaidConnectModal = ({ open, onOpenChange, onCardsConnected, connectedCardIds }: PlaidConnectModalProps) => {
  const [step, setStep] = useState<Step>("bank-selection");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    // Pre-select all cards that aren't already connected
    const availableCards = bank.cardIds.filter(id => !connectedCardIds.includes(id));
    setSelectedCards(availableCards);
    setStep("account-selection");
  };

  const handleBack = () => {
    setStep("bank-selection");
    setSelectedBank(null);
    setSelectedCards([]);
  };

  const handleConnect = () => {
    setStep("loading");
    setLoadingProgress(0);

    // Simulate loading with progress
    const messages = [
      "Securely connecting...",
      "Verifying credentials...",
      "Fetching account details...",
      "Analyzing rewards data..."
    ];
    
    let currentMessage = 0;
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("success");
          return 100;
        }
        
        // Update message every 25%
        if (prev % 25 === 0 && currentMessage < messages.length - 1) {
          currentMessage++;
        }
        
        return prev + 2;
      });
    }, 40); // 2000ms total (40ms * 50 steps)
  };

  const handleSuccess = () => {
    onCardsConnected(selectedCards);
    toast({
      title: "Successfully Connected!",
      description: `Added ${selectedCards.length} card(s) from ${selectedBank?.name}`,
    });
    
    // Reset state
    setStep("bank-selection");
    setSelectedBank(null);
    setSelectedCards([]);
    onOpenChange(false);
  };

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const getSelectedBankCards = () => {
    if (!selectedBank) return [];
    return mockCards.filter(card => selectedBank.cardIds.includes(card.id));
  };

  const getAvailableCardsCount = (bank: Bank) => {
    return bank.cardIds.filter(id => !connectedCardIds.includes(id)).length;
  };

  const toggleCardSelection = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const renderBankSelection = () => (
    <>
      <DialogHeader>
        <DialogTitle>Connect Your Bank</DialogTitle>
        <DialogDescription>Securely link your credit cards via Plaid</DialogDescription>
      </DialogHeader>
      <div className="space-y-3 mt-4">
        {banks.map((bank) => {
          const availableCount = getAvailableCardsCount(bank);
          const isFullyConnected = availableCount === 0;
          
          return (
            <button
              key={bank.id}
              onClick={() => !isFullyConnected && handleBankSelect(bank)}
              disabled={isFullyConnected}
              className={`w-full p-4 rounded-lg border border-border text-left transition-all ${
                isFullyConnected 
                  ? 'opacity-50 cursor-not-allowed bg-muted/30' 
                  : 'hover:border-accent hover:bg-accent/5 hover:shadow-glow'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{bank.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{bank.name}</h3>
                    {isFullyConnected && (
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{bank.subtitle}</p>
                  {!isFullyConnected && (
                    <p className="text-xs text-accent mt-1">
                      {availableCount} credit card{availableCount !== 1 ? 's' : ''} available
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );

  const renderAccountSelection = () => {
    const bankCards = getSelectedBankCards();
    
    return (
      <>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <DialogTitle>{selectedBank?.name}</DialogTitle>
              <DialogDescription>Select credit cards to connect</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {bankCards.map((card) => {
            const isAlreadyConnected = connectedCardIds.includes(card.id);
            const isSelected = selectedCards.includes(card.id);
            const utilization = Math.round((card.currentBalance / card.creditLimit) * 100);
            
            return (
              <div
                key={card.id}
                className={`p-4 rounded-lg border transition-all ${
                  isAlreadyConnected 
                    ? 'border-border bg-muted/30 opacity-60'
                    : isSelected
                    ? 'border-accent bg-accent/5 shadow-glow'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {!isAlreadyConnected && (
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleCardSelection(card.id)}
                      className="mt-1"
                    />
                  )}
                  <div className={`h-12 w-20 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-mono text-xs flex-shrink-0`}>
                    •••• {card.lastFour}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{card.name}</p>
                      {isAlreadyConnected && (
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          <Check className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Last 4: ••••{card.lastFour}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Balance: {formatCurrency(card.currentBalance)} of {formatCurrency(card.creditLimit)} limit ({utilization}% utilization)
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={handleBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleConnect}
            disabled={selectedCards.length === 0}
            className="flex-1 bg-gradient-primary"
          >
            Connect {selectedCards.length} Card{selectedCards.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </>
    );
  };

  const renderLoading = () => {
    const messages = [
      "Securely connecting...",
      "Verifying credentials...",
      "Fetching account details...",
      "Analyzing rewards data..."
    ];
    const messageIndex = Math.min(Math.floor(loadingProgress / 25), messages.length - 1);
    
    return (
      <div className="text-center py-8">
        <DialogTitle className="mb-6">Connecting to {selectedBank?.name}...</DialogTitle>
        <div className="flex justify-center mb-4">
          <Loader2 className="h-16 w-16 text-accent animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          {messages[messageIndex]}
        </p>
        <div className="mt-6 bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    const addedCards = mockCards.filter(card => selectedCards.includes(card.id));
    
    return (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-accent">
            <Check className="h-6 w-6" />
            Successfully Connected!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-sm">
            Added {selectedCards.length} card{selectedCards.length !== 1 ? 's' : ''} from {selectedBank?.name}:
          </p>
          <div className="space-y-2">
            {addedCards.map((card) => (
              <div key={card.id} className="flex items-center gap-2 p-3 rounded-lg bg-accent/5 border border-accent/20">
                <Check className="h-4 w-4 text-accent" />
                <span className="font-medium">{card.name}</span>
                <span className="text-muted-foreground text-sm">(••{card.lastFour})</span>
              </div>
            ))}
          </div>

          <Button onClick={handleSuccess} className="w-full bg-gradient-primary">
            View My Cards
          </Button>
        </div>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        {step === "bank-selection" && renderBankSelection()}
        {step === "account-selection" && renderAccountSelection()}
        {step === "loading" && renderLoading()}
        {step === "success" && renderSuccess()}
      </DialogContent>
    </Dialog>
  );
};
