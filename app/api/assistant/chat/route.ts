import { NextRequest, NextResponse } from 'next/server';

// Portfolio knowledge base — Alfred Ofori
const PORTFOLIO_CONTEXT = `
You are SENIOR DEV AI (also called NEXUS), the personal AI assistant for Alfred Ofori's developer portfolio.
Alfred Ofori is a full-stack creative developer and Data Scientist based in Ghana, Africa.

ABOUT ALFRED:
- Full-stack creative developer and Data Scientist
- 5+ years of experience in web development and data science
- Specialises in Data Science, Data Analytics, and Software Development
- Based in Ghana, working globally
- Email: bigg8t27@gmail.com
- WhatsApp: +233 597 580 576
- Available for freelance, contract, and full-time roles

TECH STACK:
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, PostgreSQL, Supabase, GraphQL
- Data: Python, SQL, Data Analysis
- Design: Figma, Three.js
- Tools: Git, Vercel, Docker

PORTFOLIO SECTIONS:
- Home (hero): Introduction and overview
- About: Biography, skills, experience
- Services: Web Design, Web Development, UI/UX Design, Landing Pages, Website Redesign, Brand Identity
- Portfolio/Projects: Selected work including NovaTech Dashboard, Luminary E-Commerce, PulseAI Landing Page, Verdant Brand Identity, Apex Finance App, Studio Oslo Portfolio
- Skills: Technical proficiencies and technology stack
- Process: 4-step workflow: Discover, Strategy, Design & Build, Launch
- Contact: Form, WhatsApp, Email

SERVICES OFFERED:
- Web Design: Pixel-perfect, conversion-optimised interfaces in Figma
- Web Development: High-performance Next.js/React applications
- UI/UX Design: User research, wireframes, prototyping
- Landing Pages: High-converting landing pages
- Website Redesign: Modernising outdated websites
- Brand Identity: Logo design, colour systems, typography

FEATURED PROJECTS:
1. NovaTech Dashboard — Real-time SaaS analytics dashboard (Next.js, Framer Motion, Tailwind)
2. Luminary E-Commerce — Luxury jewellery brand redesign (Figma, Shopify) — 220% conversion uplift
3. PulseAI Landing Page — AI startup landing page (React, GSAP) — 45% signup uplift
4. Verdant Brand Identity — Eco-tech startup branding (Logo, Guidelines, Print)
5. Apex Finance App — Personal finance web app (Next.js, PostgreSQL)
6. Studio Oslo Portfolio — Architecture studio portfolio (Next.js, Three.js, GLSL)

MISSION: Build intelligent solutions for a smarter tomorrow.

Always be helpful, professional, and accurate. If you do not know something, say so honestly.
For navigation requests, respond with a JSON action: {"action": "navigate", "target": "sectionId", "message": "your text response"}
Valid navigation targets: home, about, portfolio, skills, services, contact, process
`;

interface ChatRequest {
  message:        string;
  conversationId: string;
  history?:       { role: string; content: string }[];
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // ── DEMO MODE — no API key configured ─────────────────────────────────
    if (!apiKey) {
      const reply = getDemoResponse(message);
      return NextResponse.json({ reply, demo: true });
    }

    // ── REAL AI MODE — OpenAI ─────────────────────────────────────────────
    const messages = [
      { role: 'system', content: PORTFOLIO_CONTEXT },
      ...history.slice(-10).map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages, max_tokens: 500, temperature: 0.7 }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('OpenAI error:', err);
      return NextResponse.json({ error: 'AI service unavailable', reply: getDemoResponse(message) }, { status: 200 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? getDemoResponse(message);
    return NextResponse.json({ reply });

  } catch (err) {
    console.error('Assistant API error:', err);
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now. Please try again in a moment." },
      { status: 200 }
    );
  }
}

// ── Demo responses when no API key is set ─────────────────────────────────
function getDemoResponse(message: string): string {
  const m = message.toLowerCase();

  if (m.includes('who') && (m.includes('alfred') || m.includes('you') || m.includes('senior'))) {
    return "Alfred Ofori is a full-stack creative developer and Data Scientist based in Ghana. He specialises in Data Science, Analytics, and Software Development — building everything from immersive web experiences to intelligent data systems. He has 5+ years of experience and has delivered 120+ projects worldwide.";
  }
  if (m.includes('project') || m.includes('work') || m.includes('portfolio')) {
    return "Alfred's featured projects include: **NovaTech Dashboard** (SaaS analytics), **Luminary E-Commerce** (luxury brand — 220% conversion uplift), **PulseAI Landing Page** (AI startup — 45% signup uplift), **Apex Finance App**, and **Studio Oslo Portfolio** (WebGL). Click 'Explore My Work' to see the full portfolio.";
  }
  if (m.includes('skill') || m.includes('tech') || m.includes('stack')) {
    return "Alfred's tech stack: **Frontend** — Next.js, React, TypeScript, Tailwind CSS, Framer Motion. **Backend** — Node.js, PostgreSQL, Supabase, GraphQL. **Data** — Python, SQL, Data Analysis. **Design** — Figma, Three.js. **Tools** — Git, Vercel, Docker.";
  }
  if (m.includes('contact') || m.includes('hire') || m.includes('email') || m.includes('reach')) {
    return "You can reach Alfred at **bigg8t27@gmail.com** or via **WhatsApp: +233 597 580 576**. He's open to freelance, contract, and full-time opportunities. Use the Contact section below to send a message directly.";
  }
  if (m.includes('service') || m.includes('offer') || m.includes('do')) {
    return "Alfred offers: **Web Design** (Figma, pixel-perfect), **Web Development** (Next.js, React), **UI/UX Design** (research-backed), **Landing Pages** (high-converting), **Website Redesign**, and **Brand Identity** (logos, design systems). Each project follows a 4-step process: Discover → Strategy → Design & Build → Launch.";
  }
  if (m.includes('process') || m.includes('workflow') || m.includes('how')) {
    return "Alfred's 4-step process: 1. **Discover** — deep research on goals, audience, and competitors. 2. **Strategy** — tech stack, architecture, and roadmap. 3. **Design & Build** — Figma designs validated with you, then engineered. 4. **Launch** — deployment, performance audit, SEO, and 30-day support.";
  }
  if (m.includes('about') || m.includes('bio') || m.includes('background')) {
    return "Alfred Ofori is a creative developer passionate about turning data into insight and building intelligent systems. Based in Ghana, working globally. 5+ years experience, 120+ projects delivered, 50+ happy clients. He combines design precision with engineering excellence — every project is built with performance, accessibility, and visual delight as non-negotiables.";
  }
  if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('start')) {
    return "Hello! I'm NEXUS, Alfred's AI assistant. I can tell you about Alfred's projects, skills, services, and how to get in touch. What would you like to know?";
  }

  return "I'm here to help you explore Alfred's portfolio. You can ask me about his projects, skills, services, or how to contact him. What would you like to know?";
}
