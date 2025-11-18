import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client with service role for data access
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get aggregated stats about submissions
    const { data: submissions, error: dbError } = await supabase
      .from("contact_submissions")
      .select("project_type, created_at, email_sent")
      .order("created_at", { ascending: false })
      .limit(100);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to fetch submission data");
    }

    // Prepare context about submissions
    const totalSubmissions = submissions?.length || 0;
    const projectTypes = submissions?.reduce((acc: Record<string, number>, sub) => {
      acc[sub.project_type] = (acc[sub.project_type] || 0) + 1;
      return acc;
    }, {});

    const emailsSent = submissions?.filter(s => s.email_sent).length || 0;
    const recentSubmissions = submissions?.slice(0, 5).map(s => ({
      type: s.project_type,
      date: new Date(s.created_at).toLocaleDateString()
    }));

    const context = `
You are an AI assistant helping with questions about contact form submissions for AltruisticX AI.

Current submission statistics:
- Total submissions: ${totalSubmissions}
- Project type breakdown: ${JSON.stringify(projectTypes, null, 2)}
- Confirmation emails sent: ${emailsSent}
- Recent submissions (last 5): ${JSON.stringify(recentSubmissions, null, 2)}

Answer the user's question based on this data. Be concise and helpful. If the question is not about submissions or FAQs, politely redirect them to contact directly.
`;

    // Call Lovable AI Gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: context },
          { role: "user", content: question }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error("AI Gateway request failed");
    }

    const aiData = await aiResponse.json();
    const answer = aiData.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error("No response from AI");
    }

    return new Response(
      JSON.stringify({ answer }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in faq-assistant function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
