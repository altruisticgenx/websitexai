import { useState, useEffect, useCallback } from "react";
import {
  fetchFeaturedProjects,
  subscribeToProjectChanges,
  mapProjectRow,
  type Project,
} from "@/services/projects.service";

function shallowArrayEqual<T extends Record<string, any>>(
  a: T[],
  b: T[]
): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const aa = a[i];
    const bb = b[i];
    if (!aa || !bb) return false;
    const keys = new Set([...Object.keys(aa), ...Object.keys(bb)]);
    for (const k of keys) if (aa[k] !== bb[k]) return false;
  }
  return true;
}

interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchFeaturedProjects();

      setProjects((prev) => {
        const next = data.map(mapProjectRow);
        return shallowArrayEqual(prev, next) ? prev : next;
      });
      setError(null);
    } catch (e) {
      console.error("Error fetching projects:", e);
      setError("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    const unsubscribe = subscribeToProjectChanges(loadProjects);
    return unsubscribe;
  }, [loadProjects]);

  return {
    projects,
    isLoading,
    error,
    refetch: loadProjects,
  };
}
