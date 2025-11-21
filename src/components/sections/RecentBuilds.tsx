import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Stack } from "@/components/layout/Stack";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { PilotCarousel3D } from "@/components/PilotCarousel3D";
import { PilotCard } from "@/components/PilotCard";
import { CardsSkeleton } from "@/components/skeletons/SectionSkeleton";
import { useProjects } from "@/hooks/use-projects";
import {
  getSectorAudience,
  getProjectProblem,
  getProjectOutcome,
  getTimeToDemo,
} from "@/lib/projectTransformers";

export const RecentBuilds: React.FC = React.memo(() => {
  const { projects, isLoading: isLoadingProjects, error, refetch } = useProjects();

  return (
    <Section id="builds" spacing="normal">
      <ParallaxBackground
        speed={0.6}
        gradient="from-primary/8 via-accent/8 to-transparent"
        meshVariant="primary"
        meshIntensity="medium"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
      </ParallaxBackground>

      <Stack gap="lg">
        <header className="max-w-2xl">
          <h2 className="heading-3">Recent Builds</h2>
          <p className="body-lg text-muted-foreground mt-2">
            Small scope, real results—across energy, education, and founder projects.
          </p>
        </header>

        {isLoadingProjects ? (
          <CardsSkeleton />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center"
            role="alert"
            aria-live="polite"
          >
            <p className="body-sm text-red-300">{error}</p>
            <button onClick={refetch} className="mt-3 body-xs underline text-red-400 hover:text-red-300">
              Try again
            </button>
          </motion.div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center"
          >
            <p className="body-sm text-slate-400">No projects available yet. Check back soon!</p>
          </motion.div>
        ) : (
          <PilotCarousel3D autoPlayInterval={6000}>
            {projects.map((project) => {
              const imageUrl = project.image_url || `https://duuhvgjdzaowrwonqhtz.supabase.co/storage/v1/object/public/project-images/${project.id}.jpg`;

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
        )}
      </Stack>
    </Section>
  );
});

RecentBuilds.displayName = "RecentBuilds";
