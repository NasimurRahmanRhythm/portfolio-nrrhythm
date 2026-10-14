// Case-study content for Kriya AI. Private company work, so no links or screenshots.

export const kriya = {
  intro: [
    "Kriya AI is a SaaS marketing co-pilot for businesses and agencies. An owner sets up a Brand Kit once: tone of voice, audience, colours, logo and language.",
    "From that, the AI plans multi-week content calendars, writes captions in Bengali, Banglish or English, generates images, carousels and short vertical videos, and publishes them to Facebook, Instagram, LinkedIn, YouTube and TikTok on schedule.",
    "Organizations are first-class: an agency can run many brands, with many managers, from one place.",
  ],

  meta: [
    { label: "Role", value: "Software Engineer" },
    { label: "Company", value: "ShellBeeHaken" },
    { label: "Status", value: "Ongoing · Private" },
    { label: "Platforms", value: "Facebook, Instagram, LinkedIn, YouTube, TikTok" },
  ],

  impact: [
    { value: "500% → 5%", label: "Engagement rate, fixed" },
    { value: "700 → 4", label: "Lines of monolith → platform services" },
    { value: "5", label: "Social platforms" },
    { value: "3", label: "Caption languages" },
  ],

  workstreams: [
    {
      title: "A production-grade GenAI content pipeline",
      lead: "Every caption, image, carousel and video now starts from the same source of truth: the brand. The pipeline is versioned, validated and measured, so changing a prompt is an engineering decision rather than a guess.",
      items: [
        {
          title: "One versioned prompt registry",
          body: "Moved every text, image, video and carousel prompt into a central, versioned registry for Google Vertex AI, so each one carries the brand's identity, palette and audience. Removed duplicated copywriter and image-director prompts, and closed the gaps where Brand Kit inputs never reached the model.",
        },
        {
          title: "Output you can trust",
          body: "Model-enforced JSON with Zod validation and repair, prompt-injection sanitization of untrusted text, and versioned prompt-performance tracking, so the effect of every prompt change can be measured.",
        },
        {
          title: "A visual brief and a brand visual signature",
          body: "Introduced a visual-brief stage between strategy and image generation, plus a one-time vision analysis of the brand stored as text. Visuals became consistent across a whole plan, without re-uploading images on every render.",
        },
        {
          title: "Carousels and multi-format content",
          body: "Built carousel creation in the post editor, including a \"story flow\" mode where slides tell one continuous narrative. Added user-written briefs, text-only posts, reel, story and carousel types in the calendar, dedicated video-brief prompts for Veo, and fixed reference-image fading in generated images.",
        },
        {
          title: "Lower AI spend, fully visible",
          body: "Removed a redundant LLM-judge and regeneration layer and refactored image and video generation to cut per-post AI cost. Every generation now records the model behind it, feeding an app-wide AI cost dashboard for super admins.",
        },
      ],
    },
    {
      title: "Social analytics and publishing",
      lead: "Publishing is only half the loop. I rebuilt how Kriya reads results back from each platform, and made the numbers right before making them pretty.",
      items: [
        {
          title: "From a 700-line endpoint to modular services",
          body: "Re-architected a monolithic social sync endpoint into modular per-platform services for Facebook, Instagram, YouTube and TikTok (Graph API, YouTube Data API v3, TikTok Display API), with shared persistence and typed contracts.",
        },
        {
          title: "Insights ingestion that survives real APIs",
          body: "Built post- and account-level analytics ingestion (reactions by type, comments, shares, views, followers), working around deprecated Meta insight metrics and inconsistent insights data.",
        },
        {
          title: "An engagement rate that means something",
          body: "Defined the engagement-rate formula and fixed a flawed one that reported 500% instead of 5%.",
        },
        {
          title: "An analytics dashboard people use",
          body: "Designed the Recharts dashboard: KPI cards, top posts, a best-time-to-post heatmap and a content-type breakdown.",
        },
        {
          title: "Responsible publishing",
          body: "AI-generated images are labelled as such when they are published to social platforms.",
        },
      ],
    },
  ],

  stack: [
    { group: "AI", items: ["Google Vertex AI", "Gemini 3.x", "Gemini Image", "Veo 3.1", "LangChain", "LangGraph"] },
    { group: "Application", items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Zustand", "Zod", "i18next", "Recharts"] },
    { group: "Data", items: ["Supabase", "PostgreSQL", "Row-level security", "Realtime", "Storage"] },
    { group: "Integrations", items: ["Meta Graph API", "YouTube Data API v3", "TikTok Display API"] },
    { group: "Infra & quality", items: ["AWS Elastic Beanstalk", "Vitest"] },
  ],
};
