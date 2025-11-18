import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Sparkles, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function FAQAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = async (questionText?: string) => {
    const textToSend = questionText || question;
    if (!textToSend.trim()) {
      toast({
        title: "Please enter a question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setFollowUpQuestions([]);
    
    // Add user message
    const userMessage: Message = { role: "user", content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");

    // Prepare assistant message placeholder
    const assistantMessageIndex = messages.length + 1;
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    abortControllerRef.current = new AbortController();

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/faq-assistant`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          question: textToSend,
          conversationId,
          sessionId
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to start stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);

              if (parsed.type === "content") {
                accumulatedContent += parsed.content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[assistantMessageIndex] = {
                    role: "assistant",
                    content: accumulatedContent
                  };
                  return newMessages;
                });
              } else if (parsed.type === "followups") {
                setFollowUpQuestions(parsed.questions || []);
                if (parsed.conversationId) {
                  setConversationId(parsed.conversationId);
                }
              }
            } catch (e) {
              console.error("Error parsing SSE:", e);
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Stream aborted');
        return;
      }

      console.error("Error asking question:", error);
      
      // Remove the empty assistant message on error
      setMessages(prev => prev.slice(0, -1));
      
      toast({
        title: "Error",
        description: "Failed to get answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleFollowUpClick = (question: string) => {
    handleAsk(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleAsk();
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setFollowUpQuestions([]);
    setConversationId(null);
  };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-slate-950/80 to-slate-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="h-6 w-6 text-primary" />
          </motion.div>
          <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI-Powered Assistant
          </h3>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNewConversation}
            className="text-xs"
          >
            New Chat
          </Button>
        )}
      </div>
      
      {messages.length === 0 && (
        <p className="mb-4 text-xs sm:text-sm text-slate-300">
          Ask anything about our services, projects, pricing, or workflow. Powered by advanced AI with real-time platform insights.
        </p>
      )}

      {/* Messages Container */}
      {messages.length > 0 && (
        <div className="mb-4 max-h-[400px] overflow-y-auto space-y-4 pr-2">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[85%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-800/50 border border-primary/20 text-slate-200"
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <User className="h-5 w-5 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Follow-up Questions */}
      {followUpQuestions.length > 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 space-y-2"
        >
          <p className="text-xs text-slate-400 font-medium">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {followUpQuestions.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleFollowUpClick(q)}
                className="text-xs bg-slate-800/30 border-primary/30 hover:bg-primary/20 hover:border-primary/50 text-left h-auto py-2 whitespace-normal"
              >
                {q}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="e.g., What's your typical project timeline?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1 bg-slate-900/50 border-primary/30 text-sm focus:border-primary"
        />
        <Button
          onClick={() => handleAsk()}
          disabled={isLoading}
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Ask AI
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
