'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import RootErrorBoundary from '@/components/RootErrorBoundary';

// ── Dynamic imports (ssr:false everywhere avoids hydration mismatches) ────────
const LoadingScreen       = dynamic(() => import('@/components/LoadingScreen'),       { ssr: false });
const BackgroundCanvas    = dynamic(() => import('@/components/BackgroundCanvas'),    { ssr: false });
const Navbar              = dynamic(() => import('@/components/Navbar'),              { ssr: false });
const HeroSection         = dynamic(() => import('@/components/HeroSection'),         { ssr: false });
const MarqueeStrip        = dynamic(() => import('@/components/MarqueeStrip'),        { ssr: false });
const AboutSection        = dynamic(() => import('@/components/AboutSection'),        { ssr: false });
const ServicesSection     = dynamic(() => import('@/components/ServicesSection'),     { ssr: false });
const PortfolioSection    = dynamic(() => import('@/components/PortfolioSection'),    { ssr: false });
const SkillsSection       = dynamic(() => import('@/components/SkillsSection'),       { ssr: false });
const ProcessSection      = dynamic(() => import('@/components/ProcessSection'),      { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), { ssr: false });
const ContactSection      = dynamic(() => import('@/components/ContactSection'),      { ssr: false });
const Footer              = dynamic(() => import('@/components/Footer'),              { ssr: false });
const AssistantWrapper    = dynamic(() => import('@/components/assistant/AssistantWrapper'), { ssr: false });
const ScrollToTop         = dynamic(() => import('@/components/ScrollToTop'),         { ssr: false });
const ThemeSwitcher       = dynamic(() => import('@/components/ThemeSwitcher'),       { ssr: false });
const NexusPortfolioGallery = dynamic(
  () => import('@/components/gallery/NexusPortfolioGallery'),
  { ssr: false },
);

export default function Home() {
  const [mounted,       setMounted]       = useState(false);
  const [heroReady,     setHeroReady]     = useState(false);
  // Gallery is shown as the first experience after LoadingScreen completes.
  // galleryDismissed tracks whether the visitor has moved past it.
  const [galleryDismissed, setGalleryDismissed] = useState(false);
  // Allows gallery card to trigger the AI assistant
  const [assistantOpen, setAssistantOpen] = useState(false);

  // LoadingScreen fires this when its exit animation finishes (~2.7 s)
  const handleLoadComplete = useCallback(() => setHeroReady(true), []);
  const handleGalleryDismiss = useCallback(() => setGalleryDismissed(true), []);
  const handleOpenAssistant  = useCallback(() => setAssistantOpen(true),   []);

  // Only render on the client to avoid hydration mismatches
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          border: '2px solid rgba(59,130,246,0.2)',
          borderTopColor: '#3b82f6',
          animation: 'spin 1s linear infinite',
        }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <RootErrorBoundary>
      {/* ── 1. Loading / intro screen ── always rendered first ── */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {/* ── 2. NEXUS 3-D gallery — shown after loading, before main page ──
               Rendered as soon as `heroReady` is true (loading animation done).
               Sits above the main content (z-40) until dismissed.               */}
      {heroReady && !galleryDismissed && (
        <NexusPortfolioGallery
          ready={heroReady}
          onDismiss={handleGalleryDismiss}
          onOpenAssistant={handleOpenAssistant}
        />
      )}

      {/* ── 3. Main portfolio — always in the DOM (preloads beneath gallery) ── */}
      <BackgroundCanvas />
      {/* Hide the Navbar while the gallery is covering the screen to prevent duplicate logos */}
      <div style={{ visibility: heroReady && !galleryDismissed ? 'hidden' : 'visible' }}>
        <Navbar />
      </div>
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection ready={heroReady && galleryDismissed} />
        <MarqueeStrip />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <SkillsSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />

      {/* ── 4. Persistent UI — always accessible ── */}
      <AssistantWrapper
        forceOpen={assistantOpen}
        onForceOpenHandled={() => setAssistantOpen(false)}
      />
      <ScrollToTop />
      <ThemeSwitcher />
    </RootErrorBoundary>
  );
}
