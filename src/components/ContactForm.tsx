import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Loader2, CheckCircle2 } from "lucide-react";
import { Stack } from "./layout/Stack";

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
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
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

  const nameLength = form.watch("name")?.length || 0;
  const messageLength = form.watch("message")?.length || 0;

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
          project_type: data.projectType,
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
    <div className="rounded-3xl glass-card-hover p-6 sm:p-8">
      <Stack gap="md">
        <header>
          <h3 className="heading-4 text-slate-50">Let's talk</h3>
          <p className="mt-2 body-base text-slate-300">
            Send over your project details—I'll reply within 24 hours.
          </p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-sm">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <FormMessage />
                    <span className={`body-xs ${nameLength > 100 ? 'text-destructive' : 'text-slate-400'}`}>
                      {nameLength}/100
                    </span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-sm">Email</FormLabel>
                  <FormControl>
                    <EmailInput
                      placeholder="you@example.com"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-sm">Project Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-sm">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me about your project..."
                      className="min-h-[120px] resize-none"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <FormMessage />
                    <span className={`body-xs ${messageLength > 1000 ? 'text-destructive' : 'text-slate-400'}`}>
                      {messageLength}/1000
                    </span>
                  </div>
                  <FormDescription className="body-xs">
                    Minimum 10 characters required
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
                "Send it over"
              )}
            </Button>
          </form>
        </Form>
      </Stack>
    </div>
  );
}
