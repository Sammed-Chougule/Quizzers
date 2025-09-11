import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quizzers - AI-Powered Adaptive Learning Platform",
  description: "Quizzers generates adaptive, AI-curated quizzes that pinpoint your weak spots, so you learn exactly what you need fast.",
  openGraph: {
    title: "Quizzers - AI-Powered Quiz Platform",
    description: "Generate personalized quizzes with AI . Identify your weak spots and improve faster.",
    url: "https://quizzersbysammed.vercel.app",
    siteName: "Quizzers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quizzers - AI-Powered Learning Platform",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Quizzers - AI-Powered Adaptive Learning Platform",
    description: "Generate personalized quizzes with AI and track your learning progress. Identify your weak spots and improve faster.",
    images: [
      {
        url: "https://quizzersbysammed.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quizzers - AI-Powered Learning Platform",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col max-w-3xl mx-auto px-4">
          {/* Header appears on ALL pages */}
          {/* Main content area */}
          <main className="flex-grow">{children}</main>
          {/* Footer appears on ALL pages */}
        </div>
      </body>
    </html>
  );
}
