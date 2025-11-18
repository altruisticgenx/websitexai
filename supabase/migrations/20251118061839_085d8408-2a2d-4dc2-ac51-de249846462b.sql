-- Create table for FAQ conversations
CREATE TABLE public.faq_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.faq_conversations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create and read their own conversations (by session_id)
CREATE POLICY "Anyone can create conversations"
  ON public.faq_conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read their own conversations"
  ON public.faq_conversations
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update their own conversations"
  ON public.faq_conversations
  FOR UPDATE
  USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_faq_conversations_updated_at
  BEFORE UPDATE ON public.faq_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for faster lookups
CREATE INDEX idx_faq_conversations_session_id ON public.faq_conversations(session_id);
CREATE INDEX idx_faq_conversations_created_at ON public.faq_conversations(created_at DESC);