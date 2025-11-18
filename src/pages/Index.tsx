import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Rocket, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav } from "@/components/SiteNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SiteNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary mb-6">
                  AltruisticX AI · Live AI Pilot Lab
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                  AI pilots for campuses, cities, and scrappy teams
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Test real AI tools in 4-week pilots. I design, build, and ship working software — not slide decks — so you can see what actually helps your people before you commit.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Real builds, not demos – dashboards, workflows, and tiny tools your team can click on.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">4-week sprints – enough to learn, short enough to walk away.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">No long contracts – pause anytime, keep the code and the lessons.</span>
                  </li>
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <Button size="lg" className="text-base" asChild>
                    <a href="mailto:hello@altruisticxai.com?subject=Book%20a%20Pilot%20Call">
                      Book a Pilot Call
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-base" asChild>
                    <Link to="/portfolio">View active pilots</Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Week-to-week · pause anytime · async-friendly
                </p>
              </motion.div>
              
              {/* Right Column - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <Card className="p-6 bg-card border-border shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <h3 className="font-semibold">Lab Notebook</h3>
                      <span className="text-xs text-muted-foreground">Week 4/4</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm">Dashboard shipped</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm">Team feedback collected</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                        <span className="text-sm">Final walkthrough scheduled</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Who uses Pilots4You?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Teams that need real evidence, not another strategy deck.
              </p>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Campuses & schools",
                  body: "Turn messy student, energy, or operations data into simple tools that staff will actually use.",
                  icon: Users
                },
                {
                  title: "Cities & civic teams",
                  body: "Try AI around forms, wait times, and public info without handing everything to a big vendor.",
                  icon: TrendingUp
                },
                {
                  title: "Founders & small orgs",
                  body: "You have a fuzzy idea and a deadline. We turn it into a usable pilot you can show to partners and funders.",
                  icon: Rocket
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <card.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground">{card.body}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get in 4 Weeks */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left - Intro */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  What you get from a 4-week pilot
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Each pilot is a tiny, focused project with a clear question, a working prototype, and a simple story you can share.
                </p>
              </motion.div>
              
              {/* Right - Timeline Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {[
                  {
                    number: "1",
                    title: "A focused question",
                    body: "\"Can we cut this process from 2 weeks to 2 days?\" \"Can staff understand this dashboard in under 60 seconds?\" We write this down first."
                  },
                  {
                    number: "2",
                    title: "A working prototype",
                    body: "A small, opinionated tool: dashboard, form flow, matching engine, or internal 'copilot' — shipped where your team can try it."
                  },
                  {
                    number: "3",
                    title: "A plain-language summary",
                    body: "What worked, what didn't, and what to do next — in slides or a one-pager you can send to leadership or funders."
                  },
                  {
                    number: "4",
                    title: "A clear next step",
                    body: "Kill it, tweak it, or scale it. No pressure to \"go big\" if it doesn't earn it."
                  }
                ].map((item, index) => (
                  <Card key={item.number} className="p-6 border-l-4 border-l-primary">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {item.number}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.body}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sample Pilots */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Sample pilots I'm running for teams like yours
              </h2>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  label: "Higher Ed · Energy",
                  title: "Campus Energy Storyboard",
                  goal: "Turn raw campus energy data into a simple story that facilities can show to grant committees.",
                  outcome: "A live dashboard plus a 'energy story' one-pager updated weekly."
                },
                {
                  label: "Education · Community",
                  title: "Capstone Partner Matchmaker",
                  goal: "Cut the time to match students with community partners from 2 weeks to a couple of days.",
                  outcome: "A simple web UI where staff can see matches, constraints, and contact info in one place."
                },
                {
                  label: "City / Civic",
                  title: "Civic Form Triage Assistant",
                  goal: "Help staff quickly sort incoming forms and emails into \"urgent now / later / wrong place.\"",
                  outcome: "An internal assistant that tags and routes requests instead of one shared inbox chaos."
                },
                {
                  label: "Energy & Education",
                  title: "Grant Evidence Pack Helper",
                  goal: "Pull the right metrics, screenshots, and quotes for grant applications without digging through old emails.",
                  outcome: "A small tool that assembles a \"grant evidence pack\" from your dashboards and notes."
                }
              ].map((pilot, index) => (
                <motion.div
                  key={pilot.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="inline-block rounded-full bg-primary/10 text-primary text-xs font-medium px-3 py-1 mb-4">
                      {pilot.label}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{pilot.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Goal:</p>
                        <p className="text-sm">{pilot.goal}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Outcome:</p>
                        <p className="text-sm">{pilot.outcome}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How a Pilot Works */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How a pilot actually works
              </h2>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {[
                {
                  step: "Step 1",
                  title: "Quick intake (Day 1–3)",
                  body: "30–45 minute call or async Loom. We pick one workflow, one dataset, and one clear question."
                },
                {
                  step: "Step 2",
                  title: "Sketch & agree (Day 3–5)",
                  body: "You get a tiny plan: what we're building, what \"good\" looks like, who will touch it."
                },
                {
                  step: "Step 3",
                  title: "Build & tweak (Weeks 2–3)",
                  body: "I ship early versions, you poke holes, we adjust. Light check-ins, mostly async."
                },
                {
                  step: "Step 4",
                  title: "Share the story (Week 4)",
                  body: "You get the prototype, a short walkthrough, and a \"what we learned\" summary you can show around."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full relative">
                    <div className="text-sm font-bold text-primary mb-2">{item.step}</div>
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                    {index < 3 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="h-6 w-6 text-primary/30" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Button size="lg" className="text-base mb-2" asChild>
                <a href="mailto:hello@altruisticxai.com?subject=Book%20a%20Pilot%20Call">
                  Book a Pilot Call
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">
                Tell me the mess, we'll find a pilot.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why This Model */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Why this &quot;pilot lab&quot; instead of a big contract?
              </h2>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Less risk",
                  body: "Short sprints, clear end, no awkward \"we're stuck with this vendor\" feeling."
                },
                {
                  title: "More honesty",
                  body: "We keep the ugly parts in the story — what didn't work is just as valuable for your next grant or proposal."
                },
                {
                  title: "Real momentum",
                  body: "Instead of a 40-page strategy doc, you walk away with something that runs and real numbers to point at."
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full text-center">
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground">{card.body}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2">
              <p className="font-semibold">AltruisticX AI · Pilots4You Lab</p>
              <p className="text-sm text-muted-foreground">
                AI pilots for energy, education, and civic teams who want proof before promises.
              </p>
            </div>
          </div>
        </footer>
      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default Index;

// --- Sub-Components ---

function RecentBuilds() {
  const [projects, setProjects] = useState<Array<{
    id: string;
    title: string;
    sector: string;
    summary: string;
    tag: string;
  }>>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('slug, title, sector, summary, tag')
          .eq('featured', true)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;

        // Transform database data to match component expectations
        const formattedProjects = (data || []).map(project => ({
          id: project.slug,
          title: project.title,
          sector: project.sector,
          summary: project.summary,
          tag: project.tag || '',
        }));

        setProjects(formattedProjects);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Realtime subscription for projects
  useEffect(() => {
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        async () => {
          // Refetch projects when any change occurs
          try {
            const { data, error: fetchError } = await supabase
              .from('projects')
              .select('slug, title, sector, summary, tag')
              .eq('featured', true)
              .order('display_order', { ascending: true });

            if (fetchError) throw fetchError;

            const formattedProjects = (data || []).map(project => ({
              id: project.slug,
              title: project.title,
              sector: project.sector,
              summary: project.summary,
              tag: project.tag || '',
            }));

            setProjects(formattedProjects);
          } catch (err) {
            console.error('Error refreshing projects:', err);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section id="builds" className="py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Proof: Recent builds & pilots
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Real examples from energy, education, and founder-backed work. The
            details change, but the pattern is the same: pick a small surface
            area and ship something real.
          </p>
        </motion.div>

        {isLoadingProjects ? (
          <div className="mt-6">
            <CardsSkeleton />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center"
          >
            <p className="text-sm text-red-300">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 text-xs text-red-400 hover:text-red-300 underline"
            >
              Try again
            </button>
          </motion.div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center"
          >
            <p className="text-sm text-slate-400">No projects available yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            <CaseStudiesStack caseStudies={projects} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
function HowItWorks() {
  const steps = [{
    label: "Week 1",
    title: "Pinpoint & Prototype",
    body: "Share your challenge or goal—class doc, campus brief, stakeholder repo, student idea. Get a working skeleton in days."
  }, {
    label: "Weeks 2–3",
    title: "Refine & Connect",
    body: "Iterate with live feedback: data flows, interfaces, reporting. See your concept demo-ready for internal pilots, classes, or team reviews."
  }, {
    label: "Week 4",
    title: "Decide with Clarity",
    body: "Wrap with a real repo, guided walkthrough, and a clear decision: scale, pivot, or pause. Your code, data, and documentation are always yours."
  }];
  return (
    <section id="how" className="border-t border-slate-900/80 py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            How Our Experimental Pilot Works
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            <span className="text-primary font-medium">The Build Fast Kit: 4 weeks. 3 steps.</span> Intentionally simple. 
            No massive discovery phase, no 40-page decks. Just a tight loop around one meaningful pilot.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div 
              key={step.label} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -6,
                boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.2)",
                borderColor: "hsl(var(--primary) / 0.4)"
              }}
              className="group rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/50 to-slate-900/30 p-4 text-sm transition-all duration-300 cursor-default"
            >
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary group-hover:text-accent transition-colors">
                {step.label}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-50 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function PilotOffer() {
  return (
    <section id="pilot" className="border-t border-slate-900/80 py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Offer: Try a 4-Week Sprint
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Pilot-ready features every week, demoable anywhere. Async collaboration using Loom, Notion, GitHub, Figma—whatever 
              works for your team, classroom, or org. Zero lock-in: All repos, infra, and docs belong to you.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Pilot-ready features every week, demoable anywhere
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Async collaboration: Use Loom, Notion, GitHub, Figma—whatever works for your team, classroom, or org
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Zero lock-in: All repos, infra, and docs belong to you
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Perfect for fast validation, fundraising, leadership proof, classroom projects
              </li>
            </ul>
            
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <h3 className="text-sm font-semibold text-primary">Why experiment?</h3>
              <p className="mt-2 text-sm text-slate-300">
                Recruiting takes months, costs six figures, and adds complexity. Pilots deliver results now, 
                helping you move forward—whatever your goals.
              </p>
            </div>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                For comparison
              </div>
              <p className="mt-1 max-w-xs text-xs text-slate-400">
                Hiring in-house can take 3–6 months, $100k–$150k salary, plus
                30–40% in overhead—with no guarantee they can move quickly on a
                messy pilot.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs text-slate-400 sm:text-sm">
                Send a quick Loom or doc about your project. If it's a fit, we
                can start shipping next week.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.15)"
            }}
            className="group rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950/60 to-slate-900/40 p-4 text-xs text-slate-200 sm:p-5 transition-all duration-500 hover:border-primary/30 cursor-default"
          >
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400 group-hover:text-primary transition-colors">
              Good fit
            </div>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Early-stage product with unclear edges.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Energy, education, civic, or compliance work.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Need to show progress to leadership or funders.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Comfortable with async, fast iteration.
              </li>
            </ul>

            <div className="mt-5 text-xs font-mono uppercase tracking-[0.18em] text-slate-400 group-hover:text-accent transition-colors">
              Not a fit
            </div>
            <ul className="mt-2 space-y-1 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="opacity-50">✕</span>
                You want a big team and a huge scope from day one.
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-50">✕</span>
                You aren't ready to give real feedback weekly.
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-50">✕</span>
                You just need a static marketing site or brochure.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function WhoBenefits() {
  const audiences = ["Students bringing new ideas to life", "Teachers or nonprofits piloting campus or impact projects", "Board and governance teams seeking data clarity", "Solo founders wanting operational peace of mind", "B2B units innovating under fast timelines"];
  return (
    <section id="benefits" className="border-t border-slate-900/80 py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Who Benefits?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            This approach works for anyone who needs tangible progress without the overhead of traditional hiring.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Perfect For
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {audiences.map((audience, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  {audience}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Ideal Fit
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Real feedback weekly, ready to experiment, need clear results
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Not a Fit
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Big static sites, slow-moving teams, no feedback or iteration
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function FAQSection() {
  return (
    <section id="faq" className="border-t border-slate-900/80 py-8 sm:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }} 
        className="max-w-4xl mb-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold">
          FAQs & AI Assistant
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Get quick answers to common questions or ask our AI assistant about submissions and services.
        </p>
      </motion.div>

      {/* AI Assistant */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <FAQAssistant />
      </motion.div>

      {/* FAQ Items - Compact Grid Layout */}
      <dl className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {faqs.map((item, index) => (
          <motion.div 
            key={item.question} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 sm:p-4 hover:border-primary/30 transition-colors"
          >
            <dt className="text-xs sm:text-sm font-medium text-slate-50 leading-tight">
              {item.question}
            </dt>
            <dd className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.answer}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}

function SiteFooter() {
  return <footer className="border-t border-slate-900/80 py-6">
      <div className="flex flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} AltruisticX · AI + Product Engineer</div>
        <div className="flex flex-wrap gap-3">
          <span>Async-first · privacy-aware · built for pilots, classrooms, and fast-moving teams</span>
        </div>
      </div>
    </footer>;
}