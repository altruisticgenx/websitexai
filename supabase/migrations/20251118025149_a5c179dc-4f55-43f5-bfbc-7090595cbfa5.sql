-- Add email_sent tracking to contact_submissions
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMP WITH TIME ZONE;

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.email_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ip_address, endpoint)
);

-- Enable RLS on rate limits table
ALTER TABLE public.email_rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Only the system can manage rate limits (no user access needed)
CREATE POLICY "System manages rate limits"
ON public.email_rate_limits
FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_email_rate_limits_ip_endpoint 
ON public.email_rate_limits(ip_address, endpoint);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email_sent 
ON public.contact_submissions(email_sent, id);