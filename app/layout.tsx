import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quiz2Play - Interactive AI-Powered Quiz Platform",
  description:
    "Master knowledge with our intelligent quiz platform featuring adaptive AI coaching, 20+ categories, and gamified learning experience.",
  keywords: "quiz, trivia, learning, education, AI, gaming, knowledge",
  authors: [{ name: "Quiz2Play Team" }],
  creator: "Quiz2Play",
  publisher: "Quiz2Play",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://quiz2play.vercel.app"),
  openGraph: {
    title: "Quiz2Play - Interactive AI-Powered Quiz Platform",
    description:
      "Master knowledge with our intelligent quiz platform featuring adaptive AI coaching, 20+ categories, and gamified learning experience.",
    url: "https://quiz2play.vercel.app",
    siteName: "Quiz2Play",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quiz2Play - Interactive AI-Powered Quiz Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz2Play - Interactive AI-Powered Quiz Platform",
    description:
      "Master knowledge with our intelligent quiz platform featuring adaptive AI coaching, 20+ categories, and gamified learning experience.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
