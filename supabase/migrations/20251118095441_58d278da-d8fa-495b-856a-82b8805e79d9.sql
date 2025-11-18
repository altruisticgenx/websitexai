-- Add missing columns to projects table for case study data
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS tagline text,
ADD COLUMN IF NOT EXISTS challenge text,
ADD COLUMN IF NOT EXISTS solution text,
ADD COLUMN IF NOT EXISTS outcomes text[],
ADD COLUMN IF NOT EXISTS phases jsonb,
ADD COLUMN IF NOT EXISTS duration text,
ADD COLUMN IF NOT EXISTS timeline text;