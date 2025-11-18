import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactConfirmationRequest {
  name: string;
  email: string;
  projectType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, projectType }: ContactConfirmationRequest = await req.json();

    console.log("Sending confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "AltruisticX AI <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for reaching out! - AltruisticX AI",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981; font-size: 24px; margin-bottom: 20px;">Thanks for reaching out, ${name}!</h1>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            I've received your message about <strong>${projectType}</strong> and will get back to you within 24 hours.
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

    return new Response(JSON.stringify(emailResponse), {
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
