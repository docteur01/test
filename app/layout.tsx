// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Country State City | Données géographiques mondiales',
  
  description:'Accédez à plus de 247 pays, 5000+ états/provinces et 151 000+ villes grâce à une API géographique moderne, rapide et fiable',

  keywords: [
    'country state city',
    'api géographique',
    'pays villes régions',
    'données géographiques',
    'liste des pays',
    'liste des villes',
    'world cities api',
    'countries api',
    'states api',
    'cities api',
    'next.js api géographique',
    'géolocalisation',
    'formulaire pays ville',
  ],

  authors: [
    {
      name: 'Country State City',
    },
  ],

  creator: 'c',

  openGraph: {
    title: 'Country State City',
    description: 'Une solution moderne pour intégrer des pays, états/provinces et villes dans vos applications web.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Country State City',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full flex flex-col">
        <Navigation />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}