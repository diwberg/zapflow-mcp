import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import I18nProvider from "./i18n-provider";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zapflow MCP | Peça sua aplicação no WhatsApp",
  description: "Zapflow MCP provisiona Postgres, Redis, N8N e muito mais. Tudo via IA, em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <I18nProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
