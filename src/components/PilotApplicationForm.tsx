import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AccessibleButton } from "@/components/ui/accessible-button";
import { AccessibleInput } from "@/components/ui/accessible-input";
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

    // Optimistic UI: Show success immediately and clear form
    const submittedEmail = email;
    setEmail("");
    toast.success("Application submitted! We'll be in touch soon.");
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          email: submittedEmail,
          name: "Pilot Application",
          project_type: "PA Future-Proofing Pilot 2025-2026",
          message: "Applied for the Pennsylvania Future-Proofing Pilot program",
        });

      if (error) throw error;
      
      // Success already shown optimistically
    } catch (error) {
      console.error("Error submitting application:", error);
      // Rollback on error
      setEmail(submittedEmail);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <div className="flex-1">
        <AccessibleInput
          type="email"
          label="Email address"
          hideLabel
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className="bg-slate-900/60 border-slate-700 text-slate-100 placeholder:text-slate-400"
          required
          aria-label="Email address for pilot application"
        />
      </div>
      <AccessibleButton
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-sky-400 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-sky-300 transition"
        size="default"
        aria-label={isSubmitting ? "Submitting application" : "Apply for 2025-2026 pilot program"}
      >
        {isSubmitting ? "Submitting..." : "Apply for 2025-2026"}
      </AccessibleButton>
    </form>
  );
}
