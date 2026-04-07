"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "QUIZ" },
  { href: "/leaderboard", label: "TELEMETRY" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-1 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-2xl shadow-blue-900/10">
      <div className="flex justify-between items-center px-4 sm:px-6 h-14 sm:h-16">
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => router.push("/")}
            className="text-sm sm:text-lg font-black tracking-tighter text-foreground uppercase italic font-[family-name:var(--font-display)] hover:text-primary transition-colors truncate"
          >
            THE PERFORMANCE ARCHIVE
          </button>
          <nav className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  "font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] py-1 transition-colors uppercase",
                  pathname === item.href
                    ? "text-foreground border-b-2 border-primary-container"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                router.push(item.href);
                setMobileOpen(false);
              }}
              className={cn(
                "block w-full text-left px-3 py-3 min-h-[44px] rounded font-[family-name:var(--font-label-font)] text-xs tracking-[0.2em] uppercase transition-colors",
                pathname === item.href
                  ? "text-foreground bg-primary-container/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
