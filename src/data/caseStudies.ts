export interface CaseStudyPhase {
  week: string;
  milestone: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  technologies: string[];
  timeline: string;
  duration: string;
  phases: CaseStudyPhase[];
  tag?: string;
}

// Case study data is now stored in the Supabase projects table
// Use getCaseStudyBySlug() and getAllCaseStudies() to fetch data

import { supabase } from "@/integrations/supabase/client";

export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching case study:', error);
    return null;
  }

  return {
    id: data.slug,
    title: data.title,
    sector: data.sector,
    tagline: data.tagline || '',
    summary: data.summary,
    challenge: data.challenge || '',
    solution: data.solution || '',
    outcomes: data.outcomes || [],
    technologies: data.technologies || [],
    timeline: data.timeline || '',
    duration: data.duration || '',
    phases: (data.phases as unknown as CaseStudyPhase[]) || [],
    tag: data.tag || undefined,
  };
};

export const getAllCaseStudies = async (): Promise<CaseStudy[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching case studies:', error);
    return [];
  }

  return data.map(project => ({
    id: project.slug,
    title: project.title,
    sector: project.sector,
    tagline: project.tagline || '',
    summary: project.summary,
    challenge: project.challenge || '',
    solution: project.solution || '',
    outcomes: project.outcomes || [],
    technologies: project.technologies || [],
    timeline: project.timeline || '',
    duration: project.duration || '',
    phases: (project.phases as unknown as CaseStudyPhase[]) || [],
    tag: project.tag || undefined,
  }));
};
