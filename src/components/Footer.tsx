"use client";

import { Globe, Terminal, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-10">
          {/* Left: Project info */}
          <div className="text-center md:text-left space-y-3 max-w-xs">
            <h3 className="font-[family-name:var(--font-display)] font-black italic text-lg text-foreground">
              BMW Code Quiz
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An interactive quiz to test your knowledge of BMW&apos;s internal chassis codes.
              155 vehicles across every generation.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Fan Project &middot; Not affiliated with BMW AG &middot; Built with Next.js &amp; Tailwind CSS
            </p>
            <p className="text-sm text-muted-foreground pt-2">
              Questions or feedback?{" "}
              <a
                href="https://github.com/noluyorAbi/bmw-code-quiz/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline underline-offset-4"
              >
                Open an issue on GitHub
              </a>
            </p>
          </div>

          {/* Right: Developer card */}
          <div className="w-[280px] h-[190px] sm:w-[320px] sm:h-[210px] rounded-xl border bg-black/90 border-white/10 dark:border-white/10 light:border-black/10 p-4 sm:p-6 flex flex-col justify-between shadow-2xl overflow-hidden relative group hover:shadow-[0_0_30px_rgba(0,102,179,0.2)] transition-shadow duration-500">
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#0066b3]/15 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-[#0066b3]/30 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#cb000e]/10 rounded-full blur-[50px] -ml-12 -mb-12 group-hover:bg-[#cb000e]/25 transition-all duration-700" />

            {/* Top row */}
            <div className="flex justify-between items-start z-10">
              <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50 border border-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50 border border-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/50 border border-green-500/20" />
              </div>
            </div>

            {/* Info */}
            <div className="z-10 space-y-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-0.5">
                  Alperen Adatepe
                </h2>
                <p className="text-[11px] sm:text-xs text-[#a2c9ff] font-semibold tracking-wide uppercase">
                  Full-Stack Engineer
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#bec3f7]/80 font-medium tracking-wide">
                  Computer Scientist @ LMU Munich
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-2">
                <a
                  href="https://github.com/noluyorAbi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a
                  href="https://www.adatepe.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alperen-adatepe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a
                  href="mailto:adatepe.alperen@campus.lmu.de"
                  className="text-white/40 hover:text-white transition-colors ml-auto"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BMW Code Quiz. All rights reserved. Not affiliated with BMW AG.
          </p>
        </div>
      </div>
    </footer>
  );
}
