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
}

const ChatAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockChatHistory);
  const [input, setInput] = useState("");

  const quickPrompts = [
    "Which card should I use for groceries?",
    "Show me my expiring points",
    "How can I maximize travel rewards?",
    "What's my best cashback card?",
  ];

  const getAIResponse = (userInput: string): { response: string; followUp: string } => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("groceries") || lowerInput.includes("grocery")) {
      return {
        response: "For grocery purchases, your Chase Freedom Flex is currently your best option! It offers 3% cashback on dining and drugstores (which often includes grocery stores in rotating categories), plus it has no annual fee. With your current spending of $600 this month, you've already earned 2,100 points worth $21. I recommend using this card for groceries to maximize your rewards.",
        followUp: "Would you like me to show you which card is best for dining purchases?"
      };
    }
    
    if (lowerInput.includes("expiring") || lowerInput.includes("expire")) {
      return {
        response: "You have rewards expiring soon! Your Hilton Honors points (58,000 points worth $290) will expire in 45 days. I recommend booking a hotel stay or transferring points to keep them active. Additionally, keep an eye on your Chase Freedom Flex rotating categories as those bonuses reset quarterly.",
        followUp: "Would you like recommendations on how to use your Hilton points before they expire?"
      };
    }
    
    if (lowerInput.includes("travel")) {
      return {
        response: "For travel rewards, you're in a great position! Your United MileagePlus has 45,000 miles (worth ~$675) and World of Hyatt has 32,000 points (worth ~$640). Combined, that's over $1,300 in travel value! Your Chase Freedom Flex also earns bonus points on travel purchases. Consider booking flights with United and hotels with Hyatt to maximize your existing points.",
        followUp: "Would you like help planning a trip using your points?"
      };
    }
    
    if (lowerInput.includes("cashback") || lowerInput.includes("cash back")) {
      return {
        response: "Your best cashback card is the Citi Double Cash! It offers a flat 2% cashback on all purchases (1% when you buy, 1% when you pay). You've earned $8 this month with $400 in spending. This is perfect for purchases that don't fall into bonus categories. Your Sound Credit Union Cashback also gives you 1.5% flat cashback with no annual fee.",
        followUp: "Would you like tips on optimizing your cashback across all your cards?"
      };
    }

    if (lowerInput.includes("dining")) {
      return {
        response: "For dining, your Chase Freedom Flex is excellent with 3% cashback on dining purchases. With your current monthly spend, you're maximizing rewards well. Keep using this card at restaurants to earn the highest return!",
        followUp: "Would you like to see your total dining rewards earned this year?"
      };
    }

    if (lowerInput.includes("hilton") || lowerInput.includes("hotel")) {
      return {
        response: "Your Hilton Honors points are expiring in 45 days! With 58,000 points (~$290 value), you can book several free nights at mid-tier Hilton properties or use them toward a luxury stay. Book soon to prevent expiration!",
        followUp: "Would you like me to suggest specific Hilton properties where you can maximize your points?"
      };
    }

    if (lowerInput.includes("optimize") || lowerInput.includes("trip")) {
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

    // Simulate AI response
    setTimeout(() => {
      const { response, followUp } = getAIResponse(currentInput);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);

      // Add follow-up question after a short delay
      setTimeout(() => {
        const followUpMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: followUp,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, followUpMessage]);
      }, 800);
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
                <Card className={`max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-gradient-primary text-white border-0' 
                    : 'bg-card'
                }`}>
                  <CardContent className="p-4">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </CardContent>
                </Card>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-transparent text-white">RB</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
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
