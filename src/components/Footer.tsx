"use client";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border bg-background flex flex-col md:flex-row justify-between items-center px-8 gap-4">
      <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
        © 2025 PERFORMANCE ARCHIVE — NOT AFFILIATED WITH BMW AG
      </div>
      <div className="font-mono text-[10px] text-primary-container font-bold tracking-wider">
        M-TECHNIC ID: 8008-G80
      </div>
    </footer>
  );
}
