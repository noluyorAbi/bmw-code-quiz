"use client";

import { useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Terminal, Globe, Mail } from "lucide-react";

const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.3 };

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), SPRING_CONFIG);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), SPRING_CONFIG);

  const shadowX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const handleClick = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ perspective: "1200px" }}>
        <motion.div
          role="button"
          tabIndex={0}
          aria-label={`Flip business card to ${isFlipped ? "front" : "back"}`}
          className="w-[280px] h-[190px] sm:w-[320px] sm:h-[210px] relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{ y: isHovered ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {/* ── FRONT FACE ── */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-xl border p-4 sm:p-6 flex flex-col justify-between shadow-2xl overflow-hidden bg-black/90 border-white/10 backdrop-blur-xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0.5px)",
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Glow blobs */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#0066b3]/15 rounded-full blur-[60px] -mr-16 -mt-16 transition-all duration-700"
              style={{ opacity: isHovered ? 0.4 : 0.15 }} />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#cb000e]/10 rounded-full blur-[50px] -ml-12 -mb-12 transition-all duration-700"
              style={{ opacity: isHovered ? 0.3 : 0.1 }} />

            {/* Holographic highlight */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: useTransform(
                  [mouseX, mouseY],
                  ([x, y]) =>
                    `radial-gradient(circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(162,201,255,0.08) 0%, transparent 60%)`
                ),
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            />

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
              <p className="text-[11px] text-white/50 font-light leading-relaxed border-t border-white/10 pt-2">
                Creating powerful digital experiences through modern solutions.
              </p>
            </div>
          </motion.div>

          {/* ── BACK FACE ── */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-xl border p-4 sm:p-6 flex flex-col justify-center shadow-2xl overflow-hidden bg-zinc-900 border-white/10"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(0.5px)",
            }}
            animate={{ rotateY: isFlipped ? 0 : -180 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Back glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#cb000e]/10 rounded-full blur-[60px] -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#0066b3]/10 rounded-full blur-[50px] -ml-12 -mb-12" />

            <div className="space-y-5 relative z-10">
              <p className="text-[11px] text-white/40 text-center font-light leading-relaxed">
                Curious what else I&apos;m building?
              </p>

              {/* Social links */}
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/noluyorAbi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a
                  href="https://www.adatepe.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#a2c9ff] hover:bg-white/10 transition-all"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Website"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alperen-adatepe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#0066b3] hover:bg-white/10 transition-all"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a
                  href="mailto:adatepe.alperen@campus.lmu.de"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#cb000e] hover:bg-white/10 transition-all"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              <a
                href="https://www.adatepe.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-[#a2c9ff] hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-3.5 h-3.5" />
                adatepe.dev
              </a>
            </div>
          </motion.div>

          {/* Dynamic shadow */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-xl"
            style={{
              boxShadow: useTransform(
                [shadowX, shadowY],
                ([x, y]) =>
                  `${x}px ${y}px 50px rgba(0,102,179,0.1), ${x}px ${y}px 100px rgba(203,0,14,0.05)`
              ),
            }}
          />
        </motion.div>
      </div>

      {/* Hint */}
      <p className="text-[10px] font-mono text-muted-foreground/40 tracking-[0.2em] uppercase">
        HOVER TO TILT &middot; CLICK TO FLIP
      </p>
    </div>
  );
}
