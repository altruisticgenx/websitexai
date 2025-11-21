import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, MessageSquare, ArrowRight, Loader2, CheckCircle2, Briefcase, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),
  projectType: z.string().optional(),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    setIsSuccess(true);
    toast({
      title: "Sending message...",
      description: "Your message is being sent.",
    });
    
    setIsSubmitting(true);
    
    try {
      const { data: submission, error } = await supabase
        .from("contact_submissions")
        .insert({
          name: data.name,
          email: data.email,
          project_type: data.projectType || "general-inquiry",
          message: data.message,
        })
        .select()
        .single();

      if (error) throw error;

      if (submission) {
        supabase.functions.invoke("send-contact-confirmation", {
          body: { submissionId: submission.id },
        }).catch((emailError) => {
          console.error("Email sending failed (non-critical):", emailError);
        });
      }

      toast({
        title: "Got it!",
        description: "I'll reply to your email within 24 hours.",
      });
      
      form.reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSuccess(false);
      toast({
        title: "Hmm",
        description: "Something went wrong. Mind trying again?",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-center text-sm"
    >
      <p className="text-xs bg-primary/20 text-primary font-medium px-3 py-1 rounded-full">
        Contact Us
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold py-4 text-center">Let's Get In Touch.</h1>
      <p className="text-sm sm:text-base text-muted-foreground pb-10 text-center max-w-md">
        Or just reach out manually to us at{" "}
        <a 
          href="mailto:altruisticxai@gmail.com" 
          className="text-primary hover:underline"
        >
          altruisticxai@gmail.com
        </a>
      </p>

      <div className="max-w-96 w-full px-4">
        {/* Name Field */}
        <label htmlFor="name" className="font-medium">
          Full Name
        </label>
        <div className="flex items-center mt-2 mb-4 min-h-[44px] h-10 pl-3 border border-border rounded-full focus-within:ring-2 focus-within:ring-ring transition-all overflow-hidden bg-background">
          <User className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            id="name"
            {...form.register("name")}
            disabled={isSubmitting}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your full name"
          />
        </div>
        {form.formState.errors.name && (
          <p className="text-xs text-destructive mb-2 -mt-2">
            {form.formState.errors.name.message}
          </p>
        )}

        {/* Email Field */}
        <label htmlFor="email" className="font-medium mt-4">
          Email Address
        </label>
        <div className="flex items-center mt-2 mb-4 min-h-[44px] h-10 pl-3 border border-border rounded-full focus-within:ring-2 focus-within:ring-ring transition-all overflow-hidden bg-background">
          <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="email"
            id="email"
            {...form.register("email")}
            disabled={isSubmitting}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your email address"
          />
        </div>
        {form.formState.errors.email && (
          <p className="text-xs text-destructive mb-2 -mt-2">
            {form.formState.errors.email.message}
          </p>
        )}

        {/* More Options Toggle */}
        <button
          type="button"
          onClick={() => setShowMoreOptions(!showMoreOptions)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 mb-2 group"
        >
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-300 ${showMoreOptions ? 'rotate-180' : ''}`}
          />
          <span>{showMoreOptions ? 'Hide' : 'More'} options</span>
        </button>

        {/* Project Type Field (Collapsible) */}
        <AnimatePresence initial={false}>
          {showMoreOptions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <label htmlFor="projectType" className="font-medium">
                Project Type
              </label>
              <div className="flex items-center mt-2 mb-4 min-h-[44px] border border-border rounded-full focus-within:ring-2 focus-within:ring-ring transition-all overflow-hidden bg-background">
                <div className="pl-3">
                  <Briefcase className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
                <Select
                  value={form.watch("projectType")}
                  onValueChange={(value) => form.setValue("projectType", value, { shouldValidate: true })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="border-0 focus:ring-0 focus:ring-offset-0 h-full">
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    <SelectItem value="quick-question">Quick Question</SelectItem>
                    <SelectItem value="consulting">Consulting / Advisory</SelectItem>
                    <SelectItem value="pilot-project">4-Week Pilot Project</SelectItem>
                    <SelectItem value="full-project">Full Project</SelectItem>
                    <SelectItem value="ongoing-support">Ongoing Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Field */}
        <label htmlFor="message" className="font-medium mt-4">
          Message
        </label>
        <div className="relative">
          <div className="flex items-start mt-2 p-3 border border-border rounded-lg focus-within:ring-2 focus-within:ring-ring transition-all bg-background">
            <MessageSquare className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
            <textarea
              id="message"
              {...form.register("message")}
              disabled={isSubmitting}
              rows={4}
              className="w-full px-2 bg-transparent resize-none outline-none"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>
          {form.formState.errors.message && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="flex items-center justify-center gap-2 mt-5 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 min-h-[44px] w-full rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Sent!
            </>
          ) : (
            <>
              Submit Form
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
