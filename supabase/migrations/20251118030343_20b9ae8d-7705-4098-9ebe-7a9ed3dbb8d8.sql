-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;

-- Create a new PERMISSIVE policy that allows anyone to insert
CREATE POLICY "Anyone can submit contact forms"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);