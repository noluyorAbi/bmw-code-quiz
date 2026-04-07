import type { Metadata } from "next";
import { Be_Vietnam_Pro, Space_Grotesk, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

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

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const siteUrl = "https://github.com/noluyorAbi/bmw-code-quiz";
const title = "BMW Code Quiz — Test Your Chassis Code Knowledge";
const description =
  "How well do you know BMW's internal chassis codes? An interactive quiz covering 155 vehicles from the E30 to the G87. Not affiliated with BMW AG.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | BMW Code Quiz" },
  description,
  keywords: ["BMW", "chassis codes", "internal codes", "quiz", "E30", "E46", "F80", "G20", "BMW trivia", "car quiz", "automotive"],
  authors: [{ name: "noluyorAbi" }],
  creator: "noluyorAbi",
  metadataBase: new URL(siteUrl),
  openGraph: { type: "website", locale: "en_US", url: siteUrl, title, description, siteName: "BMW Code Quiz" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${beVietnamPro.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bmw-quiz-theme')||'dark';document.documentElement.className=document.documentElement.className.replace(/dark|light/g,'')+' '+t}catch(e){}})();`,
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
