-- Create pilot_quiz_submissions table
CREATE TABLE public.pilot_quiz_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  answers JSONB NOT NULL,
  recommendations JSONB NOT NULL,
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pilot_quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can submit quiz)
CREATE POLICY "Anyone can submit quiz results"
ON public.pilot_quiz_submissions
FOR INSERT
WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_pilot_quiz_email ON public.pilot_quiz_submissions(email);
CREATE INDEX idx_pilot_quiz_created_at ON public.pilot_quiz_submissions(created_at DESC);