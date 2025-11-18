import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CaseStudiesStack } from "@/components/ui/animated-cards-stack";
import { supabase } from "@/integrations/supabase/client";

export function RecentBuilds() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Recent Builds
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Proof: Pilots &amp; Fast Iterations
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            <span className="text-primary font-medium">Education.</span>{" "}
            <span className="text-primary font-medium">Energy.</span>{" "}
            <span className="text-primary font-medium">Founders.</span> Real pilots shipped in tight 4-week sprints—not 6-month roadmaps. Small surface area, real impact.
          </p>
        </motion.div>

        {isLoadingProjects ? (
          <div className="mt-6 flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
            {error}
          </div>
        ) : (
          <div className="mt-6">
            <CaseStudiesStack caseStudies={projects} />
          </div>
        )}
      </div>
    </section>
  );
}
