import { supabase } from "@/integrations/supabase/client";

export interface ProjectRow {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  tag: string | null;
  image_url: string | null;
}

export interface Project {
  id: string;
  title: string;
  sector: string;
  summary: string;
  tag: string;
  image_url: string | null;
}

/**
 * Fetches featured projects from the database
 */
export async function fetchFeaturedProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("slug, title, sector, summary, tag, image_url")
    .eq("featured", true)
    .order("display_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
}

/**
 * Subscribes to real-time changes on the projects table
 */
export function subscribeToProjectChanges(callback: () => void) {
  const channel = supabase
    .channel("projects-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "projects" },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Maps raw project rows to the Project interface
 */
export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.slug,
    title: row.title,
    sector: row.sector,
    summary: row.summary,
    tag: row.tag || "",
    image_url: row.image_url || null,
  };
}
