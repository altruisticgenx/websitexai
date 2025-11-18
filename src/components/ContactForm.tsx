import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFormPersistence } from "@/hooks/use-form-persistence";
import { FormSuccessAnimation } from "@/components/FormSuccessAnimation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmailInput } from "@/components/EmailInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";

const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  honeypot: z.string().max(0, "Bot detected"), // Honeypot field
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState(false);
  
  const { saveData, clearData, getPersistedData, isHydrated } = useFormPersistence<FormValues>(
    "contact-form-draft",
    {
      name: "",
      email: "",
      projectType: "",
      message: "",
      honeypot: "",
    }
  );
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
      honeypot: "",
    },
    mode: "onChange",
  });

  // Restore persisted form data on mount
  useEffect(() => {
    if (isHydrated) {
      const persisted = getPersistedData();
      if (persisted) {
        form.reset(persisted);
      }
    }
  }, [isHydrated]);

  // Save form data on change with debounce
  useEffect(() => {
    const subscription = form.watch((value) => {
      const timer = setTimeout(() => {
        if (!isSuccess) {
          saveData(value as FormValues);
        }
      }, 500);
      return () => clearTimeout(timer);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, isSuccess]);

  const nameLength = form.watch("name")?.length || 0;
  const messageLength = form.watch("message")?.length || 0;

  const onSubmit = async (data: FormValues) => {
    // Check honeypot
    if (data.honeypot) {
      console.warn("Bot detected via honeypot");
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);
    setErrorDetails(null);
    setEmailWarning(false);
    
    try {
      console.log("Submitting contact form...");
      
      const { data: submission, error } = await supabase
        .from("contact_submissions")
        .insert({
          name: data.name,
          email: data.email,
          project_type: data.projectType,
          message: data.message,
        })
        .select()
        .single();

      if (error) {
        console.error("Database error:", error);
        throw new Error(`Failed to save submission: ${error.message}`);
      }

      console.log("Submission saved successfully:", submission.id);

      // Try to send confirmation email with retry
      if (submission) {
        let emailSent = false;
        let emailError = null;
        
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            console.log(`Sending confirmation email (attempt ${attempt})...`);
            
            const { data: emailResponse, error: invokeError } = await supabase.functions.invoke(
              "send-contact-confirmation",
              {
                body: { submissionId: submission.id },
              }
            );

            if (invokeError) {
              throw invokeError;
            }

            console.log("Email sent successfully:", emailResponse);
            emailSent = true;
            break;
          } catch (err: any) {
            console.error(`Email attempt ${attempt} failed:`, err);
            emailError = err;
            
            if (attempt < 2) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        }

        if (!emailSent) {
          console.warn("Email confirmation failed after retries");
          setEmailWarning(true);
        }
      }

      setIsSuccess(true);
      clearData(); // Clear persisted form data
      
      toast({
        title: "Message sent!",
        description: emailWarning 
          ? "Your message was saved but email confirmation may be delayed."
          : "Thanks for reaching out. Check your email for confirmation.",
      });
      
      form.reset();
      setTimeout(() => {
        setIsSuccess(false);
        setEmailWarning(false);
      }, 5000);
      
    } catch (error: any) {
      console.error("Error submitting form:", error);
      
      const errorMessage = error.message || "Unknown error occurred";
      setErrorDetails(errorMessage);
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    form.reset();
    clearData();
    toast({
      title: "Form cleared",
      description: "All draft data has been removed.",
    });
  };

  const getCharacterCountColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 75) return "text-yellow-500";
    return "text-slate-400";
  };

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-slate-50">Get in touch</h3>
          <p className="mt-2 text-sm text-slate-300">
            Share your project details and I'll respond within 24 hours.
          </p>
        </div>
        {!isSuccess && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearForm}
            className="text-slate-400 hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <FormSuccessAnimation key="success" />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {errorDetails && (
              <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-destructive">Submission Error</h4>
                    <p className="mt-1 text-xs text-slate-300">{errorDetails}</p>
                  </div>
                </div>
              </div>
            )}

            {emailWarning && (
              <div className="mb-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-500">Email Delayed</h4>
                    <p className="mt-1 text-xs text-slate-300">
                      Your message was saved but email confirmation may be delayed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Honeypot field - hidden from users */}
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      tabIndex={-1}
                      autoComplete="off"
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        width: "1px",
                        height: "1px",
                      }}
                      aria-hidden="true"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Your name" 
                            {...field}
                            disabled={isSubmitting}
                            maxLength={100}
                            className={fieldState.error ? "border-destructive" : ""}
                            aria-invalid={fieldState.error ? "true" : "false"}
                            aria-describedby={fieldState.error ? "name-error" : undefined}
                          />
                          {field.value && !fieldState.error && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                          )}
                        </div>
                      </FormControl>
                      <div className="flex justify-between items-center">
                        <FormMessage id="name-error" />
                        <span className={`text-xs ${getCharacterCountColor(nameLength, 100)}`}>
                          {nameLength}/100
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <EmailInput
                            placeholder="you@example.com"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled={isSubmitting}
                            className={fieldState.error ? "border-destructive" : ""}
                            aria-invalid={fieldState.error ? "true" : "false"}
                            aria-describedby={fieldState.error ? "email-error" : undefined}
                          />
                          {field.value && !fieldState.error && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage id="email-error" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Project Type *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={fieldState.error ? "border-destructive" : ""}
                            aria-invalid={fieldState.error ? "true" : "false"}
                            aria-describedby={fieldState.error ? "project-type-error" : undefined}
                          >
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="quick-question">Quick Question</SelectItem>
                          <SelectItem value="consulting">Consulting / Advisory</SelectItem>
                          <SelectItem value="pilot-project">4-Week Pilot Project</SelectItem>
                          <SelectItem value="full-project">Full Project</SelectItem>
                          <SelectItem value="ongoing-support">Ongoing Support</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage id="project-type-error" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          className={`min-h-[120px] resize-none ${fieldState.error ? "border-destructive" : ""}`}
                          {...field}
                          disabled={isSubmitting}
                          maxLength={1000}
                          aria-invalid={fieldState.error ? "true" : "false"}
                          aria-describedby={fieldState.error ? "message-error" : "message-description"}
                        />
                      </FormControl>
                      <div className="flex justify-between items-center">
                        <FormMessage id="message-error" />
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${getCharacterCountColor(messageLength, 1000)}`}>
                            {messageLength}/1000
                          </span>
                          {messageLength >= 900 && (
                            <span className="text-xs text-yellow-500">
                              ({1000 - messageLength} remaining)
                            </span>
                          )}
                        </div>
                      </div>
                      <FormDescription id="message-description" className="text-xs">
                        Minimum 10 characters required
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess || !form.formState.isValid}
                  className="w-full bg-emerald-400 text-slate-950 hover:bg-emerald-300 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Sent!
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                <p className="text-center text-xs text-slate-400 mt-2">
                  Your draft is automatically saved as you type
                </p>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
