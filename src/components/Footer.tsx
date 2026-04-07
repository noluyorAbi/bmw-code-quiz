"use client";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-border bg-background flex flex-col md:flex-row justify-between items-center px-8 gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
          © 2025 PERFORMANCE ARCHIVE. NOT AFFILIATED WITH BMW AG.
        </span>
        <div className="flex gap-4">
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase hover:text-primary-container transition-colors cursor-default">
            CHASSIS CODES
          </span>
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase hover:text-primary-container transition-colors cursor-default">
            M-HERITAGE
          </span>
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase hover:text-primary-container transition-colors cursor-default">
            LEGAL
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] text-primary-container uppercase tracking-widest">
          SYSTEM STATUS: OPTIMAL
        </span>
        <div className="w-32 h-[2px] bg-border relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-container w-1/3 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
