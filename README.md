# Alex Creator - Portfolio Website

A futuristic, animated portfolio built with Next.js 14, React, TypeScript, Tailwind CSS, and Framer Motion.

## Getting Started

`
npm install --legacy-peer-deps
`

To start the development server:

`
npm run dev
`

Open http://localhost:3000

## Production Build

`
npm run build
npm run start
`

## Deployment

### Vercel (recommended)
1. Push to GitHub
2. Import at vercel.com - auto-detects Next.js
3. Deploy

Or: npm i -g vercel && vercel

### Netlify
npm i -g netlify-cli && netlify deploy --build

### Docker
docker build -t portfolio .
docker run -p 3000:3000 portfolio

## Customisation

- Name/headline: components/HeroSection.tsx
- About: components/AboutSection.tsx
- Services: components/ServicesSection.tsx (services array)
- Projects: components/PortfolioSection.tsx (projects array)
- Skills: components/SkillsSection.tsx
- Process: components/ProcessSection.tsx (steps array)
- Testimonials: components/TestimonialsSection.tsx
- Contact email/WhatsApp: components/ContactSection.tsx
- Social links: components/ContactSection.tsx and components/Footer.tsx
- SEO metadata: app/layout.tsx
- Colour palette: app/globals.css (:root variables)
- Fonts: app/layout.tsx (next/font/google)

## Contact Form

Currently uses mailto fallback. To use a real API:
- Resend: npm install resend, create app/api/contact/route.ts
- Formspree: point form action to your Formspree URL
- EmailJS: npm install @emailjs/browser

## License
MIT
