import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Sparkles, MessageSquare, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export function FAQAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Initialize session and load conversation history
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    // Get or create session ID
    let storedSessionId = localStorage.getItem("faq_session_id");
    if (!storedSessionId) {
      storedSessionId = crypto.randomUUID();
      localStorage.setItem("faq_session_id", storedSessionId);
    }
    setSessionId(storedSessionId);

    // Load existing conversation
    try {
      const { data, error } = await supabase
        .from("faq_conversations")
        .select("*")
        .eq("session_id", storedSessionId)
        .single();

      if (error && error.code !== "PGRST116") { // PGRST116 = no rows returned
        console.error("Error loading conversation:", error);
        return;
      }

      if (data) {
        setConversationId(data.id);
        setConversationHistory(data.messages as Message[]);
      }
    } catch (error) {
      console.error("Error initializing session:", error);
    }
  };

  const saveConversation = async (messages: Message[]) => {
    try {
      if (conversationId) {
        // Update existing conversation
        const { error } = await supabase
          .from("faq_conversations")
          .update({ messages, updated_at: new Date().toISOString() })
          .eq("id", conversationId);

        if (error) throw error;
      } else {
        // Create new conversation
        const { data, error } = await supabase
          .from("faq_conversations")
          .insert({
            session_id: sessionId,
            messages,
          })
          .select()
          .single();

        if (error) throw error;
        if (data) setConversationId(data.id);
      }
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  const clearHistory = async () => {
    try {
      if (conversationId) {
        const { error } = await supabase
          .from("faq_conversations")
          .delete()
          .eq("id", conversationId);

        if (error) throw error;
      }

      setConversationHistory([]);
      setConversationId(null);
      setAnswer("");

      toast({
        title: "History cleared",
        description: "Your conversation history has been deleted.",
      });
    } catch (error) {
      console.error("Error clearing history:", error);
      toast({
        title: "Error",
        description: "Failed to clear history.",
        variant: "destructive",
      });
    }
  };

  const handleAsk = async (retryCount = 0) => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnswer("");

    // Add user message to history
    const userMessage: Message = {
      role: "user",
      content: question.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);
    setQuestion(""); // Clear input immediately

    try {
      const { data, error } = await supabase.functions.invoke("faq-assistant", {
        body: { question: userMessage.content },
      });

      if (error) {
        console.error("Function error:", error);
        
        // Handle rate limit errors
        if (error.message?.includes("429") || error.message?.includes("Rate limit")) {
          toast({
            title: "Too many requests",
            description: "Please wait a moment before asking another question.",
            variant: "destructive",
          });
          // Remove the user message we just added
          setConversationHistory(conversationHistory);
          return;
        }
        
        // Handle credit exhaustion
        if (error.message?.includes("402") || error.message?.includes("credits exhausted")) {
          toast({
            title: "Service temporarily unavailable",
            description: "AI assistant credits need to be replenished. Please try again later.",
            variant: "destructive",
          });
          // Remove the user message we just added
          setConversationHistory(conversationHistory);
          return;
        }

        // Retry on transient errors (max 2 retries)
        if (retryCount < 2 && (error.message?.includes("fetch") || error.message?.includes("network"))) {
          console.log(`Retrying request (attempt ${retryCount + 1})...`);
          setTimeout(() => handleAsk(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }

        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.answer) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.answer,
          timestamp: new Date().toISOString(),
        };

        const finalHistory = [...updatedHistory, assistantMessage];
        setConversationHistory(finalHistory);
        setAnswer(data.answer);

        // Save to database
        await saveConversation(finalHistory);

        toast({
          title: "Answer received",
          description: "The AI assistant has responded to your question.",
        });
      } else {
        throw new Error("No answer received from AI");
      }
    } catch (error: any) {
      console.error("Error asking question:", error);
      
      // Remove the user message if error occurred
      setConversationHistory(conversationHistory);
      
      // More specific error messages
      const errorMessage = error.message?.includes("No answer") 
        ? "The AI couldn't generate a response. Please try rephrasing your question."
        : error.message?.includes("LOVABLE_API_KEY")
        ? "AI service is not configured. Please contact support."
        : "Failed to get answer. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading && question.trim()) {
      handleAsk(0);
    }
  };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-slate-950/95 to-slate-900/80 p-3 sm:p-4 backdrop-blur-sm shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
          <h3 className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Assistant
          </h3>
        </div>
        
        {conversationHistory.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="h-6 px-2 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <p className="mb-3 text-[11px] text-slate-400">
        Ask about services, pricing, workflow, or book a call instantly.
      </p>

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <ScrollArea className="h-[300px] mb-4 rounded-lg border border-primary/20 bg-slate-950/40 p-3">
          <AnimatePresence>
            {conversationHistory.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <div className="flex items-start gap-2 mb-1">
                  {msg.role === "assistant" && (
                    <Sparkles className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  )}
                  <div className={`flex-1 ${msg.role === "user" ? "flex justify-end" : ""}`}>
                    <div
                      className={`inline-block rounded-lg px-3 py-2 text-sm max-w-[85%] ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-slate-800/60 text-slate-100"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <MessageSquare className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  )}
                </div>
                <div className={`text-[10px] text-muted-foreground px-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      )}

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
          onClick={() => handleAsk(0)}
          disabled={isLoading || !question.trim()}
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 whitespace-nowrap disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Analyzing...</span>
              <span className="inline sm:hidden">...</span>
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Ask AI
            </>
          )}
        </Button>
      </div>

      {/* Legacy answer display (keeping for backward compatibility) */}
      {answer && conversationHistory.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-4 backdrop-blur-sm"
        >
          <div className="flex items-start gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
