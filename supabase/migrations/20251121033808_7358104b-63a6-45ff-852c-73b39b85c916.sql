-- Fix faq_conversations RLS policies
-- Issue: UPDATE policy uses USING (true) allowing anyone to modify any conversation
-- Issue: DELETE policy is completely missing, causing "Clear History" to fail

-- Drop the broken UPDATE policy
DROP POLICY IF EXISTS "Anyone can update their own conversations" 
ON public.faq_conversations;

-- Create proper UPDATE policy filtered by session_id
CREATE POLICY "Users can update their own conversations"
ON public.faq_conversations
FOR UPDATE
TO public
USING (
  session_id = COALESCE(
    current_setting('request.jwt.claims', true)::json->>'session_id',
    current_setting('request.headers', true)::json->>'x-session-id'
  )
);

-- Create missing DELETE policy filtered by session_id
CREATE POLICY "Users can delete their own conversations"
ON public.faq_conversations
FOR DELETE
TO public
USING (
  session_id = COALESCE(
    current_setting('request.jwt.claims', true)::json->>'session_id',
    current_setting('request.headers', true)::json->>'x-session-id'
  )
);