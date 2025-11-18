-- Fix contact_submissions RLS policy
-- Remove the overly permissive policy that allows all authenticated users to view submissions
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contact_submissions;

-- Contact submissions should only be accessible via service role (backend functions)
-- No direct client access to this sensitive data

-- Fix faq_conversations RLS policy
-- Remove the misleading policy that allows everyone to read all conversations
DROP POLICY IF EXISTS "Anyone can read their own conversations" ON public.faq_conversations;

-- Create a proper policy that restricts access by session_id
-- Users can only read conversations matching their session
CREATE POLICY "Users can read own session conversations"
ON public.faq_conversations
FOR SELECT
TO public
USING (
  session_id = COALESCE(
    current_setting('request.jwt.claims', true)::json->>'session_id',
    current_setting('request.headers', true)::json->>'x-session-id'
  )
);

-- Keep the existing insert and update policies as they are already session-restricted