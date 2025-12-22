import type { Metadata } from "next";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import "../../styles/globals.css";

export const metadata: Metadata = {
    title: "Fleet Management and Geofencing System",
    description: "Real-time tracking, geofencing, and powerful analytics...",
};

export default async function LocaleLayout({ children, params, }: {children: React.ReactNode; params: Promise<{ locale: string }>;}) {
    const { locale } = await params;

    return (
        <html lang={locale}>
        <head>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
        </head>
        <body>
        <ThemeProvider>
            <I18nProvider>
                <Header />
                <main className="container mx-auto px-4">
                    {children}
                </main>
                <Footer />
            </I18nProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}