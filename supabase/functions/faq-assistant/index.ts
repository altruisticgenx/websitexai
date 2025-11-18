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
    const { question, conversationHistory = [] } = await req.json();
    console.log("📝 Received question:", question);
    console.log("💬 Conversation history length:", conversationHistory.length);

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

📊 Real-Time Stats:
- Total inquiries: ${totalSubmissions}
- Project types: ${JSON.stringify(projectTypes)}
- Active projects: ${projectData.length}
- Sectors: ${JSON.stringify(sectorBreakdown)}
- Tech stack: ${Object.entries(popularTechs).slice(0, 5).map(([k, v]) => k).join(", ")}

📚 FAQs:
${faqData.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")}

🎯 Key Offering:
- 4-week pilot at $1,150/week
- Week-to-week, no lock-in, you keep the code
- Energy, education, civic sectors
- Async-first: Loom, Notion, GitHub, Figma

📅 Booking Instructions:
When users want to book a call or express interest in scheduling, respond with:
"I'd be happy to help you schedule a call! You can book a 30-minute intro call at: https://scheduler.zoom.us/altruistic-xai

This link will take you directly to the scheduling page where you can pick a time that works for you."

IMPORTANT BOOKING KEYWORDS: If the user says "book", "schedule", "call", "meeting", "zoom", "talk", "discuss", or similar, ALWAYS include the booking link in your response.

💭 Conversation Context:
You have access to the conversation history. Use it to:
- Reference previous questions and answers
- Build on earlier topics naturally
- Provide personalized follow-ups
- Remember user interests and concerns
- Avoid repeating information already shared

Be conversational, professional, concise (2-3 sentences max), and context-aware. Reference previous conversation and real-time stats when relevant.`;

    // Call Lovable AI Gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("❌ LOVABLE_API_KEY not configured");
      throw new Error("LOVABLE_API_KEY not configured");
    }

    console.log("🤖 Calling Lovable AI Gateway...");
    
    // Build messages array with conversation history for context
    const messages = [
      { role: "system", content: context }
    ];
    
    // Add recent conversation history (excluding the last message which is the current question)
    if (conversationHistory.length > 1) {
      const recentHistory = conversationHistory.slice(0, -1); // Exclude current question
      for (const msg of recentHistory) {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      }
    }
    
    // Add current question
    messages.push({ role: "user", content: question });
    
    console.log("📊 Total messages in context:", messages.length);
    
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Fast and cost-efficient
        messages: messages,
        max_completion_tokens: 600, // More concise responses
        temperature: 0.7, // Balanced creativity and accuracy
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
