import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  style: ["normal", "italic"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-label-font",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://github.com/noluyorAbi/bmw-code-quiz";
const title = "BMW Code Quiz — Guess the BMW Chassis Code | E30 to G87";
const description =
  "Can you tell an E46 from an F30? Test your BMW knowledge with 155 vehicles across every generation. Learn internal chassis codes (Entwicklung, F, G, U, I series), M car variants, and BMW model history. Free interactive quiz — no signup required. Not affiliated with BMW AG.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | BMW Code Quiz" },
  description,
  keywords: [
    "BMW quiz", "BMW chassis code quiz", "BMW code quiz", "BMW trivia",
    "BMW internal codes", "BMW Entwicklung codes", "BMW model quiz",
    "guess the BMW", "BMW generation quiz", "BMW knowledge test",
    "E30", "E36", "E46", "E90", "E60", "E39", "E92",
    "F30", "F80", "F10", "F82", "F87",
    "G20", "G80", "G82", "G42", "G70", "G87",
    "BMW M3 quiz", "BMW M4 quiz", "BMW M5 quiz",
    "BMW 3 Series generations", "BMW 5 Series generations", "BMW 7 Series history",
    "BMW X5 generations", "BMW Z4", "BMW i4", "BMW iX",
    "BMW M car quiz", "BMW model identification",
    "BMW chassis code E F G", "BMW Entwicklung meaning",
    "BMW LCI facelift", "BMW internal naming",
    "car quiz", "automotive quiz", "car enthusiast quiz",
    "BMW fan quiz", "BMW nerd test", "BMW expert test",
    "BMW history quiz", "BMW model year quiz",
  ],
  authors: [{ name: "noluyorAbi" }],
  creator: "noluyorAbi",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "BMW Code Quiz — Can You Identify Every BMW Generation?",
    description: "155 BMW vehicles. 5 chassis code generations. 3 difficulty levels. Test your knowledge of BMW internal codes from the E30 to the G87.",
    siteName: "BMW Code Quiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMW Code Quiz — Can You Identify Every BMW Generation?",
    description: "155 BMW vehicles. 5 chassis code generations. From the E30 to the G87 — how well do you really know your BMWs?",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${beVietnamPro.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bmw-quiz-theme')||'dark';var c=document.documentElement.classList;c.remove('dark','light');c.add(t)}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-primary-container selection:text-white">
        <ThemeProvider>
          <div className="m-stripe fixed top-0 left-0 w-full z-[60]" />
          <Header />
          <main className="pt-20 pb-0 min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
