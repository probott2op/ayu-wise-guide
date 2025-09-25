import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Heart, Leaf } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatProps {
  className?: string;
}

export const AIChat: React.FC<AIChatProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! I am AyuVaidya, your personal Ayurvedic wellness guide. I\'m here to help you discover your unique constitution, balance your doshas, and create a personalized path to optimal health through the ancient wisdom of Ayurveda. How can I support your wellness journey today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke('ai', {
        body: { message: userMessage.content }
      });

      if (functionError) {
        throw new Error(functionError.message || "Failed to get AI response");
      }

      const aiResponse = functionData?.response;

      if (aiResponse) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing some difficulty connecting right now. Please try again in a moment. In the meantime, remember that balance in all things is the key to wellness.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className={cn("flex flex-col h-[600px] shadow-strong", className)}>
      <div className="flex items-center gap-3 p-6 border-b bg-gradient-subtle rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-soft">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AyuVaidya</h3>
            <p className="text-sm text-muted-foreground">Your Ayurvedic AI Guide</p>
          </div>
        </div>
        <div className="ml-auto flex gap-1">
          <Leaf className="w-4 h-4 text-vata animate-float" />
          <Heart className="w-4 h-4 text-pitta animate-float" style={{ animationDelay: '1s' }} />
          <Sparkles className="w-4 h-4 text-kapha animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex animate-scale-in",
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-4 shadow-soft",
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-card-foreground border'
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p className={cn(
                  "text-xs mt-2 opacity-70",
                  message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                )}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-scale-in">
              <div className="bg-card text-card-foreground border rounded-lg p-4 shadow-soft">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-vata rounded-full animate-pulse-soft"></div>
                  <div className="w-2 h-2 bg-pitta rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-kapha rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-sm text-muted-foreground ml-2">AyuVaidya is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 border-t bg-gradient-subtle">
        <div className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your constitution, diet, lifestyle, or any health concerns..."
            className="flex-1 min-h-[40px] max-h-32 resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            variant="ayurvedic"
            size="icon"
            className="h-10 w-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Share your symptoms, lifestyle, or goals for personalized Ayurvedic guidance
        </p>
      </div>
    </Card>
  );
};