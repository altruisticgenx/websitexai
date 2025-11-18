import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

export function FAQAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
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
        
        if (error.message?.includes("429") || error.message?.includes("rate limit")) {
          toast({
            title: "Rate limit exceeded",
            description: "Please wait a moment before asking another question.",
            variant: "destructive",
          });
          return;
        }
        
        if (error.message?.includes("402") || error.message?.includes("credits")) {
          toast({
            title: "Service temporarily unavailable",
            description: "AI assistant credits need to be replenished.",
            variant: "destructive",
          });
          return;
        }

        throw error;
      }

      if (data?.answer) {
        setAnswer(data.answer);
      } else {
        throw new Error("No answer received");
      }
    } catch (error: any) {
      console.error("Error asking question:", error);
      toast({
        title: "Error",
        description: "Failed to get answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleAsk();
    }
  };

  return (
    <Card className="border-emerald-400/20 bg-slate-950/60 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-emerald-400" />
        <h3 className="text-base sm:text-lg font-semibold text-slate-50">
          Ask AI Assistant
        </h3>
      </div>
      
      <p className="mb-4 text-xs sm:text-sm text-slate-300">
        Have questions about our services or submission process? Ask our AI assistant!
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="e.g., How many projects have been submitted?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1 bg-slate-900/50 border-slate-700 text-sm"
        />
        <Button
          onClick={handleAsk}
          disabled={isLoading}
          className="bg-emerald-400 text-slate-950 hover:bg-emerald-300 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            "Ask"
          )}
        </Button>
      </div>

      {answer && (
        <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
            {answer}
          </p>
        </div>
      )}
    </Card>
  );
}
