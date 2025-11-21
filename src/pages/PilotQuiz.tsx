import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    tags: string[];
  }>;
}

interface PilotRecommendation {
  pilotId: string;
  title: string;
  domain: string;
  score: number;
  reason: string;
  link: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: "challenge",
    question: "What's your biggest operational challenge?",
    options: [
      {
        value: "cost-reduction",
        label: "Reducing operational costs",
        tags: ["energy", "efficiency", "automation"],
      },
      {
        value: "visibility",
        label: "Lack of visibility into data/performance",
        tags: ["analytics", "dashboard", "tracking"],
      },
      {
        value: "manual-work",
        label: "Too much manual, repetitive work",
        tags: ["automation", "admin", "efficiency"],
      },
      {
        value: "engagement",
        label: "Low engagement (students/customers/residents)",
        tags: ["engagement", "retention", "experience"],
      },
      {
        value: "forecasting",
        label: "Can't predict future trends or risks",
        tags: ["prediction", "forecasting", "risk"],
      },
    ],
  },
  {
    id: "domain",
    question: "Which domain best describes your organization?",
    options: [
      {
        value: "energy",
        label: "Energy & Sustainability",
        tags: ["energy", "campus", "facilities"],
      },
      {
        value: "education",
        label: "Education & Workforce",
        tags: ["education", "students", "learning"],
      },
      {
        value: "gov",
        label: "Government & Civic",
        tags: ["gov", "civic", "public"],
      },
      {
        value: "startup",
        label: "Startup & Tech",
        tags: ["startup", "saas", "tech"],
      },
    ],
  },
  {
    id: "urgency",
    question: "How quickly do you need results?",
    options: [
      {
        value: "immediate",
        label: "Immediately - need demo in Week 1",
        tags: ["week-1", "fast", "urgent"],
      },
      {
        value: "fast",
        label: "Fast - Week 1-2 demo is fine",
        tags: ["week-1", "week-2", "fast"],
      },
      {
        value: "normal",
        label: "Normal - Week 2-3 works",
        tags: ["week-2", "week-3", "normal"],
      },
      {
        value: "flexible",
        label: "Flexible - timeline isn't critical",
        tags: ["week-3", "flexible"],
      },
    ],
  },
  {
    id: "outcome",
    question: "What type of outcome matters most?",
    options: [
      {
        value: "cost-savings",
        label: "Direct cost savings ($$$)",
        tags: ["savings", "cost", "roi"],
      },
      {
        value: "time-savings",
        label: "Time savings for staff",
        tags: ["time", "efficiency", "automation"],
      },
      {
        value: "growth",
        label: "Growth metrics (engagement, conversion)",
        tags: ["growth", "engagement", "conversion"],
      },
      {
        value: "compliance",
        label: "Compliance & reporting",
        tags: ["compliance", "reporting", "tracking"],
      },
      {
        value: "insight",
        label: "Better insights & visibility",
        tags: ["analytics", "insights", "visibility"],
      },
    ],
  },
  {
    id: "budget",
    question: "What's your budget range for a 4-week pilot?",
    options: [
      {
        value: "tight",
        label: "$10k-$15k (tight budget)",
        tags: ["low-cost", "budget"],
      },
      {
        value: "moderate",
        label: "$15k-$20k (moderate)",
        tags: ["moderate", "standard"],
      },
      {
        value: "flexible",
        label: "$20k+ (flexible)",
        tags: ["flexible", "premium"],
      },
    ],
  },
];

const PILOT_DATABASE = [
  {
    id: "energy-analytics",
    title: "Energy Analytics Dashboard",
    domain: "Energy",
    tags: ["energy", "analytics", "dashboard", "cost", "savings", "week-1", "moderate"],
    timeToDemo: "Week 1",
    price: "$12k–$18k",
  },
  {
    id: "demand-forecasting",
    title: "Energy Demand Forecasting",
    domain: "Energy",
    tags: ["energy", "forecasting", "prediction", "cost", "savings", "week-2", "moderate"],
    timeToDemo: "Week 2",
    price: "$15k–$20k",
  },
  {
    id: "sustainability-tracker",
    title: "Sustainability Dashboard",
    domain: "Energy",
    tags: ["energy", "compliance", "reporting", "tracking", "time", "week-1", "low-cost"],
    timeToDemo: "Week 1",
    price: "$10k–$15k",
  },
  {
    id: "edtech-portal",
    title: "EdTech Student Portal",
    domain: "Education",
    tags: ["education", "students", "automation", "time", "grading", "week-2", "moderate"],
    timeToDemo: "Week 2",
    price: "$14k–$22k",
  },
  {
    id: "career-pathways",
    title: "Career Pathway Mapper",
    domain: "Education",
    tags: ["education", "students", "engagement", "growth", "week-3", "flexible"],
    timeToDemo: "Week 3",
    price: "$16k–$24k",
  },
  {
    id: "learning-analytics",
    title: "Learning Analytics Engine",
    domain: "Education",
    tags: ["education", "students", "prediction", "analytics", "retention", "week-2", "flexible"],
    timeToDemo: "Week 2",
    price: "$18k–$26k",
  },
  {
    id: "policy-tracker",
    title: "Policy Tracking Dashboard",
    domain: "Gov",
    tags: ["gov", "tracking", "automation", "time", "compliance", "week-2", "moderate"],
    timeToDemo: "Week 2",
    price: "$12k–$18k",
  },
  {
    id: "community-engagement",
    title: "Community Engagement Platform",
    domain: "Gov",
    tags: ["gov", "civic", "engagement", "tracking", "efficiency", "week-3", "moderate"],
    timeToDemo: "Week 3",
    price: "$14k–$20k",
  },
  {
    id: "grant-management",
    title: "Grant Management System",
    domain: "Gov",
    tags: ["gov", "tracking", "compliance", "automation", "reporting", "week-2", "flexible"],
    timeToDemo: "Week 2",
    price: "$16k–$24k",
  },
  {
    id: "founder-os",
    title: "Founder OS",
    domain: "Startup",
    tags: ["startup", "automation", "time", "admin", "efficiency", "week-1", "low-cost"],
    timeToDemo: "Week 1",
    price: "$10k–$16k",
  },
  {
    id: "sales-copilot",
    title: "Sales Copilot",
    domain: "Startup",
    tags: ["startup", "sales", "automation", "conversion", "growth", "week-2", "moderate"],
    timeToDemo: "Week 2",
    price: "$14k–$22k",
  },
  {
    id: "customer-insights",
    title: "Customer Insights Engine",
    domain: "Startup",
    tags: ["startup", "analytics", "prediction", "retention", "insights", "week-3", "flexible"],
    timeToDemo: "Week 3",
    price: "$16k–$24k",
  },
];

const PilotQuiz: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const isLastQuestion = currentStep === QUIZ_QUESTIONS.length - 1;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowResults(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendations = (): PilotRecommendation[] => {
    const userTags: string[] = [];

    // Collect all tags from user answers
    QUIZ_QUESTIONS.forEach((q) => {
      const answerValue = answers[q.id];
      const selectedOption = q.options.find((opt) => opt.value === answerValue);
      if (selectedOption) {
        userTags.push(...selectedOption.tags);
      }
    });

    // Score each pilot based on tag matches
    const scoredPilots = PILOT_DATABASE.map((pilot) => {
      let score = 0;
      let matchedTags: string[] = [];

      pilot.tags.forEach((tag) => {
        if (userTags.includes(tag)) {
          score++;
          matchedTags.push(tag);
        }
      });

      // Generate reason based on matched tags
      let reason = "";
      if (matchedTags.includes("week-1") || matchedTags.includes("fast")) {
        reason += "Fast demo timeline. ";
      }
      if (matchedTags.includes("automation") || matchedTags.includes("time")) {
        reason += "Saves significant time. ";
      }
      if (matchedTags.includes("cost") || matchedTags.includes("savings")) {
        reason += "Direct cost savings. ";
      }
      if (matchedTags.includes("analytics") || matchedTags.includes("insights")) {
        reason += "Better visibility & insights. ";
      }
      if (matchedTags.includes("engagement") || matchedTags.includes("growth")) {
        reason += "Improves engagement. ";
      }
      if (matchedTags.includes("compliance") || matchedTags.includes("reporting")) {
        reason += "Streamlines compliance. ";
      }
      if (!reason) {
        reason = "Good match for your domain.";
      }

      return {
        pilotId: pilot.id,
        title: pilot.title,
        domain: pilot.domain,
        score,
        reason: reason.trim(),
        link: `/pilots/${pilot.id}`,
      };
    });

    // Sort by score and return top 3
    return scoredPilots.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingEmail(true);

    try {
      // Insert quiz submission
      const { data: submission, error: insertError } = await supabase
        .from("pilot_quiz_submissions")
        .insert({
          email,
          answers,
          recommendations: recommendations.map(r => ({
            pilotId: r.pilotId,
            title: r.title,
            domain: r.domain,
            reason: r.reason,
            link: r.link,
          })),
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Trigger email send
      const { error: emailError } = await supabase.functions.invoke(
        "send-quiz-recommendations",
        {
          body: { submissionId: submission.id },
        }
      );

      if (emailError) throw emailError;

      setEmailSubmitted(true);
      toast({
        title: "Success!",
        description: "Your recommendations have been sent to your inbox",
      });
    } catch (error: any) {
      console.error("Error submitting email:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const recommendations = showResults ? getRecommendations() : [];
  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteNav />

      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
                <Sparkles className="mr-1 h-3 w-3" />
                Pilot Finder
              </Badge>
              <h1 className="heading-1 mb-4">Find Your Perfect Pilot</h1>
              <p className="body-lg text-muted-foreground">
                Answer 5 quick questions to get personalized pilot recommendations
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quiz Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            {!showResults ? (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="body-sm text-muted-foreground">
                      Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="body-sm font-medium text-primary">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="heading-3">{currentQuestion.question}</CardTitle>
                      <CardDescription>Select the option that best describes your situation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <motion.button
                          key={option.value}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleAnswer(option.value)}
                          className={cn(
                            "w-full p-4 text-left rounded-lg border-2 transition-all touch-manipulation",
                            "hover:border-primary hover:bg-primary/5",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            answers[currentQuestion.id] === option.value
                              ? "border-primary bg-primary/10"
                              : "border-border bg-card"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="body-base font-medium">{option.label}</span>
                            {answers[currentQuestion.id] === option.value && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button variant="ghost" onClick={handleRestart}>
                      Start Over
                    </Button>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="heading-2 mb-2">Your Recommended Pilots</h2>
                    <p className="body-lg text-muted-foreground">
                      Based on your answers, here are the best pilots for your needs
                    </p>
                  </div>

                  <div className="space-y-6 mb-8">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.pilotId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-2 hover:border-primary/40 transition-all">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <Badge variant="outline" className="mb-2">
                                  #{index + 1} Match
                                </Badge>
                                <CardTitle className="heading-4">{rec.title}</CardTitle>
                              </div>
                              <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                                {rec.domain}
                              </Badge>
                            </div>
                            <CardDescription className="body-base">{rec.reason}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button asChild className="w-full sm:w-auto">
                              <Link to={rec.link}>
                                View Pilot Details <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Email Capture */}
                  {!emailSubmitted ? (
                    <Card className="mb-8 border-2 border-primary/20">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="h-5 w-5 text-primary" />
                          <CardTitle className="heading-4">Get Your Recommendations via Email</CardTitle>
                        </div>
                        <CardDescription>
                          Enter your email to receive these recommendations plus a follow-up from our team
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1"
                          />
                          <Button type="submit" disabled={isSubmittingEmail} className="sm:w-auto w-full">
                            {isSubmittingEmail ? "Sending..." : "Send to Inbox"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="mb-8 border-2 border-primary bg-primary/5">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">Recommendations sent!</p>
                            <p className="text-sm text-muted-foreground">
                              Check your inbox at {email} for your personalized pilot recommendations
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={handleRestart} variant="outline">
                      Retake Quiz
                    </Button>
                    <Button asChild>
                      <Link to="/pilots">
                        Browse All Pilots <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PilotQuiz;
