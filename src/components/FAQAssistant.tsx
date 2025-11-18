import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function FAQAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      const { data, error } = await supabase.functions.invoke("faq-assistant", {
        body: { question },
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
          return;
        }
        
        // Handle credit exhaustion
        if (error.message?.includes("402") || error.message?.includes("credits exhausted")) {
          toast({
            title: "Service temporarily unavailable",
            description: "AI assistant credits need to be replenished. Please try again later.",
            variant: "destructive",
          });
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
        setAnswer(data.answer);
        toast({
          title: "Answer received",
          description: "The AI assistant has responded to your question.",
        });
      } else {
        throw new Error("No answer received from AI");
      }
    } catch (error: any) {
      console.error("Error asking question:", error);
      
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
      <Card className="border-primary/30 bg-gradient-to-br from-slate-950/80 to-slate-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
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
        
        <p className="mb-4 text-xs sm:text-sm text-slate-300">
          Ask anything about our services, projects, pricing, or workflow. Powered by advanced AI with real-time platform insights.
        </p>

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

        {answer && (
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
