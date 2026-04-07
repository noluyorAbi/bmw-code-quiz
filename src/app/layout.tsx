import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://github.com/noluyorAbi/bmw-code-quiz";
const title = "BMW Code Quiz — Test Your Chassis Code Knowledge";
const description =
  "How well do you know BMW's internal chassis codes? An interactive quiz covering 156 vehicles from the E30 to the G87. Not affiliated with BMW AG.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | BMW Code Quiz",
  },
  description,
  keywords: [
    "BMW",
    "chassis codes",
    "internal codes",
    "quiz",
    "E30",
    "E46",
    "F80",
    "G20",
    "BMW trivia",
    "car quiz",
    "automotive",
  ],
  authors: [{ name: "noluyorAbi" }],
  creator: "noluyorAbi",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title,
    description,
    siteName: "BMW Code Quiz",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('bmw-quiz-theme') || 'dark';
                  document.documentElement.className = document.documentElement.className.replace(/dark|light/g, '') + ' ' + theme;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="m-stripe" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
