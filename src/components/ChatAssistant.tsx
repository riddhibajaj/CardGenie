import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockChatHistory } from "@/data/mockData";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isOptions?: boolean;
  options?: string[];
}

const ChatAssistant = () => {
  const navigate = useNavigate();
  const initialMessage: Message = {
    id: "initial",
    role: "assistant",
    content: "Hi Riddhi! 👋 I'm your AI assistant. I can help you maximize your credit card rewards, track expiring points, and recommend the best card for every purchase. How can I help you today?",
    timestamp: new Date().toISOString()
  };
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const quickPrompts = [
    "Which card should I use for groceries?",
    "Show me my expiring points",
    "How can I maximize travel rewards?",
    "What's my best cashback card?",
  ];

  const getAIResponse = (userInput: string): { response: string; followUp: string | null; options?: string[] } => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("groceries") || lowerInput.includes("grocery")) {
      return {
        response: "For grocery purchases, your Chase Freedom Flex is currently your best option! It offers 3% cashback on dining and drugstores (which often includes grocery stores in rotating categories), plus it has no annual fee. With your current spending of $600 this month, you've already earned 2,100 points worth $21. I recommend using this card for groceries to maximize your rewards.",
        followUp: "Would you like me to show you which card is best for dining purchases?",
        options: ["Yes, show me the best card for dining", "No, I'm good for now"]
      };
    }
    
    if (lowerInput.includes("best for dining") || lowerInput.includes("card is best for dining") || lowerInput.includes("yes") && messages[messages.length - 1]?.content.includes("dining purchases")) {
      return {
        response: "For dining, your Chase Freedom Flex is excellent with 3% cashback on dining purchases! You've already earned $21 worth of rewards this month using it. This card works at all restaurants, cafes, and food delivery services. Keep using it to maximize your dining rewards!",
        followUp: null
      };
    }
    
    if (lowerInput.includes("expiring") || lowerInput.includes("expire")) {
      return {
        response: "You have rewards expiring soon! Your Hilton Honors points (58,000 points worth $290) will expire in 45 days. I recommend booking a hotel stay or transferring points to keep them active. Additionally, keep an eye on your Chase Freedom Flex rotating categories as those bonuses reset quarterly.",
        followUp: "Would you like recommendations on how to use your Hilton points before they expire?",
        options: ["Yes, give me recommendations", "No thanks"]
      };
    }
    
    if (lowerInput.includes("recommendations on how to use") || lowerInput.includes("use your hilton") || lowerInput.includes("yes") && messages[messages.length - 1]?.content.includes("Hilton points")) {
      return {
        response: "Great question! With 58,000 Hilton points, you have several excellent options: 1) Book 3-4 nights at mid-tier Hilton properties (Hampton Inn, Hilton Garden Inn), 2) Use them for a weekend luxury stay at a Conrad or Waldorf Astoria, 3) Transfer to airline partners if available, or 4) Redeem for experiences through Hilton Honors. I recommend booking within the next 30 days to ensure your points don't expire!",
        followUp: null
      };
    }
    
    if (lowerInput.includes("travel")) {
      return {
        response: "For travel rewards, you're in a great position! Your United MileagePlus has 45,000 miles (worth ~$675) and World of Hyatt has 32,000 points (worth ~$640). Combined, that's over $1,300 in travel value! Your Chase Freedom Flex also earns bonus points on travel purchases. Consider booking flights with United and hotels with Hyatt to maximize your existing points.",
        followUp: "Would you like help planning a trip using your points?",
        options: ["Yes, help me plan a trip", "Not right now"]
      };
    }
    
    if (lowerInput.includes("help planning") || lowerInput.includes("plan") && lowerInput.includes("trip") || lowerInput.includes("yes") && messages[messages.length - 1]?.content.includes("planning a trip")) {
      return {
        response: "Perfect! Here's what you can do with your points: Use your 45,000 United miles for round-trip flights to Hawaii, Caribbean, or Mexico, then use 32,000 Hyatt points for 4-5 nights at mid-tier properties. This combination gives you a complete vacation valued at $1,300+! Popular destinations include: Maui (Hyatt Regency), Cancun (Hyatt Ziva), or Puerto Rico (Hyatt House). Book 2-3 months in advance for best availability.",
        followUp: null
      };
    }
    
    if (lowerInput.includes("cashback") || lowerInput.includes("cash back")) {
      return {
        response: "Your best cashback card is the Citi Double Cash! It offers a flat 2% cashback on all purchases (1% when you buy, 1% when you pay). You've earned $8 this month with $400 in spending. This is perfect for purchases that don't fall into bonus categories. Your Sound Credit Union Cashback also gives you 1.5% flat cashback with no annual fee.",
        followUp: "Would you like tips on optimizing your cashback across all your cards?",
        options: ["Yes, give me optimization tips", "No, I'm all set"]
      };
    }

    if (lowerInput.includes("tips on optimizing") || lowerInput.includes("optimize") && lowerInput.includes("cashback") || lowerInput.includes("yes") && messages[messages.length - 1]?.content.includes("optimizing your cashback")) {
      return {
        response: "Here's your optimal cashback strategy: 1) Use Chase Freedom Flex for dining & groceries (3% back = $21/month on $600 spend), 2) Use Citi Double Cash for everything else (2% back = $8/month on $400 spend), 3) Use Sound Cashback for any purchases where you need backup (1.5% flat). Combined, you're earning about $34.70/month in rewards. To maximize further, watch for Chase Freedom Flex rotating 5% categories!",
        followUp: null
      };
    }

    if (lowerInput.includes("dining")) {
      return {
        response: "For dining, your Chase Freedom Flex is excellent with 3% cashback on dining purchases. With your current monthly spend, you're maximizing rewards well. Keep using this card at restaurants to earn the highest return!",
        followUp: "Would you like to see your total dining rewards earned this year?"
      };
    }
    
    if (lowerInput.includes("total dining rewards") || lowerInput.includes("earned this year")) {
      return {
        response: "Based on your current monthly dining spend of ~$600, you've earned approximately $252 in dining rewards this year with your Chase Freedom Flex (assuming consistent spending over 12 months). That's enough to cover several nice dinners! Keep up the great work using the right card for each purchase.",
        followUp: null
      };
    }

    if (lowerInput.includes("hilton") || lowerInput.includes("hotel")) {
      return {
        response: "Your Hilton Honors points are expiring in 45 days! With 58,000 points (~$290 value), you can book several free nights at mid-tier Hilton properties or use them toward a luxury stay. Book soon to prevent expiration!",
        followUp: "Would you like me to suggest specific Hilton properties where you can maximize your points?"
      };
    }
    
    if (lowerInput.includes("suggest specific hilton") || lowerInput.includes("hilton properties")) {
      return {
        response: "Here are great Hilton redemption options with 58,000 points: 1) Hilton Garden Inn properties (12,000-15,000 pts/night = 3-4 nights), 2) Hilton hotels in major cities (20,000 pts/night = 2-3 nights), 3) Conrad or Waldorf Astoria weekend stays (40,000-50,000 pts = luxury experience), or 4) Hampton Inn extended stays (10,000 pts/night = 5+ nights). I recommend booking mid-tier properties to maximize nights stayed!",
        followUp: null
      };
    }

    if (lowerInput.includes("destination") || lowerInput.includes("hawaii") || lowerInput.includes("mexico") || lowerInput.includes("europe")) {
      return {
        response: "Based on your points, I can help you plan an amazing trip! You could combine your United miles (45,000) for flights and Hyatt points (32,000) for hotels. This gives you over $1,300 in travel value. Popular destinations within reach include Hawaii, Mexico, or several European cities.",
        followUp: "Which destination interests you most for using your points?"
      };
    }

    if (lowerInput.includes("tips") || lowerInput.includes("help")) {
      return {
        response: "Here are my top tips for you: 1) Use Chase Freedom Flex for dining & groceries (3% back), 2) Use Citi Double Cash for everything else (2% flat), 3) Book your Hilton stay in the next 45 days to save your points, and 4) Consider transferring Chase points to travel partners for maximum value.",
        followUp: "Would you like a detailed breakdown of your monthly rewards potential?"
      };
    }
    
    if (lowerInput.includes("breakdown") || lowerInput.includes("monthly rewards potential")) {
      return {
        response: "Here's your monthly rewards breakdown: Chase Freedom Flex ($600 dining/groceries at 3%) = $21, Citi Double Cash ($400 at 2%) = $8, Sound Cashback ($380 at 1.5%) = $5.70, Sound Rewards ($750 at 1%) = $7.50. Total monthly rewards: $42.20, or $506.40 annually! You're doing great. To increase this, focus spending on your highest-earning categories and watch for Chase Freedom Flex rotating bonuses.",
        followUp: null
      };
    }
    
    return {
      response: "I can help you optimize your credit card rewards! I have access to all your cards, loyalty programs, and spending patterns. Ask me about which card to use for specific purchases, your expiring points, or how to maximize travel rewards.",
      followUp: "What would you like to know about your rewards?"
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    // Show thinking animation
    setIsThinking(true);

    // Simulate AI response with thinking delay
    setTimeout(() => {
      setIsThinking(false);
      const { response, followUp, options } = getAIResponse(currentInput);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);

      // Add follow-up question with options after a short delay
      if (followUp) {
        setTimeout(() => {
          const followUpMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: followUp,
            timestamp: new Date().toISOString(),
            isOptions: !!options,
            options: options
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 800);
      }
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Ask me anything about your rewards</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 pb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 bg-gradient-accent">
                    <AvatarFallback className="bg-transparent text-white">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="max-w-[80%] space-y-2">
                  <Card className={`${
                    message.role === 'user' 
                      ? 'bg-gradient-primary text-white border-0' 
                      : 'bg-card'
                  }`}>
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </CardContent>
                  </Card>
                  {message.isOptions && message.options && (
                    <div className="flex flex-col gap-2">
                      {message.options.map((option, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left"
                          onClick={() => {
                            setInput(option);
                            handleSend();
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-transparent text-white">RB</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isThinking && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-gradient-accent">
                  <AvatarFallback className="bg-transparent text-white">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <Card className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickPrompts.map((prompt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start text-left h-auto py-3"
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">{prompt}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="pt-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your rewards..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gradient-primary"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            AI responses are based on your card portfolio and spending patterns
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
