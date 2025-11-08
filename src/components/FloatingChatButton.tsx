import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FloatingChatButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-popover text-popover-foreground px-4 py-2 rounded-lg shadow-lg border border-border whitespace-nowrap animate-fade-in">
          <p className="text-sm font-medium">Ask Genie</p>
        </div>
        <Button
          onClick={() => navigate("/chat")}
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-accent shadow-glow-accent hover:shadow-xl transition-all animate-pulse hover:animate-none hover:scale-110"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default FloatingChatButton;
