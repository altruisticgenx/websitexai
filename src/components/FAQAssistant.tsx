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
      const {
        data,
        error
      } = await supabase.from("faq_conversations").select("*").eq("session_id", storedSessionId).maybeSingle();
      if (error) {
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
        const {
          error
        } = await supabase.from("faq_conversations").update({
          messages,
          updated_at: new Date().toISOString()
        }).eq("id", conversationId);
        if (error) throw error;
      } else {
        // Create new conversation
        const {
          data,
          error
        } = await supabase.from("faq_conversations").insert({
          session_id: sessionId,
          messages
        }).select().single();
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
        const {
          error
        } = await supabase.from("faq_conversations").delete().eq("id", conversationId);
        if (error) throw error;
      }
      setConversationHistory([]);
      setConversationId(null);
      setAnswer("");
      toast({
        title: "History cleared",
        description: "Your conversation history has been deleted."
      });
    } catch (error) {
      console.error("Error clearing history:", error);
      toast({
        title: "Error",
        description: "Failed to clear history.",
        variant: "destructive"
      });
    }
  };
  const handleAsk = async (retryCount = 0) => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    setAnswer("");

    // Add user message to history
    const userMessage: Message = {
      role: "user",
      content: question.trim(),
      timestamp: new Date().toISOString()
    };
    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);
    setQuestion(""); // Clear input immediately

    try {
      const {
        data,
        error
      } = await supabase.functions.invoke("faq-assistant", {
        body: {
          question: userMessage.content
        }
      });
      if (error) {
        console.error("Function error:", error);

        // Handle rate limit errors
        if (error.message?.includes("429") || error.message?.includes("Rate limit")) {
          toast({
            title: "Too many requests",
            description: "Please wait a moment before asking another question.",
            variant: "destructive"
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
            variant: "destructive"
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
          timestamp: new Date().toISOString()
        };
        const finalHistory = [...updatedHistory, assistantMessage];
        setConversationHistory(finalHistory);
        setAnswer(data.answer);

        // Save to database
        await saveConversation(finalHistory);
        toast({
          title: "Answer received",
          description: "The AI assistant has responded to your question."
        });
      } else {
        throw new Error("No answer received from AI");
      }
    } catch (error: unknown) {
      console.error("Error asking question:", error);

      // Remove the user message if error occurred
      setConversationHistory(conversationHistory);

      // More specific error messages
      const errorMessage = error instanceof Error && error.message?.includes("No answer") ? "The AI couldn't generate a response. Please try rephrasing your question." : error instanceof Error && error.message?.includes("LOVABLE_API_KEY") ? "AI service is not configured. Please contact support." : "Failed to get answer. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
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
  return;
}