-- Fix critical RLS policy: Ensure UPDATE operations filter by session_id
-- Drop the existing broken UPDATE policy
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.faq_conversations;

-- Create a secure UPDATE policy that filters by session_id
CREATE POLICY "Users can update their own conversations"
ON public.faq_conversations
FOR UPDATE
USING (
  session_id = COALESCE(
    (current_setting('request.jwt.claims', true)::json->>'session_id'),
    (current_setting('request.headers', true)::json->>'x-session-id')
  )
);