import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Check, Plane, Hotel, Building2, ShoppingCart } from "lucide-react";
import { mockLoyaltyAccounts } from "@/data/mockData";

interface AwardWalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProgramsConnected: (programIds: string[]) => void;
  connectedLoyaltyIds: string[];
}

type FlowStep = "intro" | "selection" | "loading" | "success";

const popularLogos = ["🏨", "✈️", "🏢", "💳", "🛒"];

export const AwardWalletConnectModal = ({
  open,
  onOpenChange,
  onProgramsConnected,
  connectedLoyaltyIds,
}: AwardWalletConnectModalProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("intro");
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Connecting to AwardWallet...");

  const availablePrograms = mockLoyaltyAccounts.filter(
    (program) => !connectedLoyaltyIds.includes(program.id)
  );

  useEffect(() => {
    if (open) {
      setCurrentStep("intro");
      setSelectedPrograms([]);
      setLoadingProgress(0);
    }
  }, [open]);

  useEffect(() => {
    if (currentStep === "selection") {
      // Pre-select all available programs
      setSelectedPrograms(availablePrograms.map(p => p.id));
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === "loading") {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setLoadingProgress(progress);

        if (progress <= 35) {
          setLoadingMessage("Authenticating...");
        } else if (progress <= 70) {
          setLoadingMessage("Syncing program data...");
        } else {
          setLoadingMessage("Fetching balances...");
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep("success"), 300);
        }
      }, 40);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleConnect = () => {
    setCurrentStep("selection");
  };

  const handleConfirmSelection = () => {
    if (selectedPrograms.length > 0) {
      setCurrentStep("loading");
    }
  };

  const handleSuccess = () => {
    onProgramsConnected(selectedPrograms);
    onOpenChange(false);
  };

  const toggleProgram = (programId: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId]
    );
  };

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const renderIntro = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Connect Loyalty Programs</DialogTitle>
        <DialogDescription className="text-base">
          Securely sync your points and miles via AwardWallet
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <div className="flex justify-center py-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-accent flex items-center justify-center">
            <span className="text-4xl">🏆</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm font-medium mb-2">✓ Track 700+ loyalty programs in one place</p>
            <p className="text-xs text-muted-foreground">
              Automatically sync balances, expiration dates, and elite status
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm font-medium mb-2">🔒 Secure & Private</p>
            <p className="text-xs text-muted-foreground">
              Your credentials are stored securely by AwardWallet
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2 py-2">
          {popularLogos.map((logo, idx) => (
            <div key={idx} className="h-12 w-12 rounded-lg bg-card border border-border flex items-center justify-center text-xl">
              {logo}
            </div>
          ))}
        </div>

        <Button onClick={handleConnect} className="w-full bg-gradient-primary text-lg py-6">
          Connect with AwardWallet
        </Button>
      </div>
    </>
  );

  const renderSelection = () => (
    <>
      <DialogHeader>
        <DialogTitle>Select Programs to Sync</DialogTitle>
        <DialogDescription>
          Choose which loyalty accounts to connect
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        {availablePrograms.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">All available programs are already connected!</p>
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Close
            </Button>
          </div>
        ) : (
          <>
            {availablePrograms.map((program) => {
              const isSelected = selectedPrograms.includes(program.id);

              return (
                <div
                  key={program.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => toggleProgram(program.id)}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleProgram(program.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                          <span className="text-xl">{program.icon}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{program.program}</p>
                          <Badge variant="secondary" className="text-xs">
                            Loyalty Program
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Track points, expiration dates, and elite status
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setCurrentStep("intro")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirmSelection}
                disabled={selectedPrograms.length === 0}
                className="flex-1 bg-gradient-primary"
              >
                Continue ({selectedPrograms.length})
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );

  const renderLoading = () => (
    <>
      <DialogHeader>
        <DialogTitle>Connecting to AwardWallet</DialogTitle>
        <DialogDescription>
          Please wait while we sync your loyalty programs
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-8">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-gradient-accent flex items-center justify-center animate-pulse">
            <span className="text-3xl">🔄</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{loadingMessage}</span>
            <span className="font-semibold">{Math.round(loadingProgress)}%</span>
          </div>
          <Progress value={loadingProgress} className="h-2" />
        </div>

        <div className="space-y-2">
          {selectedPrograms.slice(0, 4).map((programId) => {
            const program = mockLoyaltyAccounts.find((p) => p.id === programId);
            if (!program) return null;

            return (
              <div
                key={programId}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <span className="text-xl">{program.icon}</span>
                <span className="text-sm font-medium flex-1">{program.program}</span>
                <Check className="h-4 w-4 text-accent" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  const renderSuccess = () => {
    const addedPrograms = mockLoyaltyAccounts.filter((program) =>
      selectedPrograms.includes(program.id)
    );
    const totalValue = addedPrograms.reduce((sum, p) => sum + p.valueCents, 0);

    return (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            Successfully Connected!
          </DialogTitle>
          <DialogDescription>
            Your loyalty programs have been added
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm font-medium">Added {addedPrograms.length} loyalty program{addedPrograms.length !== 1 ? 's' : ''}:</p>

          <div className="space-y-2">
            {addedPrograms.map((program) => (
              <div
                key={program.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20"
              >
                <Check className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{program.program}</p>
                  <p className="text-xs text-muted-foreground">
                    {program.balance.toLocaleString()} points
                  </p>
                </div>
                <p className="font-semibold">{formatCurrency(program.valueCents)}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-gradient-subtle border border-accent/20">
            <p className="text-sm font-semibold mb-1">Total Value Added</p>
            <p className="text-2xl font-bold text-accent">
              {formatCurrency(totalValue)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Tracked across all programs
            </p>
          </div>

          <Button onClick={handleSuccess} className="w-full bg-gradient-primary">
            View My Programs
          </Button>
        </div>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {currentStep === "intro" && renderIntro()}
        {currentStep === "selection" && renderSelection()}
        {currentStep === "loading" && renderLoading()}
        {currentStep === "success" && renderSuccess()}
      </DialogContent>
    </Dialog>
  );
};
