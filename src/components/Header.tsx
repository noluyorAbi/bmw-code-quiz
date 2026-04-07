"use client";

import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "QUIZ" },
  { href: "/leaderboard", label: "TELEMETRY" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="fixed top-1 left-0 w-full z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-6 h-16 shadow-2xl shadow-blue-900/10 border-b border-border">
      <div className="flex items-center gap-8">
        <button
          onClick={() => router.push("/")}
          className="text-base font-black tracking-tighter text-foreground uppercase italic font-[family-name:var(--font-display)] hover:text-primary transition-colors"
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
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <ThemeToggle />
    </header>
  );
}
