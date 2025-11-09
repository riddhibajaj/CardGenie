import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home Page
        </Button>
        <Card className="w-full shadow-xl animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-accent flex items-center justify-center animate-pulse">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Welcome to CardGenie</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Try the demo experience</p>
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="w-full bg-gradient-primary text-lg h-12 hover:scale-105 transition-transform duration-300"
            >
              Login as Riddhi
            </Button>
          </div>
          
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              This is a demo application for the HuskyHack
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              No real data is collected or stored.
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Login;
