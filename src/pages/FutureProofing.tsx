import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, CheckCircle2, Target, Users, Building2, GraduationCap, FileText, Lightbulb, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Shared Components
function SectionHeader({
  eyebrow,
  title,
  intro
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return <div className="mb-4 md:mb-6">
      {eyebrow && <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary mb-1">
          {eyebrow}
        </p>}
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {intro && <p className="mt-2 max-w-3xl text-[10px] md:text-[11px] leading-relaxed text-muted-foreground">
          {intro}
        </p>}
    </div>;
}
function OutcomeCard({
  icon: Icon,
  title,
  items,
  gradient
}: {
  icon: any;
  title: string;
  items: string[];
  gradient: string;
}) {
  return <motion.div whileHover={{
    scale: 1.02,
    rotateY: 2
  }} className={`rounded-2xl border border-border/50 bg-gradient-to-br ${gradient} backdrop-blur-sm p-3 md:p-4 transform-gpu transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3 w-3 md:h-4 md:w-4 text-primary" />
        <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, idx) => <li key={idx} className="flex items-start gap-1.5 text-[9px] md:text-[10px] text-muted-foreground">
            <CheckCircle2 className="h-2.5 w-2.5 md:h-3 md:w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>)}
      </ul>
    </motion.div>;
}
function WeekCard({
  weekNumber,
  title,
  goal,
  activities,
  gradient,
  glowColor
}: {
  weekNumber: number;
  title: string;
  goal: string;
  activities: string[];
  gradient: string;
  glowColor: string;
}) {
  return <motion.div whileHover={{
    scale: 1.03,
    y: -4
  }} onHoverStart={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${glowColor}`} onHoverEnd={e => (e.currentTarget as HTMLElement).style.boxShadow = ''} className={`rounded-2xl border border-border/50 bg-gradient-to-br ${gradient} backdrop-blur-sm p-3 md:p-4 transform-gpu transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-primary">
          Week {weekNumber}
        </span>
      </div>
      <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground mb-2">{title}</h3>
      <div className="space-y-2">
        <div>
          <p className="text-[8px] uppercase tracking-wider text-muted-foreground mb-1">Goal</p>
          <p className="text-[9px] md:text-[10px] text-foreground/90">{goal}</p>
        </div>
        <div>
          <p className="text-[8px] uppercase tracking-wider text-muted-foreground mb-1">Activities</p>
          <ul className="space-y-1">
            {activities.map((activity, idx) => <li key={idx} className="text-[8px] md:text-[9px] text-muted-foreground flex items-start gap-1">
                <span className="text-primary">•</span>
                <span>{activity}</span>
              </li>)}
          </ul>
        </div>
      </div>
    </motion.div>;
}
export default function FutureProofing() {
  const { toast } = useToast();
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const weeks = [{
    weekNumber: 1,
    title: "From 'Politics is Noise' to 'This is a System'",
    goal: "Students can explain at least one structural reason change stalls—no screaming pundits required.",
    activities: ["Explore the Legislative Action vs In Committee chart", "Map local problems: overheated classrooms, unreliable buses, attendance, burnout", "Write: 'One thing I never knew about how bills get stuck'"],
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    glowColor: "rgba(168, 85, 247, 0.4)"
  }, {
    weekNumber: 2,
    title: "Shared Problems, Not Tribes",
    goal: "Shift from 'my side vs your side' to 'Here are our shared problems and the tradeoffs we're actually arguing about.'",
    activities: ["Use Regional Needs to find 3 problems almost everyone wants solved", "Learn to rewrite divisive, blame-heavy language into neutral, systems-focused language", "Map values (safety, freedom, fairness, jobs) across different archetypes"],
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    glowColor: "rgba(59, 130, 246, 0.4)"
  }, {
    weekNumber: 3,
    title: "Hot Topics as Design Challenges",
    goal: "Students learn to shape proposals that could survive a committee room.",
    activities: ["Module 1: AI & Tech – Institutionalize AI Coaching (write briefs for different audiences)", "Module 2: Energy & Infrastructure – Solar + V2G Buses (tailor proposals to rural vs urban)", "Practice addressing different concerns with the same data"],
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
    glowColor: "rgba(249, 115, 22, 0.4)"
  }, {
    weekNumber: 4,
    title: "Student Proposals & Civic Trust",
    goal: "Students finish with a concrete artifact (their brief) and a measurable shift in how they see civic action.",
    activities: ["Choose a theme: AI & Tech, Energy & Infrastructure, or Academic/Workforce", "Define 1 local problem + 1 pilot + 1 bill stuck 'In Committee'", "Draft and hand-edit a 1-page policy brief", "Present or submit to real decision-makers", "Complete Civic Trust Shift reflection"],
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    glowColor: "rgba(16, 185, 129, 0.4)"
  }];
  const studentOutcomes = ["Can explain at least one real reason a bill stalls—beyond 'politicians are bad'", "Can rewrite inflammatory language into neutral, problem-focused framing", "Can draft audience-specific policy briefs anchored in real data", "Report increased comfort talking to people who disagree", "Increased willingness to contact decision-makers"];
  const teacherOutcomes = ["A structured, low-lift 4-week unit you can plug into existing courses", "Ready-made prompts, dashboards, and templates instead of starting from scratch", "A safer way to discuss hot topics—anchored in data, not social media takes", "Evidence-based framework for reducing classroom division"];
  const schoolOutcomes = ["Evidence that you're actively reducing division, not just managing it", "Student work you can bring to boards, families, and funders to show impact", "A repeatable model for future pilots in energy, AI, and workforce policy"];
  return <>
    <Toaster />
    <div className="min-h-screen bg-background">
      {/* Skip to content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
        Skip to content
      </a>

      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-3 md:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
              AltruisticX AI
            </span>
          </Link>
          <Link to="/" className="text-[9px] md:text-[10px] text-muted-foreground hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-6xl px-3 md:px-6">
        {/* Hero Section */}
        <section className="py-6 md:py-10 border-b border-border/30">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="space-y-4 md:space-y-5">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-2.5 py-0.5 text-[8px] md:text-[9px] font-medium text-emerald-300 mb-2">
                <Sparkles className="h-2.5 w-2.5" />
                Live 4-Week Civic Lab
              </div>
              
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground px-3">
                Future-Proofing the Student
              </h1>
              
              <p className="text-[11px] md:text-[12px] text-muted-foreground max-w-2xl mx-auto px-3 leading-relaxed">
                Transform divisive hot-topics into collaborative policy labs where students analyze real legislation, draft audience-specific briefs, and practice systems thinking
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 px-3">
              <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-sm px-2.5 py-1.5 min-w-[140px]">
                <p className="text-[7px] uppercase tracking-wider text-emerald-400/70">The Problem</p>
                <p className="text-[10px] md:text-[11px] font-semibold text-foreground">80% bills stuck in committee</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm px-2.5 py-1.5 min-w-[140px]">
                <p className="text-[7px] uppercase tracking-wider text-cyan-400/70">The Method</p>
                <p className="text-[10px] md:text-[11px] font-semibold text-foreground">Division → Dialogue</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-sm px-2.5 py-1.5 min-w-[140px]">
                <p className="text-[7px] uppercase tracking-wider text-purple-400/70">The Result</p>
                <p className="text-[10px] md:text-[11px] font-semibold text-foreground">Real policy briefs</p>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center px-3 pt-2">
              <Button asChild size="sm" className="text-[10px] md:text-[11px] h-8">
                <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer">
                  Book 30-Min Pilot Call
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-[10px] md:text-[11px] h-8"
                onClick={() => {
                  toast({
                    title: "Coming Soon! 🚀",
                    description: "The EDU Starter Kit is being finalized. Book a call to get early access.",
                    duration: 4000,
                  });
                }}
              >
                EDU Starter Kit (Preview)
              </Button>
            </div>

            <div className="text-center px-3">
              <p className="text-[8px] md:text-[9px] text-muted-foreground italic max-w-xl mx-auto">
                Real bills · Real data · Real student-authored proposals to legislators, school boards, and parent groups
              </p>
            </div>
          </motion.div>
        </section>

        {/* The Problem Section */}
        <section className="py-8 md:py-12 border-b border-border/30">
          <SectionHeader eyebrow="The Challenge" title="Gatekept 'Innovation' vs Real Civic Skills" intro="Most education innovation arrives pre-packaged from elsewhere—leaving students as passive users instead of active civic problem-solvers. Meanwhile, 80% of breakthrough education, energy, and AI legislation stalls in committee while students experience politics as social media outrage." />

          <div className="grid gap-3 md:grid-cols-2 mt-4">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-3 md:p-4">
              <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground mb-2">The Broken System</h3>
              <ul className="space-y-2 text-[9px] md:text-[10px] text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>80% of promising education, energy, and AI bills stuck "In Committee"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Students experience politics as yelling on TV, outrage on social media</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Traditional edtech: "We'll ship a finished product from somewhere else"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Fast for vendors, slow for trust, terrible at teaching how change happens</span>
                </li>
              </ul>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm p-3 md:p-4">
              <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground mb-2">The Potential</h3>
              <ul className="space-y-2 text-[9px] md:text-[10px] text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Schools running powerful pilots: AI tutor coaches, high-impact tutoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>V2G bus programs that work and save money</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Real problems students could help solve</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>But no connection between working pilots and civic understanding</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-8 md:py-12 border-b border-border/30">
          <SectionHeader eyebrow="Our Method" title="Pilot Lab Civics, Not Platform Civics" intro="Turn your classroom into a policy-to-practice lab where students analyze real bills, draft audience-specific briefs, and learn how systems change—not just how to yell about them." />

          <div className="grid gap-3 md:grid-cols-3 mt-4">
            <OutcomeCard icon={Users} title="Students as Co-Designers" items={["Act as analysts, not just 'users'", "Real user journeys with real problems", "Build agency through authentic work"]} gradient="from-emerald-500/10 via-emerald-500/5 to-transparent" />
            <OutcomeCard icon={GraduationCap} title="Teachers as Partners" items={["Sense-makers, not just implementers", "Low-lift structured units", "Safe framework for hot topics"]} gradient="from-cyan-500/10 via-cyan-500/5 to-transparent" />
            <OutcomeCard icon={Building2} title="Districts Get Evidence" items={["Local evidence, not case studies", "Student work for boards & funders", "Repeatable pilot model"]} gradient="from-teal-500/10 via-teal-500/5 to-transparent" />
          </div>

          <div className="mt-6">
            <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground mb-3">What Students Get</h3>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="dashboard" className="border border-border/50 rounded-lg px-3 bg-card/30">
                <AccordionTrigger className="text-[10px] md:text-[11px] py-2 hover:no-underline">
                  Data-Driven Needs & Policy Dashboard
                </AccordionTrigger>
                <AccordionContent className="text-[9px] md:text-[10px] text-muted-foreground pb-2">
                  Bills In Committee vs Enacted across education, energy, and AI • Local/regional needs: attendance, building conditions, buses, workforce gaps • Proven pilots: DC HIT, Maine V2G buses, AI tutor coaches
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="generator" className="border border-border/50 rounded-lg px-3 bg-card/30">
                <AccordionTrigger className="text-[10px] md:text-[11px] py-2 hover:no-underline">
                  AI-Assisted Policy Brief Generator
                </AccordionTrigger>
                <AccordionContent className="text-[9px] md:text-[10px] text-muted-foreground pb-2">
                  Helps students draft 100-word briefs to real audiences (legislators, boards, parent groups) • Requires students to hand-edit for tone, fairness, and clarity • Teaches audience-specific communication
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="trust" className="border border-border/50 rounded-lg px-3 bg-card/30">
                <AccordionTrigger className="text-[10px] md:text-[11px] py-2 hover:no-underline">
                  Civic Trust Shift Tile
                </AccordionTrigger>
                <AccordionContent className="text-[9px] md:text-[10px] text-muted-foreground pb-2">
                  Short pre/post questions about disagreement, outreach, and "the other side" • Visualized on dashboard so you can see if the lab reduces cynicism • Measures comfort with civic engagement
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* 4-Week Pilot Timeline */}
        <section className="py-8 md:py-12 border-b border-border/30">
          <SectionHeader eyebrow="Structured Program" title="4-Week Pilot: What It Actually Looks Like" intro="2–3 sessions per week, 45–60 minutes. Fits civics, social studies, advisory, capstone, or interdisciplinary projects." />

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {weeks.map(week => <div key={week.weekNumber} onMouseEnter={() => setHoveredWeek(week.weekNumber)} onMouseLeave={() => setHoveredWeek(null)}>
                <WeekCard {...week} />
              </div>)}
          </div>

          {/* Timeline Progress Bar */}
          <div className="mt-6 relative">
            <div className="relative h-1 rounded-full bg-border/50">
              <motion.div className="absolute top-0 left-0 h-full rounded-full" style={{
              background: hoveredWeek === 1 ? 'linear-gradient(to right, rgb(168, 85, 247), rgb(168, 85, 247))' : hoveredWeek === 2 ? 'linear-gradient(to right, rgb(168, 85, 247), rgb(59, 130, 246))' : hoveredWeek === 3 ? 'linear-gradient(to right, rgb(168, 85, 247), rgb(59, 130, 246), rgb(249, 115, 22))' : hoveredWeek === 4 ? 'linear-gradient(to right, rgb(168, 85, 247), rgb(59, 130, 246), rgb(249, 115, 22), rgb(16, 185, 129))' : 'transparent'
            }} animate={{
              width: hoveredWeek === 1 ? '25%' : hoveredWeek === 2 ? '50%' : hoveredWeek === 3 ? '75%' : hoveredWeek === 4 ? '100%' : '0%'
            }} transition={{
              duration: 0.3
            }} />
            </div>
            <div className="flex justify-between mt-2 text-[8px] text-muted-foreground">
              <span>Start</span>
              <motion.span className="text-primary font-medium" animate={{
              opacity: hoveredWeek ? 1 : 0,
              scale: hoveredWeek ? 1 : 0.8
            }}>
                {hoveredWeek ? `Week ${hoveredWeek}/4` : ''}
              </motion.span>
              <span>Complete</span>
            </div>
          </div>
        </section>

        {/* Why This Beats Silicon Valley */}
        <section className="py-8 md:py-12 border-b border-border/30">
          <SectionHeader eyebrow="The Difference" title="Why This Beats the Silicon Valley / Gatekept Model" />

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="rounded-2xl border border-destructive/30 bg-destructive/5 backdrop-blur-sm p-3 md:p-4">
              <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground mb-3">The Usual Way (Gatekept Ed)</h3>
              <ul className="space-y-2 text-[9px] md:text-[10px] text-muted-foreground">
                <li>• Product shipped from somewhere else</li>
                <li>• Local context flattened into "user segments"</li>
                <li>• Teachers asked to comply, not co-design</li>
                <li>• Students are users, not producers</li>
                <li>• Data mainly feeds the vendor's roadmap</li>
              </ul>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm p-3 md:p-4">
              <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground mb-3">Our Way (Pilot Lab Civics)</h3>
              <ul className="space-y-2 text-[9px] md:text-[10px] text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Local agenda:</strong> We start from "What hurts here?"</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Small bets:</strong> 4-week experiments instead of 4-year "transformations"</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Shared evidence:</strong> Results live in your dashboard, classrooms, board meetings</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Student agency:</strong> Students write briefs, frame tradeoffs, question structure</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Reusable playbook:</strong> Once you've run one pilot, you can repeat on new problems</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Expected Outcomes */}
        <section className="py-8 md:py-12 border-b border-border/30">
          <SectionHeader eyebrow="Results" title="Outcomes You Can Expect" intro="Measurable impact for students, teachers, and schools." />

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <OutcomeCard icon={Target} title="For Students" items={studentOutcomes} gradient="from-purple-500/10 via-purple-500/5 to-transparent" />
            <OutcomeCard icon={GraduationCap} title="For Teachers" items={teacherOutcomes} gradient="from-blue-500/10 via-blue-500/5 to-transparent" />
            <OutcomeCard icon={Building2} title="For Schools & Districts" items={schoolOutcomes} gradient="from-emerald-500/10 via-emerald-500/5 to-transparent" />
          </div>
        </section>

        {/* How We Support */}
        <section className="py-8 md:py-12 border-b border-border/30">
          <SectionHeader eyebrow="Support" title="How AltruisticX AI Supports the Pilot" intro="We don't just drop off a PDF and run. You get hands-on support to make this work for your context." />

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div whileHover={{
            scale: 1.03
          }} className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-3 text-center transform-gpu transition-all">
              <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto mb-2" />
              <h3 className="text-[10px] md:text-[11px] font-semibold text-foreground mb-1">Pilot Design Call</h3>
              <p className="text-[8px] md:text-[9px] text-muted-foreground">Tune the lab to your state, bills, and schedule</p>
            </motion.div>

            <motion.div whileHover={{
            scale: 1.03
          }} className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-3 text-center transform-gpu transition-all">
              <Target className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto mb-2" />
              <h3 className="text-[10px] md:text-[11px] font-semibold text-foreground mb-1">Dashboard Configuration</h3>
              <p className="text-[8px] md:text-[9px] text-muted-foreground">Customized for your region and focus areas</p>
            </motion.div>

            <motion.div whileHover={{
            scale: 1.03
          }} className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-3 text-center transform-gpu transition-all">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto mb-2" />
              <h3 className="text-[10px] md:text-[11px] font-semibold text-foreground mb-1">Teacher Facilitation Guide</h3>
              <p className="text-[8px] md:text-[9px] text-muted-foreground">Week-by-week guide with prompts and timing</p>
            </motion.div>

            <motion.div whileHover={{
            scale: 1.03
          }} className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-3 text-center transform-gpu transition-all">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto mb-2" />
              <h3 className="text-[10px] md:text-[11px] font-semibold text-foreground mb-1">Templates & Resources</h3>
              <p className="text-[8px] md:text-[9px] text-muted-foreground">Briefs, reflections, and Civic Trust Shift tile</p>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 md:py-12">
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm p-6 md:p-8 text-center">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-3">
              Ready to Pilot Future-Proofing the Student?
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="text-left rounded-2xl border border-border/50 bg-card/30 p-3 md:p-4">
                <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground mb-2">Option 1 – Book a Pilot Design Call</h3>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mb-3">
                  30-minute session to clarify fit, timeline, focus themes (AI, energy, workforce), and customize the dashboard to your state's legislative data. Walk away with a clear go/no-go decision.
                </p>
                <Button asChild className="w-full text-[10px] md:text-[11px]">
                  <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer">
                    Schedule Pilot Call
                  </a>
                </Button>
              </div>

              <div className="text-left rounded-2xl border border-border/50 bg-card/30 p-3 md:p-4">
                <h3 className="text-[11px] md:text-[13px] font-semibold text-foreground mb-2">Option 2 – Preview the Classroom Kit</h3>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mb-3">
                  Get early access to sample dashboard views, the 4-week facilitation outline, student brief templates, and Civic Trust Shift assessment—so you can review with your team before committing.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full text-[10px] md:text-[11px]"
                  onClick={() => {
                    toast({
                      title: "Coming Soon! 🎓",
                      description: "The complete Classroom Kit is being finalized. Book a pilot call for immediate early access.",
                      duration: 5000,
                    });
                  }}
                >
                  Request Early Access (Coming Soon)
                </Button>
              </div>
            </div>

            <blockquote className="mt-6 border-l-2 border-primary pl-3 md:pl-4 text-left">
              <p className="text-[10px] md:text-[11px] italic text-muted-foreground">
                "You don't need another platform. You need a safe way to run real experiments—with your own students, using your own data, on problems that actually hurt."
              </p>
              <footer className="mt-2 text-[8px] md:text-[9px] text-muted-foreground">
                — We built Future-Proofing the Student for exactly that.
              </footer>
            </blockquote>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 md:py-6">
        <div className="mx-auto max-w-6xl px-3 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[8px] md:text-[9px] text-muted-foreground">
          <div>© {new Date().getFullYear()} AltruisticX · AI + Product Engineer</div>
          <div className="flex flex-wrap gap-2">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>•</span>
            <span>Async-first · privacy-aware · pilot-focused</span>
          </div>
        </div>
      </footer>
    </div>
  </>;
}