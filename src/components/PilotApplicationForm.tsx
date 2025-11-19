import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function PilotApplicationForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          email,
          name: "Pilot Application",
          project_type: "PA Future-Proofing Pilot 2025-2026",
          message: "Applied for the Pennsylvania Future-Proofing Pilot program",
        });

      if (error) throw error;

      toast.success("Application submitted! We'll be in touch soon.");
      setEmail("");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting}
        className="flex-1 bg-slate-900/60 border-slate-700 text-slate-100 placeholder:text-slate-400"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-sky-400 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-sky-300 transition"
      >
        {isSubmitting ? "Submitting..." : "Apply for 2025-2026"}
      </Button>
    </form>
  );
}
