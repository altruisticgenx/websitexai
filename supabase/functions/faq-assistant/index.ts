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

    // Get aggregated stats about submissions and projects
    const [submissions, projects, faqs] = await Promise.all([
      supabase
        .from("contact_submissions")
        .select("project_type, created_at, email_sent, message")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("projects")
        .select("title, sector, summary, status, technologies")
        .eq("featured", true),
      supabase
        .from("faqs")
        .select("question, answer, category")
        .eq("active", true)
    ]);

    if (submissions.error || projects.error || faqs.error) {
      console.error("Database errors:", { submissions: submissions.error, projects: projects.error, faqs: faqs.error });
      throw new Error("Failed to fetch data");
    }

    // Analyze submission patterns
    const submissionData = submissions.data || [];
    const projectData = projects.data || [];
    const faqData = faqs.data || [];
    
    const totalSubmissions = submissionData.length;
    const projectTypes = submissionData.reduce((acc: Record<string, number>, sub) => {
      acc[sub.project_type] = (acc[sub.project_type] || 0) + 1;
      return acc;
    }, {});

    const emailsSent = submissionData.filter(s => s.email_sent).length;
    const avgResponseTime = "24-48 hours"; // Could calculate from actual data
    
    // Extract insights from messages
    const commonTopics = submissionData
      .map(s => s.message)
      .join(" ")
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 5)
      .slice(0, 20);

    // Project insights
    const sectorBreakdown = projectData.reduce((acc: Record<string, number>, proj) => {
      acc[proj.sector] = (acc[proj.sector] || 0) + 1;
      return acc;
    }, {});

    const popularTechs = projectData
      .flatMap(p => p.technologies || [])
      .reduce((acc: Record<string, number>, tech) => {
        acc[tech] = (acc[tech] || 0) + 1;
        return acc;
      }, {});

    const context = `
You are an advanced AI assistant for AltruisticX AI - a senior AI/product engineering service specializing in energy, education, and civic innovation pilots.

Your expertise includes:
- Understanding project requirements and timelines
- Explaining the 4-week pilot process in detail
- Providing insights on submission data and project trends
- Recommending best practices for successful pilots
- Answering questions about pricing, workflow, and collaboration

Current Platform Intelligence:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Submission Analytics:
- Total inquiries: ${totalSubmissions}
- Project type distribution: ${JSON.stringify(projectTypes, null, 2)}
- Confirmation rate: ${emailsSent}/${totalSubmissions} (${totalSubmissions > 0 ? Math.round((emailsSent/totalSubmissions)*100) : 0}%)
- Average response time: ${avgResponseTime}
- Common topics: ${commonTopics.slice(0, 10).join(", ")}

🎯 Portfolio Insights:
- Active projects: ${projectData.length}
- Sector focus: ${JSON.stringify(sectorBreakdown, null, 2)}
- Popular technologies: ${JSON.stringify(Object.entries(popularTechs).slice(0, 8), null, 2)}
- Success rate: High completion rate for 4-week pilots

📚 Knowledge Base:
${faqData.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")}

Instructions:
1. Analyze the user's question deeply - consider intent, context, and urgency
2. Provide detailed, actionable answers with specific examples when relevant
3. Use data and statistics to support your responses
4. If asking about pricing: Mention the 4-week pilot at $1,150/week
5. If asking about process: Break down the weekly structure clearly
6. If asking about fit: Reference actual project types and sectors
7. Be conversational but professional - like a senior consultant
8. Always encourage booking a 30-min intro call for complex inquiries
9. If the question is off-topic, politely redirect while being helpful

Respond with confidence, clarity, and actionable insights.
`;

    // Call Lovable AI Gateway with enhanced model
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
        model: "google/gemini-2.5-pro", // Using the more powerful model for better reasoning
        messages: [
          { role: "system", content: context },
          { role: "user", content: question }
        ],
        temperature: 0.7,
        max_tokens: 1000,
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
