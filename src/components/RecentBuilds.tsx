import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { PilotCarousel3D } from "@/components/PilotCarousel3D";
import { PilotCard } from "@/components/PilotCard";
import { CardsSkeleton } from "@/components/skeletons/SectionSkeleton";
import {
  getSectorAudience,
  getProjectProblem,
  getProjectOutcome,
  getTimeToDemo,
  shallowArrayEqual,
} from "@/utils/projectHelpers";

type Project = {
  id: string;
  title: string;
  sector: string;
  summary: string;
  tag: string;
};

export const RecentBuilds: React.FC = React.memo(() => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapProjects = useCallback((rows: any[] | null): Project[] => {
    return (rows ?? []).map((p) => ({
      id: p.slug,
      title: p.title,
      sector: p.sector,
      summary: p.summary,
      tag: p.tag || "",
    }));
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoadingProjects(true);
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("slug, title, sector, summary, tag")
        .eq("featured", true)
        .order("display_order", { ascending: true });

      if (fetchError) throw fetchError;

      setProjects((prev) => {
        const next = mapProjects(data);
        return shallowArrayEqual(prev, next) ? prev : next;
      });
      setError(null);
    } catch (e) {
      console.error("Error fetching projects:", e);
      setError("Failed to load projects");
    } finally {
      setIsLoadingProjects(false);
    }
  }, [mapProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("projects-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        fetchProjects
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProjects]);

  return (
    <section id="builds" className="relative py-10 lg:py-16">
      <ParallaxBackground
        speed={0.6}
        gradient="from-primary/8 via-accent/8 to-transparent"
        meshVariant="primary"
        meshIntensity="medium"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
      </ParallaxBackground>

      <div className="mx-auto w-full max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <h2 className="heading-3 text-foreground">Recent Builds</h2>
          <p className="body-base text-muted-foreground">
            Small scope, real results—across energy, education, and founder projects.
          </p>
        </motion.div>

        {isLoadingProjects ? (
          <div className="mt-6">
            <CardsSkeleton />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center"
            role="alert"
            aria-live="polite"
          >
            <p className="text-sm text-red-300">{error}</p>
            <button
              onClick={fetchProjects}
              className="mt-3 text-xs underline text-red-400 hover:text-red-300"
            >
              Try again
            </button>
          </motion.div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center"
          >
            <p className="text-sm text-slate-400">No projects available yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8"
          >
            <PilotCarousel3D autoPlayInterval={6000}>
              {projects.map((project) => {
                const imageUrl = `https://duuhvgjdzaowrwonqhtz.supabase.co/storage/v1/object/public/project-images/${project.id}.jpg`;

                return (
                  <PilotCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    sector={project.sector}
                    whoFor={getSectorAudience(project.sector)}
                    problem={getProjectProblem(project.id)}
                    outcome={getProjectOutcome(project.id)}
                    timeToDemo={getTimeToDemo(project.id)}
                    tag={project.tag}
                    imageUrl={imageUrl}
                  />
                );
              })}
            </PilotCarousel3D>
          </motion.div>
        )}
      </div>
    </section>
  );
});

RecentBuilds.displayName = "RecentBuilds";
