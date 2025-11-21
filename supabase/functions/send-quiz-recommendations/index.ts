import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuizRecommendation {
  title: string;
  domain: string;
  reason: string;
  link: string;
}

interface QuizRecommendationsRequest {
  submissionId: string;
}

// Rate limiting configuration
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const getClientIP = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
         req.headers.get("x-real-ip") || 
         "unknown";
};

const checkRateLimit = async (supabase: any, ipAddress: string): Promise<{ allowed: boolean; message?: string }> => {
  const endpoint = "send-quiz-recommendations";
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

  const { data: existing, error: fetchError } = await supabase
    .from("email_rate_limits")
    .select("*")
    .eq("ip_address", ipAddress)
    .eq("endpoint", endpoint)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching rate limit:", fetchError);
    return { allowed: true };
  }

  if (!existing) {
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

  const existingWindowStart = new Date(existing.window_start);
  if (existingWindowStart < windowStart) {
    await supabase
      .from("email_rate_limits")
      .update({
        request_count: 1,
        window_start: now,
      })
      .eq("id", existing.id);
    return { allowed: true };
  }

  if (existing.request_count >= RATE_LIMIT_MAX) {
    const resetTime = new Date(existingWindowStart.getTime() + RATE_LIMIT_WINDOW_MS);
    const minutesUntilReset = Math.ceil((resetTime.getTime() - now.getTime()) / 60000);
    return { 
      allowed: false, 
      message: `Rate limit exceeded. Maximum ${RATE_LIMIT_MAX} quiz emails per hour. Please try again in ${minutesUntilReset} minutes.` 
    };
  }

  await supabase
    .from("email_rate_limits")
    .update({
      request_count: existing.request_count + 1,
    })
    .eq("id", existing.id);

  return { allowed: true };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const clientIP = getClientIP(req);
    console.log("Quiz recommendation request from IP:", clientIP);

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

    const { submissionId }: QuizRecommendationsRequest = await req.json();

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

    const { data: submission, error: fetchError } = await supabase
      .from("pilot_quiz_submissions")
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

    console.log("Sending quiz recommendations to:", submission.email);

    const recommendations = submission.recommendations as QuizRecommendation[];
    const baseUrl = "https://altruisticxai.com";

    const recommendationsHTML = recommendations.map((rec, index) => `
      <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 16px; margin: 16px 0; border-radius: 4px;">
        <h3 style="color: #10b981; font-size: 18px; margin: 0 0 8px 0;">
          ${index + 1}. ${rec.title}
        </h3>
        <p style="color: #475569; font-size: 14px; margin: 4px 0;">
          <strong>Domain:</strong> ${rec.domain}
        </p>
        <p style="color: #475569; font-size: 14px; margin: 4px 0 12px 0;">
          <strong>Why we recommend this:</strong> ${rec.reason}
        </p>
        <a href="${baseUrl}${rec.link}" style="display: inline-block; background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500;">
          View Pilot Details →
        </a>
      </div>
    `).join("");

    const emailResponse = await resend.emails.send({
      from: "AltruisticX AI <onboarding@resend.dev>",
      to: [submission.email],
      subject: "Your Personalized Pilot Recommendations - AltruisticX AI",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981; font-size: 24px; margin-bottom: 20px;">Your Pilot Recommendations</h1>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            Based on your answers, here are the AI pilots that best match your needs:
          </p>
          
          ${recommendationsHTML}
          
          <div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 16px; margin: 24px 0; border-radius: 8px;">
            <h3 style="color: #1e40af; font-size: 16px; margin: 0 0 8px 0;">
              Ready to get started?
            </h3>
            <p style="color: #475569; font-size: 14px; margin: 0 0 12px 0;">
              Book a free 15-minute consultation to discuss your project and see if we're a good fit.
            </p>
            <a href="${baseUrl}#contact" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
              Schedule a Call
            </a>
          </div>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            All pilots deliver:
          </p>
          <ul style="color: #475569; font-size: 14px; line-height: 1.8; margin-bottom: 24px;">
            <li>Week 1 demo</li>
            <li>4-week delivery timeline</li>
            <li>1-2 features shipped per week</li>
            <li>Full code ownership</li>
            <li>No vendor lock-in</li>
          </ul>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">
            Questions? Just reply to this email.
          </p>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-top: 24px;">
            Best,<br>
            <strong>AltruisticX AI</strong><br>
            <span style="color: #64748b; font-size: 14px;">AI + Product Engineering</span>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
          
          <p style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
            You received this email because you completed our pilot recommendation quiz at ${baseUrl}
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    const { error: updateError } = await supabase
      .from("pilot_quiz_submissions")
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      })
      .eq("id", submissionId);

    if (updateError) {
      console.error("Failed to update email_sent status:", updateError);
    }

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quiz-recommendations function:", error);
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
