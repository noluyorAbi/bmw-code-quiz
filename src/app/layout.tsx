import type { Metadata, Viewport } from "next";
import {
  Inter,
  Be_Vietnam_Pro,
  Space_Grotesk,
  IBM_Plex_Mono,
} from "next/font/google";
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
const siteName = "BMW Code Quiz";
const title = "BMW Code Quiz — Guess the BMW Chassis Code | E30 to G87";
const description =
  "Can you tell an E46 from an F30? Test your BMW knowledge with 157 vehicles across every generation. Learn internal chassis codes (Entwicklung, F, G, U, I series), M car variants, and BMW model history. Free interactive quiz — no signup required. Not affiliated with BMW AG.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111316" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${siteName}` },
  description,
  applicationName: siteName,
  keywords: [
    "BMW quiz",
    "BMW chassis code quiz",
    "BMW code quiz",
    "BMW trivia",
    "BMW internal codes",
    "BMW Entwicklung codes",
    "BMW model quiz",
    "guess the BMW",
    "BMW generation quiz",
    "BMW knowledge test",
    "E30",
    "E36",
    "E46",
    "E90",
    "E60",
    "E39",
    "E92",
    "F30",
    "F80",
    "F10",
    "F82",
    "F87",
    "G20",
    "G80",
    "G82",
    "G42",
    "G70",
    "G87",
    "BMW M3 quiz",
    "BMW M4 quiz",
    "BMW M5 quiz",
    "BMW 3 Series generations",
    "BMW 5 Series generations",
    "BMW 7 Series history",
    "BMW X5 generations",
    "BMW Z4",
    "BMW i4",
    "BMW iX",
    "BMW M car quiz",
    "BMW model identification",
    "BMW chassis code E F G",
    "BMW Entwicklung meaning",
    "BMW LCI facelift",
    "BMW internal naming",
    "car quiz",
    "automotive quiz",
    "car enthusiast quiz",
    "BMW fan quiz",
    "BMW nerd test",
    "BMW expert test",
    "BMW history quiz",
    "BMW model year quiz",
  ],
  authors: [{ name: "Alperen Adatepe", url: "https://adatepe.dev" }],
  creator: "Alperen Adatepe",
  publisher: "Alperen Adatepe",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "BMW Code Quiz — Can You Identify Every BMW Generation?",
    description:
      "155 BMW vehicles. 5 chassis code generations. 3 difficulty levels. Test your knowledge of BMW internal codes from the E30 to the G87.",
    siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1280,
        height: 640,
        alt: "BMW Code Quiz — Test your knowledge of BMW's internal chassis codes. 157 vehicles, E/F/G/U/I generations.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMW Code Quiz — Can You Identify Every BMW Generation?",
    description:
      "155 BMW vehicles. 5 chassis code generations. From the E30 to the G87 — how well do you really know your BMWs?",
    images: [{ url: "/og-image.png", alt: "BMW Code Quiz" }],
    creator: "@noluyorAbi",
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
  alternates: { canonical: siteUrl },
  category: "education",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: siteUrl,
    description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Alperen Adatepe", url: "https://adatepe.dev" },
    screenshot: "/og-image.png",
    about: {
      "@type": "Thing",
      name: "BMW chassis codes",
      description: "BMW internal development codes (E, F, G, U, I, NA series) used to identify vehicle platforms and generations since the 1960s.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What does the E stand for in BMW chassis codes?", acceptedAnswer: { "@type": "Answer", text: "E stands for Entwicklung, the German word for development. It was used as a prefix for BMW internal chassis codes from the 1960s until around 2012. For example, E30 is the second-generation 3 Series (1982-1994) and E46 is the fourth generation (1997-2006)." } },
      { "@type": "Question", name: "Why did BMW switch from E to F to G codes?", acceptedAnswer: { "@type": "Answer", text: "BMW ran through E-numbers over 50 years. The switch to F around 2010 and G around 2017 was simply the next available letters. The latest shift to NA for the Neue Klasse (2025+) carries meaning: N for Neue Klasse, A for first generation." } },
      { "@type": "Question", name: "What does LCI mean on a BMW?", acceptedAnswer: { "@type": "Answer", text: "LCI stands for Life Cycle Impulse — BMW's term for a mid-cycle facelift. It typically happens 3-4 years into a 7-year model lifecycle, bringing revised headlights, taillights, bumpers, and sometimes new engines." } },
      { "@type": "Question", name: "What is BMW Neue Klasse?", acceptedAnswer: { "@type": "Answer", text: "Neue Klasse (New Class) is BMW's next-generation electric vehicle platform launching in 2025. It uses NA chassis codes and features 800V architecture, new cylindrical battery cells, and a radical design language. The first model is the NA5 iX3." } },
      { "@type": "Question", name: "What is the difference between an E46 and an F30?", acceptedAnswer: { "@type": "Answer", text: "Both are BMW 3 Series sedans from different generations. The E46 (1997-2006) is known for naturally aspirated engines and pure driving feel. The F30 (2011-2019) is turbocharged, more technology-focused, and larger. They look completely different." } },
      { "@type": "Question", name: "Why do BMW enthusiasts use chassis codes instead of model names?", acceptedAnswer: { "@type": "Answer", text: "Because model names repeat across generations. BMW 3 Series could mean any car from 1975 to today. But E30 means exactly one generation (1982-1994). Chassis codes are precise, unambiguous, and efficient." } },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${beVietnamPro.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
