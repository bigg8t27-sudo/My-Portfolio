import type { Metadata, Viewport } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://alfreddev.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alfred Ofori | Data Scientist & Creative Developer',
    template: '%s | Alfred Ofori',
  },
  description:
    'Data Scientist and full-stack creative developer crafting immersive digital experiences. Expert in Next.js, React, Python, and Data Analytics.',
  keywords: [
    'data scientist','web developer','UI designer','Next.js developer',
    'React developer','Python','data analytics','portfolio',
    'Ghana','Alfred Ofori','software developer',
  ],
  authors: [{ name: 'Alfred Ofori', url: SITE_URL }],
  creator: 'Alfred Ofori',
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Alfred Ofori | Data Scientist & Creative Developer',
    description: 'Data Scientist and creative developer crafting intelligent digital experiences.',
    siteName: 'Alfred Ofori Portfolio',
    images: [{ url: '/og-image', width: 1200, height: 630, alt: 'Alfred Ofori Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfred Ofori | Data Scientist & Creative Developer',
    description: 'Data Scientist and creative developer crafting intelligent digital experiences.',
    images: ['/og-image'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-black text-white antialiased" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
