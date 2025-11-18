import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactConfirmationRequest {
  submissionId: string;
}

// Rate limiting configuration
const RATE_LIMIT_MAX = 5; // Maximum requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

// Helper to get client IP
const getClientIP = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
         req.headers.get("x-real-ip") || 
         "unknown";
};

// Helper to check rate limit
const checkRateLimit = async (supabase: any, ipAddress: string): Promise<{ allowed: boolean; message?: string }> => {
  const endpoint = "send-contact-confirmation";
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

  // Check existing rate limit record
  const { data: existing, error: fetchError } = await supabase
    .from("email_rate_limits")
    .select("*")
    .eq("ip_address", ipAddress)
    .eq("endpoint", endpoint)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching rate limit:", fetchError);
    return { allowed: true }; // Allow on error to not block legitimate users
  }

  if (!existing) {
    // Create new rate limit record
    await supabase
      .from("email_rate_limits")
      .insert({
        ip_address: ipAddress,
        endpoint,
        request_count: 1,
        window_start: now,
      });
    return { allowed: true };
  }

  // Check if window has expired
  const existingWindowStart = new Date(existing.window_start);
  if (existingWindowStart < windowStart) {
    // Reset the window
    await supabase
      .from("email_rate_limits")
      .update({
        request_count: 1,
        window_start: now,
      })
      .eq("id", existing.id);
    return { allowed: true };
  }

  // Check if rate limit exceeded
  if (existing.request_count >= RATE_LIMIT_MAX) {
    const resetTime = new Date(existingWindowStart.getTime() + RATE_LIMIT_WINDOW_MS);
    const minutesUntilReset = Math.ceil((resetTime.getTime() - now.getTime()) / 60000);
    return { 
      allowed: false, 
      message: `Rate limit exceeded. Maximum ${RATE_LIMIT_MAX} emails per hour. Please try again in ${minutesUntilReset} minutes.` 
    };
  }

  // Increment counter
  await supabase
    .from("email_rate_limits")
    .update({
      request_count: existing.request_count + 1,
    })
    .eq("id", existing.id);

  return { allowed: true };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role for database operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get client IP for rate limiting
    const clientIP = getClientIP(req);
    console.log("Request from IP:", clientIP);

    // Check rate limit
    const rateLimitCheck = await checkRateLimit(supabase, clientIP);
    if (!rateLimitCheck.allowed) {
      console.warn("Rate limit exceeded for IP:", clientIP);
      return new Response(
        JSON.stringify({ error: rateLimitCheck.message }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Parse and validate request
    const { submissionId }: ContactConfirmationRequest = await req.json();

    if (!submissionId || typeof submissionId !== "string") {
      console.error("Invalid submissionId:", submissionId);
      return new Response(
        JSON.stringify({ error: "Invalid or missing submissionId" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify submission exists and email hasn't been sent yet
    const { data: submission, error: fetchError } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("id", submissionId)
      .eq("email_sent", false)
      .single();

    if (fetchError || !submission) {
      console.error("Submission not found or already processed:", submissionId, fetchError);
      return new Response(
        JSON.stringify({ error: "Submission not found or email already sent" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Sending confirmation email to:", submission.email);

    // Sanitize data for email (prevent HTML injection)
    const sanitize = (str: string): string => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const safeName = sanitize(submission.name);
    const safeProjectType = sanitize(submission.project_type);

    const emailResponse = await resend.emails.send({
      from: "AltruisticX AI <onboarding@resend.dev>",
      to: [submission.email],
      subject: "Thanks for reaching out! - AltruisticX AI",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981; font-size: 24px; margin-bottom: 20px;">Thanks for reaching out, ${safeName}!</h1>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            I've received your message about <strong>${safeProjectType}</strong> and will get back to you within 24 hours.
          </p>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            In the meantime, feel free to check out my work at <a href="https://altruisticxai.com" style="color: #10b981; text-decoration: none;">altruisticxai.com</a>.
          </p>
          
          <div style="background: #f1f5f9; border-left: 4px solid #10b981; padding: 16px; margin: 24px 0; border-radius: 4px;">
            <p style="color: #475569; font-size: 14px; margin: 0;">
              <strong>Quick reminder:</strong> I work with energy, education, civic teams, and founders on weekly sprints—turning pilots into production-ready tools.
            </p>
          </div>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            Looking forward to connecting soon.
          </p>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Best,<br>
            <strong>AltruisticX AI</strong><br>
            <span style="color: #64748b; font-size: 14px;">AI + Product Engineering</span>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
          
          <p style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
            This is an automated confirmation email. Please don't reply directly to this message.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Mark email as sent
    const { error: updateError } = await supabase
      .from("contact_submissions")
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      })
      .eq("id", submissionId);

    if (updateError) {
      console.error("Failed to update email_sent status:", updateError);
      // Don't fail the request, email was sent successfully
    }

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
