-- Enhance projects table to support lab notebook format
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS hypothesis text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Recently Shipped',
ADD COLUMN IF NOT EXISTS week_number integer,
ADD COLUMN IF NOT EXISTS context_note text;

-- Update existing projects with sample data for lab notebook feel
UPDATE public.projects 
SET 
  hypothesis = CASE 
    WHEN slug = 'sales-copilot' THEN 'Can AI surface high-intent leads from unstructured sales notes and email threads?'
    WHEN slug = 'founder-os' THEN 'Can a single dashboard replace 3-4 separate tools for solo founders?'
    WHEN slug = 'energy-analytics' THEN 'Can we turn raw meter data into actionable savings opportunities without custom dev?'
    WHEN slug = 'edtech-portal' THEN 'Can we track pilot outcomes in a way that actually helps defend funding?'
    ELSE 'Can we solve a specific problem in 4 weeks or less?'
  END,
  status = CASE 
    WHEN featured = true THEN 'Now Shipping'
    ELSE 'Recently Shipped'
  END,
  week_number = CASE 
    WHEN slug = 'sales-copilot' THEN 3
    WHEN slug = 'founder-os' THEN 4
    WHEN slug = 'energy-analytics' THEN 2
    WHEN slug = 'edtech-portal' THEN 4
    ELSE 2
  END,
  context_note = CASE 
    WHEN slug = 'sales-copilot' THEN 'B2B startup · San Francisco · AI-first approach'
    WHEN slug = 'founder-os' THEN 'Solo founder · Remote · Operational clarity'
    WHEN slug = 'energy-analytics' THEN 'Higher ed campus · Pennsylvania · 200+ sites'
    WHEN slug = 'edtech-portal' THEN 'Education nonprofit · Boston · Impact tracking'
    ELSE sector || ' · Week ' || COALESCE(week_number, 2) || ' of 4'
  END
WHERE slug IN ('sales-copilot', 'founder-os', 'energy-analytics', 'edtech-portal');