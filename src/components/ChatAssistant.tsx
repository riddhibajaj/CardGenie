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

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm analyzing your portfolio and rewards structure to provide the best recommendation. For grocery purchases, your Amex Gold Card offers 4X points at U.S. supermarkets (up to $25,000 per year, then 1X). This would give you the highest return compared to your other cards.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
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
                    <AvatarFallback className="bg-transparent text-white">SJ</AvatarFallback>
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
