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
    console.log("📝 Received question:", question);

    if (!question || typeof question !== "string") {
      console.error("❌ Invalid question format");
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

    // Get aggregated stats about submissions and projects (optimized)
    console.log("🔍 Fetching database context...");
    const [submissions, projects, faqs] = await Promise.all([
      supabase
        .from("contact_submissions")
        .select("project_type, created_at, email_sent")
        .order("created_at", { ascending: false })
        .limit(20), // Reduced from 50 for efficiency
      supabase
        .from("projects")
        .select("title, sector, summary, technologies")
        .eq("featured", true)
        .limit(10), // Added limit
      supabase
        .from("faqs")
        .select("question, answer, category")
        .eq("active", true)
        .limit(15) // Added limit
    ]);

    if (submissions.error || projects.error || faqs.error) {
      console.error("❌ Database errors:", { submissions: submissions.error, projects: projects.error, faqs: faqs.error });
      throw new Error("Failed to fetch data");
    }

    console.log("✅ Database context fetched successfully");

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

    const context = `You are an AI assistant for AltruisticX AI - a senior AI/product engineering service specializing in energy, education, and civic innovation pilots.

🎯 Your Role:
- Answer questions about AltruisticX AI's services, approach, and offerings
- Provide insights based on real project data and submission patterns
- Be conversational, professional, and helpful
- When users ask complex questions or want to discuss specific projects, encourage booking a 30-min intro call at altruisticxai@gmail.com

📊 Real-Time Context:
- Total recent inquiries: ${totalSubmissions}
- Project types breakdown: ${JSON.stringify(projectTypes)}
- Email confirmation rate: ${totalSubmissions > 0 ? Math.round((emailsSent/totalSubmissions)*100) : 0}%
- Active featured projects: ${projectData.length}
- Sector distribution: ${JSON.stringify(sectorBreakdown)}
- Most used technologies: ${Object.entries(popularTechs).slice(0, 5).map(([k, v]) => `${k} (${v})`).join(", ")}

📚 Common Questions & Answers:
${faqData.map(faq => `Q: ${faq.question}\nA: ${faq.answer}\n---`).join("\n")}

🔑 Key Service Details:
- **Pricing**: 4-week pilot at $1,150/week (week-to-week, no long-term contracts)
- **Focus Areas**: Energy analytics, education tech, civic innovation, B2B pilots
- **Approach**: Async-first collaboration (Loom, Notion, GitHub, Figma)
- **Delivery**: Weekly concrete deliverables - not just decks, but working code and flows
- **Philosophy**: Ship pilot-ready tech in weekly sprints, no 6-month hiring slog
- **Contact**: altruisticxai@gmail.com for 30-min intro calls

💡 Response Guidelines:
1. Keep answers concise and actionable (2-4 sentences ideal)
2. Reference real stats when relevant (e.g., "Most clients start with ${Object.entries(projectTypes).sort((a,b) => b[1] - a[1])[0]?.[0] || 'pilot'} projects")
3. For technical questions, mention relevant technologies from our stack: ${Object.keys(popularTechs).slice(0, 3).join(", ")}
4. If asked about specific sectors, highlight our ${Object.keys(sectorBreakdown).join(", ")} experience
5. Always be transparent about what we do and don't do
6. For pricing, project scoping, or custom requirements → encourage direct contact
7. Use emojis sparingly but strategically for readability

🚫 Don't:
- Make up project details or capabilities not in the context
- Promise specific timelines without knowing project scope
- Share sensitive client information
- Provide legal or compliance advice

Remember: You're here to help potential clients understand if AltruisticX AI is a good fit for their needs.`;

    // Call Lovable AI Gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("❌ LOVABLE_API_KEY not configured");
      throw new Error("LOVABLE_API_KEY not configured");
    }

    console.log("🤖 Calling Lovable AI Gateway...");
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Fast, balanced, and cost-efficient
        messages: [
          { role: "system", content: context },
          { role: "user", content: question }
        ],
        max_completion_tokens: 1000, // Optimized for detailed yet concise responses
        temperature: 0.7, // Balanced creativity and consistency
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("❌ AI Gateway error:", {
        status: aiResponse.status,
        statusText: aiResponse.statusText,
        body: errorText
      });
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI Gateway request failed: ${aiResponse.status} ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log("✅ AI response structure:", { 
      hasChoices: !!aiData.choices, 
      choicesLength: aiData.choices?.length,
      hasContent: !!aiData.choices?.[0]?.message?.content 
    });

    const answer = aiData.choices?.[0]?.message?.content;

    if (!answer) {
      console.error("❌ No answer in AI response:", JSON.stringify(aiData));
      throw new Error("No response from AI");
    }

    console.log("✅ Successfully generated answer");
    return new Response(
      JSON.stringify({ answer }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("❌ Error in faq-assistant function:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
