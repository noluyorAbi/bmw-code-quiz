"use client";

import BusinessCard from "@/components/BusinessCard";

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

          {/* Right: Interactive 3D Business Card */}
          <BusinessCard />
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
