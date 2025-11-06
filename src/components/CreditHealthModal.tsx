import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { mockCards } from "@/data/mockData";

interface CreditHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  creditScore: number;
  portfolioUtilization: number;
}

const CreditHealthModal = ({ isOpen, onClose, creditScore, portfolioUtilization }: CreditHealthModalProps) => {
  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const getCreditScoreStatus = (score: number) => {
    if (score >= 740) return { label: "Excellent", color: "text-green-600" };
    if (score >= 670) return { label: "Good", color: "text-blue-600" };
    if (score >= 580) return { label: "Fair", color: "text-yellow-600" };
    return { label: "Poor", color: "text-red-600" };
  };

  const status = getCreditScoreStatus(creditScore);

  const tips = [
    {
      icon: portfolioUtilization < 30 ? CheckCircle2 : AlertTriangle,
      color: portfolioUtilization < 30 ? "text-green-600" : "text-yellow-600",
      title: "Credit Utilization",
      description: portfolioUtilization < 30 
        ? "Great! Keep your utilization below 30% to maintain a healthy score."
        : "Try to reduce your utilization below 30% for better credit health.",
      status: portfolioUtilization < 30 ? "Good" : "Needs Improvement"
    },
    {
      icon: CheckCircle2,
      color: "text-green-600",
      title: "Payment History",
      description: "No missed payments detected. Keep making on-time payments to build positive history.",
      status: "Excellent"
    },
    {
      icon: TrendingUp,
      color: "text-blue-600",
      title: "Credit Mix",
      description: "Having multiple types of credit accounts can positively impact your score over time.",
      status: "Good"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Credit Health Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Credit Score Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold ${status.color} mb-2`}>{creditScore}</div>
                <Badge variant="secondary" className="text-lg px-4 py-1">{status.label}</Badge>
                <p className="text-sm text-muted-foreground mt-2">Updated Nov 5, 2024</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Poor</p>
                  <p className="font-medium">300-579</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fair</p>
                  <p className="font-medium">580-669</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Good</p>
                  <p className="font-medium">670-739</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Very Good</p>
                  <p className="font-medium">740-799</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Excellent</p>
                  <p className="font-medium">800-850</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Utilization by Card */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Utilization by Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCards.map((card) => {
                const utilization = (card.currentBalance / card.creditLimit) * 100;
                return (
                  <div key={card.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{card.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(card.currentBalance)} of {formatCurrency(card.creditLimit)}
                        </p>
                      </div>
                      <Badge variant={utilization < 30 ? "secondary" : "destructive"}>
                        {Math.round(utilization)}%
                      </Badge>
                    </div>
                    <Progress value={utilization} className="h-2" />
                  </div>
                );
              })}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Overall Utilization</p>
                  <Badge variant={portfolioUtilization < 30 ? "secondary" : "destructive"}>
                    {portfolioUtilization}%
                  </Badge>
                </div>
                <Progress value={portfolioUtilization} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Personalized Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tips.map((tip, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                  <tip.icon className={`h-6 w-6 ${tip.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{tip.title}</p>
                      <Badge variant="outline">{tip.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditHealthModal;
