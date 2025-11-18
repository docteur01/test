// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';


export const metadata: Metadata = {
  title: 'Generative medical tutor',
  description: "Plateforme de ...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full flex flex-col">
        <main id="main" className="flex-1">
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
