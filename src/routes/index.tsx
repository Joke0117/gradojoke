import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import heroImg from "@/assets/graduate-hero.png";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import bgTexture from "@/assets/bg-texture.jpg";
import cucLogo from "@/assets/cuc-logo.png";
import capGold from "@/assets/cap-gold.png";

export const Route = createFileRoute("/")({
  component: Invitation,
  head: () => ({
    meta: [
      { title: "Mi Grado · José Ángel Martínez Rodelo" },
      { name: "description", content: "Invitación al grado de José Ángel Martínez Rodelo · Ingeniería de Sistemas · Universidad de la Costa · 29 de mayo de 2026" },
    ],
  }),
});

const EVENT_DATE = new Date("2026-05-29T09:00:00-05:00");

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function Particles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const items = Array.from({ length: 60 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const dur = Math.random() * 18 + 14;
        const delay = Math.random() * 20;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              bottom: `-10px`,
              width: size,
              height: size,
              borderRadius: "9999px",
              background: "radial-gradient(circle, oklch(0.97 0.08 88) 0%, oklch(0.82 0.15 82 / 0.6) 40%, transparent 80%)",
              boxShadow: "0 0 12px oklch(0.82 0.15 82 / 1)",
              animation: `particle-float ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("in-view"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in-slow"
      style={{ background: "radial-gradient(ellipse at center, oklch(0.14 0.01 60) 0%, oklch(0.04 0.005 60) 100%)" }}>
      <div className="flex flex-col items-center gap-7">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 rounded-full border border-gold/25" />
          <div className="absolute inset-0 rounded-full border-t-2 border-gold animate-spin" style={{ animationDuration: "1.6s" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={capGold} alt="" aria-hidden className="w-16 h-12 animate-float-soft" style={{ filter: "drop-shadow(0 0 18px oklch(0.82 0.15 82 / 0.7))" }} />
          </div>
        </div>
        <p className="font-serif-elegant tracking-[0.5em] text-[0.7rem] text-gold uppercase animate-pulse">Preparando momento</p>
      </div>
    </div>
  );
}

function Welcome({ onOpen, guestName }: { onOpen: () => void; guestName: string | null }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between animate-fade-in-slow overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 35%, oklch(0.20 0.015 65) 0%, oklch(0.05 0.005 60) 70%)" }}
    >
      <Particles />

      {/* Full-screen corner ornaments — anchored to screen edges */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-10">
        <CornerOrnaments size={72} />
      </div>

      {/* Ambient glow orb */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[55vh] rounded-full animate-glow-breathe pointer-events-none"
        style={{ background: "radial-gradient(ellipse, oklch(0.78 0.14 80 / 0.22) 0%, transparent 65%)", filter: "blur(50px)" }}
      />

      {/* Top hairline */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px z-20" style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.7), transparent)" }} />
      {/* Bottom hairline */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px z-20" style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.7), transparent)" }} />

      {/* Top spacer */}
      <div className="flex-1" />

      {/* CENTER CONTENT */}
      <div className="relative z-10 w-full text-center px-8 flex flex-col items-center">
        {/* Cap */}
        <img
          src={capGold}
          alt=""
          aria-hidden
          className="mx-auto mb-7 animate-float-soft animate-float-up"
          style={{
            width: "clamp(80px, 22vw, 120px)",
            height: "auto",
            filter: "drop-shadow(0 10px 32px oklch(0.78 0.14 80 / 0.7))",
            animationDelay: "0s",
          }}
        />

        {/* Label */}
        <p
          className="font-serif-elegant tracking-[0.45em] text-xs uppercase text-gold/85 mb-5 animate-float-up px-4"
          style={{ animationDelay: "0.15s" }}
        >
          {guestName ? `${guestName}, tienes una invitación` : "Tienes una invitación"}
        </p>

        {/* Divider */}
        <div className="divider-gold mx-auto mb-8 animate-float-up" style={{ width: "clamp(80px, 30vw, 140px)", animationDelay: "0.3s" }} />

        {/* Title */}
        <h1
          className="font-luxe shimmer-text mb-5 tracking-[0.1em] leading-none animate-float-up"
          style={{ fontSize: "clamp(4.5rem, 22vw, 9rem)", animationDelay: "0.45s" }}
        >
          Mi Grado
        </h1>

        {/* Subtitle */}
        <p
          className="font-serif-elegant italic text-foreground/80 mb-10 animate-float-up"
          style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", animationDelay: "0.6s" }}
        >
          "Un sueño, un esfuerzo,<br />una nueva historia."
        </p>

        {/* CTA Button */}
        <button
          onClick={onOpen}
          className="group relative inline-flex items-center gap-3 rounded-full font-serif-elegant uppercase text-background animate-float-up animate-pulse-gold overflow-hidden"
          style={{
            background: "var(--gradient-gold)",
            animationDelay: "0.8s",
            paddingInline: "clamp(2rem, 8vw, 3.5rem)",
            paddingBlock: "clamp(0.85rem, 3vw, 1.1rem)",
            fontSize: "clamp(0.65rem, 2.5vw, 0.85rem)",
            letterSpacing: "0.3em",
            boxShadow: "0 8px 40px oklch(0.78 0.14 80 / 0.5)",
          }}
        >
          <span className="relative z-10">Abrir Invitación</span>
          <span className="relative z-10 transition-transform group-hover:translate-x-1">✦</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>

      {/* Bottom spacer */}
      <div className="flex-1" />

      {/* Bottom year stamp */}
      <p
        className="relative z-10 font-sans tracking-[0.5em] text-gold/30 pb-8 animate-float-up"
        style={{ fontSize: "0.6rem", animationDelay: "1s" }}
      >
        PROMOCIÓN 2026
      </p>
    </div>
  );
}

function Confetti() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const items = Array.from({ length: 80 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const dur = Math.random() * 2 + 2.5;
        const delay = Math.random() * 0.6;
        const size = Math.random() * 8 + 4;
        const rot = Math.random() * 360;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "-20px",
              left: `${left}%`,
              width: size,
              height: size * 0.4,
              background: i % 3 === 0 ? "oklch(0.92 0.12 88)" : i % 3 === 1 ? "oklch(0.78 0.15 82)" : "oklch(0.55 0.13 70)",
              transform: `rotate(${rot}deg)`,
              animation: `particle-float ${dur}s ease-in ${delay}s forwards`,
              boxShadow: "0 0 8px oklch(0.82 0.15 82 / 0.8)",
            }}
          />
        );
      })}
    </div>
  );
}

// Decorative gold flourish (small diamond + line)
function Flourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="block h-px w-10" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
      <span className="text-gold text-xs rotate-45 inline-block">◆</span>
      <span className="block h-px w-10" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
    </div>
  );
}

// Elegant L-shaped corner ornaments with double lines + diamond accent
function CornerOrnaments({ className = "", size = 56 }: { className?: string; size?: number }) {
  const s = size;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {[
        { pos: "top-0 left-0", rot: 0 },
        { pos: "top-0 right-0", rot: 90 },
        { pos: "bottom-0 right-0", rot: 180 },
        { pos: "bottom-0 left-0", rot: 270 },
      ].map((c, i) => (
        <div key={i} className={`absolute ${c.pos}`} style={{ width: s, height: s, transform: `rotate(${c.rot}deg)` }}>
          <svg viewBox="0 0 56 56" className="w-full h-full">
            <defs>
              <linearGradient id={`coG-${i}`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="oklch(0.97 0.08 88)" />
                <stop offset="0.5" stopColor="oklch(0.82 0.16 84)" />
                <stop offset="1" stopColor="oklch(0.5 0.12 65)" />
              </linearGradient>
            </defs>
            {/* outer L */}
            <path d="M2 22 L2 2 L22 2" fill="none" stroke={`url(#coG-${i})`} strokeWidth="1.4" strokeLinecap="round" />
            {/* inner L */}
            <path d="M6 26 L6 6 L26 6" fill="none" stroke={`url(#coG-${i})`} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            {/* diamond accent */}
            <rect x="11.5" y="11.5" width="3" height="3" fill="oklch(0.92 0.12 88)" transform="rotate(45 13 13)" />
            {/* tiny dot */}
            <circle cx="22" cy="2" r="0.9" fill="oklch(0.92 0.12 88)" />
            <circle cx="2" cy="22" r="0.9" fill="oklch(0.92 0.12 88)" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// Fullscreen lightbox for gallery
function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [src, onClose]);
  if (!src) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 animate-fade-in-slow" style={{ background: "oklch(0 0 0 / 0.92)" }} onClick={onClose}>
      <button aria-label="Cerrar" onClick={onClose} className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-gold border" style={{ borderColor: "oklch(0.78 0.14 80 / 0.5)" }}>
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <img src={src} alt="" className="max-w-full max-h-[88vh] rounded-2xl animate-scale-in-soft" style={{ boxShadow: "0 0 60px oklch(0.78 0.14 80 / 0.3), 0 0 0 1px oklch(0.78 0.14 80 / 0.5)" }} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

// Graduation cap — real glitter image
function CapIcon({ className = "" }: { className?: string }) {
  return (
    <img
      src={capGold}
      alt=""
      aria-hidden
      className={className}
      style={{
        objectFit: "contain",
        filter: "drop-shadow(0 6px 18px oklch(0.78 0.14 80 / 0.55)) drop-shadow(0 0 30px oklch(0.82 0.15 82 / 0.35))",
      }}
    />
  );
}

function Invitation() {
  const [stage, setStage] = useState<"loading" | "welcome" | "open">("loading");
  const [confetti, setConfetti] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const t = useCountdown(EVENT_DATE);

  const guestName = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("invitado") : null;

  const showWelcome = useCallback(() => setStage("welcome"), []);
  const open = () => {
    setConfetti(true);
    setTimeout(() => setStage("open"), 400);
    setTimeout(() => setConfetti(false), 4000);
  };

  return (
    <div className="relative min-h-screen text-foreground vignette">
      {stage === "loading" && <Loader onDone={showWelcome} />}
      {stage === "welcome" && <Welcome onOpen={open} guestName={guestName} />}
      {confetti && <Confetti />}
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />

      {/* Background */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${bgTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div aria-hidden className="fixed inset-0 z-0" style={{ background: "radial-gradient(ellipse at top, transparent 0%, oklch(0.06 0.005 60 / 0.95) 70%)" }} />
      <Particles />

      {stage === "open" && (
        <main className="relative z-10 animate-fade-in-slow">
          <SiteHeader />
          {/* HERO */}
          <section id="inicio" className="relative min-h-screen px-3 py-4 md:px-8 md:py-10 flex items-center justify-center">
            <div className="relative w-full max-w-6xl">
              {/* Outer gold frame */}
              <div className="relative rounded-[22px] md:rounded-[28px] overflow-hidden noise-overlay" style={{ background: "oklch(0.06 0.005 60)", boxShadow: "var(--shadow-gold-lg), 0 0 100px oklch(0.78 0.14 80 / 0.2)" }}>
                {/* ── RIBBON BADGE — unique differentiator ── */}
                <div aria-hidden className="absolute top-0 right-0 z-30 overflow-hidden w-32 h-32 pointer-events-none">
                  <div
                    className="absolute top-5 right-[-32px] w-36 py-1.5 text-center font-sans text-[0.6rem] tracking-[0.25em] uppercase rotate-45"
                    style={{
                      background: "var(--gradient-gold)",
                      color: "oklch(0.08 0.005 60)",
                      fontWeight: 600,
                      boxShadow: "0 2px 12px oklch(0.78 0.14 80 / 0.5)",
                    }}
                  >
                    2026
                  </div>
                </div>
                {/* gold border line */}
                <div aria-hidden className="absolute inset-2 md:inset-3 rounded-[16px] md:rounded-[20px] pointer-events-none border z-20" style={{ borderColor: "oklch(0.78 0.14 80 / 0.35)" }} />
                {/* Inner hairline border */}
                <div aria-hidden className="absolute inset-3 md:inset-4 rounded-[14px] md:rounded-[18px] pointer-events-none border z-20" style={{ borderColor: "oklch(0.78 0.14 80 / 0.12)" }} />
                {/* Elegant gold corner ornaments */}
                <div aria-hidden className="absolute inset-4 md:inset-6 z-20 pointer-events-none">
                  <CornerOrnaments size={48} />
                </div>
                {/* gold dust accents */}
                <div aria-hidden className="md:hidden absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-6 right-4 w-32 h-32 rounded-full opacity-40" style={{ background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.45) 0%, transparent 70%)", filter: "blur(10px)" }} />
                  <div className="absolute bottom-12 left-4 w-28 h-28 rounded-full opacity-40" style={{ background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.45) 0%, transparent 70%)", filter: "blur(10px)" }} />
                </div>

                    <div className="relative z-10 grid md:grid-cols-2 md:min-h-[900px]">
                      {/* LEFT — info panel */}
                      <div className="relative px-5 pt-10 pb-7 md:pt-16 md:px-8 lg:px-14 md:py-16 flex flex-col">
                      {/* Cap — real glitter, large centered on mobile (Canva style), floating */}
                    <div className="flex justify-center md:justify-start relative">
                      <div aria-hidden className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full animate-glow-breathe" style={{ background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.35) 0%, transparent 65%)", filter: "blur(8px)" }} />
                      <CapIcon className="relative w-40 h-32 md:w-28 md:h-24 animate-float-soft" />
                    </div>

                    {/* Mobile portrait — framed photo with golden halo (taller to fit portrait) */}
                    <div className="md:hidden mt-6 flex justify-center relative">
                      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-72 rounded-[3rem] animate-glow-breathe" style={{ background: "radial-gradient(ellipse, oklch(0.82 0.15 82 / 0.45) 0%, transparent 65%)", filter: "blur(14px)" }} />
                      <div className="relative w-48 h-64 rounded-t-full rounded-b-[2rem] overflow-hidden animate-scale-in-soft ring-gold-glow">
                        <img src={heroImg} alt="José Ángel Martínez Rodelo" className="w-full h-full object-cover object-[center_10%]" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 65%, oklch(0.06 0.005 60 / 0.6) 100%)" }} />
                      </div>
                    </div>

                    {/* MI GRADO title */}
                    <div className="mt-8 md:mt-10 text-center md:text-left">
                      <p className="font-luxe text-3xl md:text-4xl tracking-[0.5em] text-foreground/95 ml-[0.5em]">MI</p>
                      <h1
                        className="font-luxe leading-[0.9] mt-2 shimmer-text"
                        style={{
                          fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        GRADO
                      </h1>
                      <Flourish className="mt-6 md:mt-8 md:justify-start" />
                    </div>

                    {/* Subtitle */}
                    <p className="mt-6 md:mt-8 font-sans tracking-[0.35em] text-[0.7rem] md:text-xs uppercase text-foreground/80 text-center md:text-left">
                      Un sueño, un esfuerzo,<br />una nueva historia
                    </p>

                    {/* Graduando */}
                    <div className="mt-10 md:mt-14 text-center md:text-left">
                      <p className="font-sans tracking-[0.45em] text-[0.65rem] uppercase text-gold mb-3">Graduando</p>
                      <p className="font-serif-elegant italic text-3xl md:text-4xl gradient-gold-text leading-tight">
                        José Ángel
                      </p>
                      <h2 className="font-luxe text-4xl md:text-5xl lg:text-6xl text-foreground tracking-[0.08em] leading-[0.95] mt-2">
                        MARTÍNEZ<br />RODELO
                      </h2>
                      <Flourish className="mt-5 md:justify-start" />
                    </div>

                    {/* Carrera + Universidad */}
                    <div className="mt-8 text-center md:text-left">
                      <p className="font-sans tracking-[0.35em] text-xs uppercase text-foreground mb-2">Ingeniería de Sistemas</p>
                      <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                        <img
                          src={cucLogo}
                          alt="Universidad de la Costa CUC"
                          className="h-9 md:h-10 w-auto"
                          style={{
                            filter: "brightness(0) saturate(100%) invert(73%) sepia(45%) saturate(652%) hue-rotate(2deg) brightness(95%) contrast(92%) drop-shadow(0 0 8px oklch(0.78 0.14 80 / 0.5))",
                          }}
                        />
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="mt-10 md:mt-14 space-y-3 md:space-y-4 max-w-xs mx-auto md:mx-0 w-full">
                      {[
                        { svg: <CalIcon />, label: "29 de Mayo de 2026" },
                        { svg: <ClockIcon />, label: "9:00 AM · Ceremonia de Grado" },
                        { svg: <PinIcon />, label: "Salón Jumbo del Country" },
                        { svg: <PinIcon />, label: "Calle 76 con Cra. 54 · Barranquilla" },
                      ].map((it, i) => (
                        <div key={i} className="flex items-center gap-4 py-2.5 md:py-3 border-b" style={{ borderColor: "oklch(0.78 0.14 80 / 0.25)" }}>
                          <span className="flex items-center justify-center w-9 h-9 rounded-md border shrink-0" style={{ borderColor: "oklch(0.78 0.14 80 / 0.45)", color: "var(--gold)" }}>
                            {it.svg}
                          </span>
                          <span className="font-sans text-[0.78rem] md:text-sm tracking-[0.12em] uppercase text-foreground/95">{it.label}</span>
                        </div>
                      ))}
                    </div>
                    {/* Google Maps link */}
                    <div className="mt-5 md:mt-6 flex justify-center md:justify-start">
                      <a
                        href="https://maps.google.com/?q=Salon+Jumbo+del+Country+Barranquilla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.72rem] tracking-[0.2em] uppercase font-sans transition-all duration-300 hover:bg-gold/10"
                        style={{ border: "1px solid oklch(0.78 0.14 80 / 0.5)", color: "var(--gold)", background: "oklch(0.78 0.14 80 / 0.06)" }}
                      >
                        <MapIcon />
                        <span>Ver en Google Maps</span>
                        <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                      </a>
                    </div>

                    {/* Bottom thanks */}
                    <div className="mt-10 md:mt-14 text-center md:text-left">
                      <p className="font-serif-elegant italic text-lg md:text-xl text-gold">Gracias a quienes</p>
                      <p className="font-sans text-[0.7rem] md:text-xs tracking-[0.2em] uppercase text-foreground/85 mt-1">hicieron posible este logro.</p>
                      <Flourish className="mt-5 md:mt-6 md:justify-start" />
                    </div>

                    {/* Parents card — mobile only (inside info panel) */}
                    <div className="md:hidden mt-7">
                      <div className="relative rounded-xl px-5 py-4 text-center" style={{ background: "linear-gradient(135deg, oklch(0.08 0.005 60 / 0.85), oklch(0.05 0.005 60 / 0.85))", border: "1px solid oklch(0.78 0.14 80 / 0.5)", backdropFilter: "blur(10px)" }}>
                        <p className="font-sans tracking-[0.3em] text-[0.6rem] uppercase text-gold mb-2">Con el amor de mis padres</p>
                        <p className="font-display text-base text-foreground tracking-wide">JOSÉ MARTÍNEZ</p>
                        <p className="font-serif-elegant italic text-gold text-sm my-0.5">&</p>
                        <p className="font-display text-base text-foreground tracking-wide">YASMIRIS RODELO</p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — photo (desktop only) */}
                  <div className="relative hidden md:block overflow-hidden">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, oklch(0.78 0.14 80 / 0.25) 0%, transparent 60%)" }} />
                    <img
                      src={heroImg}
                      alt="José Ángel Martínez Rodelo"
                      className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
                    />
                    <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, oklch(0.06 0.005 60) 0%, oklch(0.06 0.005 60 / 0.3) 40%, transparent 60%, transparent 80%, oklch(0.06 0.005 60 / 0.5) 100%)" }} />
                    <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.06 0.005 60 / 0.5) 0%, transparent 25%, transparent 55%, oklch(0.06 0.005 60 / 0.9) 100%)" }} />
                    <div aria-hidden className="absolute top-0 left-0 right-0 h-[30%]" style={{ background: "linear-gradient(180deg, oklch(0.06 0.005 60 / 0.6) 0%, transparent 100%)" }} />

                    {/* Gold light leak from top-right */}
                    <div aria-hidden className="absolute -top-20 -right-20 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.15) 0%, transparent 60%)", filter: "blur(40px)" }} />

                    {/* Diagonal gold accent lines with glow */}
                    <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="goldline" x1="0" x2="1">
                          <stop offset="0" stopColor="oklch(0.97 0.08 88)" />
                          <stop offset="0.5" stopColor="oklch(0.82 0.16 84)" />
                          <stop offset="1" stopColor="oklch(0.55 0.13 70)" />
                        </linearGradient>
                      </defs>
                      <polyline points="0,15 18,0" fill="none" stroke="url(#goldline)" strokeWidth="1.8" opacity="0.8" />
                      <polyline points="0,24 26,0" fill="none" stroke="url(#goldline)" strokeWidth="1" opacity="0.5" />
                      <polyline points="0,33 35,0" fill="none" stroke="url(#goldline)" strokeWidth="0.6" opacity="0.3" />
                      <polyline points="0,42 44,0" fill="none" stroke="url(#goldline)" strokeWidth="0.3" opacity="0.15" />
                      <polyline points="100,72 78,100" fill="none" stroke="url(#goldline)" strokeWidth="1.8" opacity="0.8" />
                      <polyline points="100,81 88,100" fill="none" stroke="url(#goldline)" strokeWidth="1" opacity="0.5" />
                      <polyline points="100,90 96,100" fill="none" stroke="url(#goldline)" strokeWidth="0.6" opacity="0.3" />
                    </svg>

                    {/* Gold glow orb behind parents card */}
                    <div aria-hidden className="absolute bottom-0 right-0 w-72 h-72" style={{ background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.2) 0%, transparent 60%)", filter: "blur(40px)" }} />

                    {/* Parents card overlay */}
                    <div className="absolute bottom-6 right-6 left-6 md:left-auto md:max-w-[75%]">
                      <div className="relative rounded-xl px-6 py-5 text-center md:text-right" style={{ background: "linear-gradient(135deg, oklch(0.09 0.005 60 / 0.94), oklch(0.06 0.005 60 / 0.94))", border: "1px solid oklch(0.78 0.14 80 / 0.5)", backdropFilter: "blur(12px)", boxShadow: "0 8px 32px oklch(0 0 0 / 0.5)" }}>
                        <p className="font-sans tracking-[0.3em] text-[0.65rem] uppercase text-gold mb-3">Con el amor de mis padres</p>
                        <p className="font-display text-lg text-foreground tracking-wide">JOSÉ MARTÍNEZ</p>
                        <p className="font-serif-elegant italic text-gold text-base my-1">&</p>
                        <p className="font-display text-lg text-foreground tracking-wide">YASMIRIS RODELO</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* COUNTDOWN */}
          <section id="cuenta" className="relative px-6 md:px-16 py-24 md:py-32 overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 20% 30%, oklch(0.22 0.06 25 / 0.55) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, oklch(0.18 0.07 280 / 0.5) 0%, transparent 55%), linear-gradient(180deg, oklch(0.09 0.015 30) 0%, oklch(0.07 0.02 290) 100%)",
            }}
          >
            <div aria-hidden className="aurora-bar" />
            {/* hairline gold borders top/bottom */}
            <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
            <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

            {/* Desktop ambient glow */}
            <div aria-hidden className="hidden md:block absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
            <div aria-hidden className="hidden md:block absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />

            <div className="relative max-w-5xl mx-auto text-center">
              <Reveal>
                <p className="font-serif-elegant tracking-[0.5em] text-xs uppercase text-gold/85 mb-3">Cuenta Regresiva</p>
                <Flourish className="mx-auto mb-6" />
                <h2 className="font-luxe text-4xl md:text-6xl gradient-gold-text mb-14 md:mb-20 tracking-[0.06em]">El Gran Día se Acerca</h2>
              </Reveal>
              <Reveal delay={150}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  {[
                    { l: "Días", v: t.d },
                    { l: "Horas", v: t.h },
                    { l: "Minutos", v: t.m },
                    { l: "Segundos", v: t.s },
                  ].map((it) => (
                    <div key={it.l} className="relative">
                      <div className="absolute -inset-1 rounded-2xl opacity-40 blur-xl" style={{ background: "var(--gradient-gold)" }} />
                      <div
                        className="relative gold-border-anim rounded-2xl py-9 md:py-12 px-4"
                        style={{
                          background:
                            "linear-gradient(180deg, oklch(0.14 0.01 60 / 0.95) 0%, oklch(0.09 0.005 60 / 0.95) 100%)",
                          boxShadow:
                            "inset 0 1px 0 oklch(1 0 0 / 0.06), inset 0 0 30px oklch(0.78 0.14 80 / 0.08), 0 14px 40px oklch(0 0 0 / 0.5)",
                        }}
                      >
                        <p className="font-luxe text-6xl md:text-8xl gradient-gold-text tabular-nums leading-none mb-3">
                          {String(it.v).padStart(2, "0")}
                        </p>
                        <div className="mx-auto w-8 md:w-10 h-px mb-3" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
                        <p className="font-serif-elegant tracking-[0.4em] text-[0.65rem] md:text-xs uppercase text-gold/85">{it.l}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* GALLERY */}
          <section id="galeria" className="px-6 md:px-12 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="text-center mb-14 md:mb-20">
                  <p className="font-serif-elegant tracking-[0.45em] text-xs uppercase text-gold/80 mb-3">Galería</p>
                  <Flourish className="mx-auto mb-6" />
                  <h2 className="font-luxe text-4xl md:text-6xl gradient-gold-text tracking-[0.06em]">Momentos Inolvidables</h2>
                </div>
              </Reveal>
              <Reveal>
                <GalleryCarousel images={[gallery1, gallery2, gallery3]} onOpen={setLightbox} />
              </Reveal>
              {/* Drive upload CTA */}
              <Reveal delay={100}>
                <div className="mt-14 md:mt-20 text-center">
                  <div className="inline-block relative rounded-2xl px-8 md:px-12 py-8 md:py-10" style={{ background: "linear-gradient(135deg, oklch(0.09 0.008 60 / 0.95), oklch(0.06 0.005 60 / 0.95))", border: "1px solid oklch(0.78 0.14 80 / 0.3)", boxShadow: "0 12px 40px oklch(0 0 0 / 0.4)" }}>
                    {/* cloud upload icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, oklch(0.78 0.14 80 / 0.15), oklch(0.78 0.14 80 / 0.05))", border: "1px solid oklch(0.78 0.14 80 / 0.4)", color: "var(--gold)" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 12v9" strokeLinecap="round"/>
                        <path d="m8 17 4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-sans tracking-[0.35em] text-[0.65rem] uppercase text-gold mb-1">Comparte tus fotos</p>
                    <p className="font-serif-elegant italic text-lg md:text-xl text-foreground/85 mb-1">Sube tus recuerdos del grado</p>
                    <p className="font-sans text-xs tracking-[0.1em] text-foreground/50 mb-6">Las fotos que subas las veremos todos</p>
                    <a
                      href="https://drive.google.com/drive/folders/1RC43Qy2OLdZ7hjteRxJEAusP6bTD_Aun?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      id="drive-upload-btn"
                      className="group relative inline-flex items-center gap-3 rounded-full font-serif-elegant uppercase text-background overflow-hidden"
                      style={{ background: "var(--gradient-gold)", paddingInline: "clamp(1.5rem, 6vw, 2.5rem)", paddingBlock: "clamp(0.75rem, 2.5vw, 0.95rem)", fontSize: "clamp(0.6rem, 2vw, 0.75rem)", letterSpacing: "0.3em", boxShadow: "0 8px 32px oklch(0.78 0.14 80 / 0.4)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 relative z-10">
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" strokeLinecap="round"/>
                        <path d="M12 12v9M8 17l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">Subir Fotos</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* RECEPCIÓN — San Nicolás */}
          <ReceptionSection />

          {/* FORMULARIO RSVP */}
          <RsvpSection />

          {/* FINAL MESSAGE — premium closing */}
          <section className="px-6 md:px-16 py-24 md:py-32 relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, oklch(0.78 0.14 80 / 0.08) 0%, transparent 60%)" }} />
            <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.5), transparent)" }} />

            {/* Desktop ambient glows */}
            <div aria-hidden className="hidden md:block absolute top-1/3 left-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
            <div aria-hidden className="hidden md:block absolute bottom-1/4 right-0 w-80 h-80 pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />

            <div className="relative max-w-4xl mx-auto text-center">
              <Reveal>
                {/* Label — neutral, not sentimental */}
                <p className="font-serif-elegant tracking-[0.5em] text-xs uppercase text-gold/70 mb-5">Palabras de gratitud</p>
                <Flourish className="mx-auto mb-10 md:mb-14" />

                {/* HEADLINE — user's exact text */}
                <div className="relative mb-14 md:mb-20">
                  <div aria-hidden className="absolute -inset-8 md:-inset-12 rounded-3xl opacity-15 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
                  <p className="relative font-luxe text-4xl md:text-7xl shimmer-text tracking-[0.04em] leading-[1.15]">
                    Con Dios al frente<br />
                    <span className="text-3xl md:text-5xl">y la familia como apoyo,</span><br />
                    <span className="text-2xl md:text-4xl text-foreground/80">todo sueño encuentra su camino.</span>
                  </p>
                </div>

                <Flourish className="mx-auto mb-10 md:mb-14" />

                {/* USER'S EXACT QUOTE */}
                <blockquote className="relative max-w-2xl mx-auto mb-14 md:mb-20">
                  <span aria-hidden className="absolute -top-4 -left-2 md:-top-6 md:-left-4 font-serif-elegant text-6xl md:text-8xl text-gold/20 leading-none select-none">"</span>
                  <p className="font-serif-elegant italic text-xl md:text-3xl text-foreground/85 leading-relaxed px-6 md:px-12">
                    Hoy este logro no es solo mío,<br />
                    también pertenece a quienes creyeron en mí<br />
                    desde el principio.
                  </p>
                  <span aria-hidden className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-4 font-serif-elegant text-6xl md:text-8xl text-gold/20 leading-none select-none">"</span>
                </blockquote>

                <Flourish className="mx-auto mb-12 md:mb-16" />

                {/* PILLARS — Dios · Fe · Familia */}
                <div className="grid grid-cols-3 gap-5 md:gap-8 mb-16 md:mb-20 max-w-md md:max-w-lg mx-auto">
                  {[
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
                          {/* Cross */}
                          <path d="M12 2v20M5 7h14" strokeLinecap="round"/>
                        </svg>
                      ),
                      label: "Dios"
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
                          {/* Infinity / faith */}
                          <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z"/>
                          <path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/>
                        </svg>
                      ),
                      label: "Fe"
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
                          {/* People / family */}
                          <circle cx="9" cy="7" r="3"/>
                          <path d="M3 21v-2a5 5 0 0 1 7.54-4.3"/>
                          <circle cx="17" cy="10" r="3"/>
                          <path d="M21 21v-2a5 5 0 0 0-5-5h-1"/>
                        </svg>
                      ),
                      label: "Familia"
                    },
                  ].map((it, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 hover:scale-110"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.78 0.14 80 / 0.14), oklch(0.78 0.14 80 / 0.06))",
                          border: "1px solid oklch(0.78 0.14 80 / 0.4)",
                          boxShadow: "0 4px 20px oklch(0.78 0.14 80 / 0.12)",
                          color: "var(--gold)",
                        }}
                      >
                        {it.icon}
                      </div>
                      <p className="font-display tracking-[0.35em] text-[0.7rem] uppercase text-gold/90">{it.label}</p>
                    </div>
                  ))}
                </div>

                {/* ── PREMIUM DIFFERENTIATOR: Animated Gold Wax Seal ── */}
                <div className="flex justify-center mb-14">
                  <div className="relative w-36 h-36">
                    {/* Rotating outer ring */}
                    <svg
                      aria-hidden
                      className="absolute inset-0 w-full h-full animate-spin"
                      style={{ animationDuration: "28s", animationTimingFunction: "linear" }}
                      viewBox="0 0 144 144"
                    >
                      <defs>
                        <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="oklch(0.97 0.08 88)" />
                          <stop offset="50%" stopColor="oklch(0.82 0.16 84)" />
                          <stop offset="100%" stopColor="oklch(0.5 0.12 65)" />
                        </linearGradient>
                      </defs>
                      {/* 24-point star border */}
                      {Array.from({ length: 24 }).map((_, i) => {
                        const a = (i / 24) * Math.PI * 2;
                        const x1 = 72 + 68 * Math.cos(a);
                        const y1 = 72 + 68 * Math.sin(a);
                        const x2 = 72 + 58 * Math.cos(a);
                        const y2 = 72 + 58 * Math.sin(a);
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#sealGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />;
                      })}
                      <circle cx="72" cy="72" r="62" fill="none" stroke="url(#sealGrad)" strokeWidth="1" opacity="0.5" />
                      <circle cx="72" cy="72" r="54" fill="none" stroke="url(#sealGrad)" strokeWidth="0.5" opacity="0.3" />
                    </svg>
                    {/* Center disc */}
                    <div
                      className="absolute inset-6 rounded-full flex items-center justify-center"
                      style={{
                        background: "radial-gradient(circle at 35% 35%, oklch(0.22 0.04 70), oklch(0.08 0.005 60))",
                        border: "1px solid oklch(0.78 0.14 80 / 0.6)",
                        boxShadow: "0 0 24px oklch(0.78 0.14 80 / 0.3), inset 0 2px 4px oklch(0.92 0.1 88 / 0.15)",
                      }}
                    >
                      <img src={capGold} alt="" aria-hidden className="w-10 h-8 animate-float-soft" style={{ filter: "drop-shadow(0 0 8px oklch(0.82 0.15 82 / 0.7))" }} />
                    </div>
                  </div>
                </div>

                <Flourish className="mx-auto mb-6 md:mb-8" />
                <p className="font-serif-elegant tracking-[0.4em] text-xs uppercase text-gold/75 mb-4">Con gratitud</p>
                <p className="font-luxe text-4xl md:text-6xl gradient-gold-text tracking-[0.08em]">José Ángel Martínez R.</p>
                <div className="mt-12 md:mt-16 flex items-center justify-center gap-4">
                  <span className="block h-px w-16" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
                  <span className="text-gold text-xl">✦</span>
                  <span className="block h-px w-16" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                </div>
              </Reveal>
            </div>
          </section>

          {/* Floating WhatsApp button */}
          <a
            href={`https://wa.me/573142296307?text=${encodeURIComponent('Hola Jose Angel, acabo de ver tu invitacion y no me la puedo perder. Ahí estare el 29 de mayo celebrando contigo este enorme logro! Felicitaciones, te lo mereces todo.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Confirmar asistencia por WhatsApp"
            className="fixed bottom-6 right-6 z-40 group"
          >
            <span aria-hidden className="absolute inset-0 rounded-full animate-pulse-gold" />
            <span className="relative flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: "var(--gradient-gold)", boxShadow: "0 10px 30px oklch(0.78 0.14 80 / 0.45), 0 0 0 1px oklch(0.78 0.14 80 / 0.6)" }}>
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="oklch(0.08 0.005 60)">
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .14 5.34.14 11.92c0 2.1.55 4.15 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.56 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.48-8.42zM12.08 21.8a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.65-.23-.37a9.84 9.84 0 0 1-1.51-5.26c0-5.46 4.45-9.9 9.9-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.45-4.45 9.88-9.94 9.88zm5.43-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34z"/>
              </svg>
            </span>
          </a>

          {/* ── FOOTER ── */}
          <footer className="relative z-10 px-6 md:px-12 pb-10 md:pb-14 pt-2">
            <div
              className="max-w-4xl mx-auto rounded-2xl px-8 md:px-12 py-8 md:py-12 text-center"
              style={{
                background: "linear-gradient(135deg, oklch(0.07 0.008 60 / 0.98), oklch(0.05 0.005 60 / 0.98))",
                border: "1px solid oklch(0.78 0.14 80 / 0.2)",
                boxShadow: "0 -4px 40px oklch(0 0 0 / 0.4), inset 0 1px 0 oklch(0.92 0.1 88 / 0.08)",
              }}
            >
              {/* Gold top hairline */}
              <div aria-hidden className="absolute top-0 left-8 right-8 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.6), transparent)" }} />

              {/* Social links */}
              <p className="font-serif-elegant tracking-[0.45em] text-[0.65rem] uppercase text-gold/65 mb-5">Sígueme en redes</p>
              <div className="flex items-center justify-center gap-5 mb-7">
                {[
                  {
                    href: "https://www.facebook.com/share/1QFGzsYHE4/",
                    label: "Facebook",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.instagram.com/joke_0117?utm_source=qr&igsh=cmV5cTFhaTQzdnUw",
                    label: "Instagram",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.tiktok.com/@martinez_joke21?_r=1&_t=ZS-96MU69zjnld",
                    label: "TikTok",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.15 8.15 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      background: "oklch(0.78 0.14 80 / 0.08)",
                      border: "1px solid oklch(0.78 0.14 80 / 0.3)",
                      color: "oklch(0.78 0.14 80 / 0.7)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.14 80 / 0.18)";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.78 0.14 80 / 0.7)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.14 80 / 0.08)";
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.14 80 / 0.7)";
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.78 0.14 80 / 0.3)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="block h-px w-12" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 80 / 0.4))" }} />
                <span className="text-gold/40 text-xs">✦</span>
                <span className="block h-px w-12" style={{ background: "linear-gradient(90deg, oklch(0.78 0.14 80 / 0.4), transparent)" }} />
              </div>

              {/* Credit */}
              <p className="font-sans text-[0.68rem] tracking-[0.2em] uppercase" style={{ color: "oklch(0.78 0.14 80 / 0.45)" }}>
                Developed by{" "}
                <span className="font-semibold" style={{ color: "oklch(0.78 0.14 80 / 0.75)" }}>ING. José Martínez</span>
              </p>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}

// ── SITE HEADER with hamburger menu ────────────────────────────────────
const NAV_LINKS = [
  { href: "#inicio",    label: "Inicio" },
  { href: "#cuenta",   label: "Cuenta Regresiva" },
  { href: "#galeria",  label: "Galería" },
  { href: "#recepcion",label: "Recepción" },
  { href: "#confirmar",label: "Confirmar Asistencia" },
];

function SiteHeader() {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Fixed header bar */}
      <header
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-5 md:px-10"
        style={{
          height: "60px",
          background: "oklch(0.06 0.005 60 / 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.78 0.14 80 / 0.18)",
          boxShadow: "0 2px 24px oklch(0 0 0 / 0.4)",
        }}
      >
        {/* Logo / name */}
        <div className="flex items-center gap-3">
          <img src={capGold} alt="" aria-hidden className="h-7 w-auto" style={{ filter: "drop-shadow(0 0 8px oklch(0.82 0.15 82 / 0.6))" }} />
          <span className="font-luxe tracking-[0.18em] shimmer-text" style={{ fontSize: "clamp(0.85rem, 3vw, 1.05rem)" }}>
            Mi Grado
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-sans text-[0.68rem] tracking-[0.25em] uppercase text-foreground/70 hover:text-gold transition-colors duration-300"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Hamburger button */}
        <button
          id="hamburger-btn"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(v => !v)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg transition-all duration-500"
          style={{
            border: "1px solid oklch(0.78 0.14 80 / 0.3)",
            background: open ? "oklch(0.78 0.14 80 / 0.15)" : "oklch(0.78 0.14 80 / 0.06)",
            transform: open ? "rotate(180deg)" : "none",
            boxShadow: open ? "0 0 20px oklch(0.82 0.15 82 / 0.2)" : "none",
          }}
        >
          <span
            className="block h-[1.5px] rounded-full transition-all duration-500 origin-center"
            style={{ width: open ? 22 : 20, background: "var(--gold)", transform: open ? "rotate(45deg) translateY(6.5px)" : "none" }}
          />
          <span
            className="block h-[1.5px] rounded-full transition-all duration-300"
            style={{ width: 20, background: "var(--gold)", opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }}
          />
          <span
            className="block h-[1.5px] rounded-full transition-all duration-500 origin-center"
            style={{ width: open ? 22 : 20, background: "var(--gold)", transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none" }}
          />
        </button>
      </header>

      {/* Spacer so content doesn't hide under header */}
      <div className="h-[60px] md:hidden" />

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "oklch(0 0 0 / 0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in drawer */}
      <nav
        className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col pt-[60px]"
        style={{
          width: "min(280px, 80vw)",
          background: "linear-gradient(180deg, oklch(0.08 0.008 60) 0%, oklch(0.05 0.005 60) 100%)",
          borderLeft: "1px solid oklch(0.78 0.14 80 / 0.25)",
          boxShadow: "-8px 0 40px oklch(0 0 0 / 0.6)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Gold top accent */}
        <div style={{ height: 3, background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.8), transparent)" }} />

        <div className="flex flex-col px-8 py-8 gap-1">
          <p
            className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-gold/50 mb-6"
            style={{ animation: open ? "fade-in-slow 0.6s ease-out 0.1s both" : "none" }}
          >Navegar</p>
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="group flex items-center gap-4 py-4 text-left border-b transition-all duration-300 hover:pl-2"
              style={{
                borderColor: "oklch(0.78 0.14 80 / 0.1)",
                animation: open ? `slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07}s both` : "none",
              }}
            >
              <span
                className="w-1 h-4 rounded-full transition-all duration-300 group-hover:h-6"
                style={{ background: "var(--gradient-gold)", opacity: 0.7 }}
              />
              <span className="font-sans text-[0.78rem] tracking-[0.2em] uppercase text-foreground/75 group-hover:text-gold transition-colors duration-300">
                {l.label}
              </span>
            </button>
          ))}
        </div>

        {/* Footer signature */}
        <div className="mt-auto px-8 py-8" style={{ animation: open ? "fade-in-slow 0.6s ease-out 0.3s both" : "none" }}>
          <Flourish />
          <p className="font-serif-elegant italic text-center text-sm text-gold/50 mt-4">José Ángel · 2026</p>
        </div>
      </nav>
    </>
  );
}

// ── RECEPTION SECTION ──────────────────────────────────────────────────
function ReceptionSection() {
  return (
    <section id="recepcion" className="relative px-6 md:px-16 py-24 md:py-32 overflow-hidden">
      {/* Gold hairlines */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.5), transparent)" }} />
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.4), transparent)" }} />

      {/* Ambient glows */}
      <div aria-hidden className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.07) 0%, transparent 65%)", filter: "blur(60px)" }} />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.05) 0%, transparent 65%)", filter: "blur(60px)" }} />

      <div className="relative max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-serif-elegant tracking-[0.5em] text-xs uppercase text-gold/80 mb-3">Después de la ceremonia</p>
            <Flourish className="mx-auto mb-6" />
            <h2 className="font-luxe text-4xl md:text-6xl gradient-gold-text tracking-[0.06em]">Recepción</h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* Card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.09 0.008 60 / 0.97), oklch(0.06 0.005 60 / 0.97))",
              border: "1px solid oklch(0.78 0.14 80 / 0.35)",
              boxShadow: "0 20px 60px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.78 0.14 80 / 0.08), inset 0 1px 0 oklch(0.92 0.1 88 / 0.06)",
            }}
          >
            {/* Corner ornaments */}
            <div aria-hidden className="absolute inset-3 pointer-events-none z-10">
              <CornerOrnaments size={40} />
            </div>

            <div className="relative z-20 grid md:grid-cols-2 gap-0">
              {/* LEFT — Restaurant info */}
              <div className="px-8 md:px-12 py-10 md:py-14 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r" style={{ borderColor: "oklch(0.78 0.14 80 / 0.2)" }}>
                {/* Fork & knife icon */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg, oklch(0.78 0.14 80 / 0.15), oklch(0.78 0.14 80 / 0.05))", border: "1px solid oklch(0.78 0.14 80 / 0.4)", color: "var(--gold)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
                    <path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2" strokeLinecap="round" />
                    <path d="M7 2v20" strokeLinecap="round" />
                    <path d="M21 15V2a5 5 0 0 0-5 5v6h3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.5 13V22" strokeLinecap="round" />
                  </svg>
                </div>

                <p className="font-sans tracking-[0.35em] text-[0.65rem] uppercase text-gold mb-2">Restaurante · Bar</p>
                <h3 className="font-luxe text-3xl md:text-4xl text-foreground tracking-[0.06em] mb-1">San Nicolás</h3>
                <p className="font-serif-elegant italic text-gold text-lg mt-1 tracking-wider">7:00 P.M.</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mt-3" style={{ background: "oklch(0.78 0.14 80 / 0.1)", border: "1px solid oklch(0.78 0.14 80 / 0.3)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-gold">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-gold">Servicio estilo americano</span>
                </div>
                <div className="divider-gold my-5" style={{ width: 80 }} />

                {/* Address */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="mt-0.5 shrink-0 text-gold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-sans text-sm tracking-[0.1em] text-foreground/90">Cra 56 # 72 - 128</p>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold/70 mt-0.5">Barranquilla, Colombia</p>
                  </div>
                </div>

                {/* Map link */}
                <a
                  href="https://maps.google.com/?q=Cra+56+%23+72-128+Barranquilla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.72rem] tracking-[0.2em] uppercase font-sans transition-all duration-300 hover:bg-gold/10"
                  style={{ border: "1px solid oklch(0.78 0.14 80 / 0.5)", color: "var(--gold)", background: "oklch(0.78 0.14 80 / 0.06)" }}
                >
                  <MapIcon />
                  <span>Ver en Google Maps</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                </a>
              </div>

              {/* RIGHT — Menu link */}
              <div className="px-8 md:px-12 py-10 md:py-14 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg, oklch(0.78 0.14 80 / 0.15), oklch(0.78 0.14 80 / 0.05))", border: "1px solid oklch(0.78 0.14 80 / 0.4)", color: "var(--gold)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
                    <path d="M4 6h16M4 10h16M4 14h10M4 18h6" strokeLinecap="round" />
                  </svg>
                </div>

                <p className="font-sans tracking-[0.35em] text-[0.65rem] uppercase text-gold mb-2">Disponible en línea</p>
                <p className="font-serif-elegant italic text-2xl md:text-3xl text-foreground/90 mb-2">Menú de la noche</p>
                <p className="font-sans text-xs tracking-[0.12em] text-foreground/60 mb-8 max-w-[220px]">Explora los platillos y bebidas que disfrutaremos en la recepción</p>

                <a
                  href="https://drive.google.com/file/d/1LexmkhJFaI39BIOyd8ANzVSSFez2fsqJ/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="menu-link"
                  className="group relative inline-flex items-center gap-3 rounded-full font-serif-elegant uppercase text-background overflow-hidden"
                  style={{
                    background: "var(--gradient-gold)",
                    paddingInline: "clamp(1.5rem, 6vw, 2.5rem)",
                    paddingBlock: "clamp(0.8rem, 2.5vw, 1rem)",
                    fontSize: "clamp(0.6rem, 2vw, 0.78rem)",
                    letterSpacing: "0.3em",
                    boxShadow: "0 8px 32px oklch(0.78 0.14 80 / 0.45)",
                  }}
                >
                  <span className="relative z-10">Ver Menú</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 relative z-10 group-hover:translate-y-0.5 transition-transform">
                    <path d="M12 16V3M5 10l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>

                <Flourish className="mt-10" />
                <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold/50 mt-4">Archivo adjunto</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── RSVP SECTION ───────────────────────────────────────────────────────
// Google Sheets: guarda las confirmaciones
const GAS_URL    = "https://script.google.com/macros/s/AKfycbxWqNeVa2rTyCWHE54QJ39Cih-nvigFaf1MgK-F6D1R4_qIWvFEEHVLnLNICfJhN9OWnQ/exec";
const GAS_SECRET = "mi-secreto-2026";

function RsvpSection() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waLink, setWaLink] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim()) {
      setErrorMsg("Por favor completa tu nombre y apellido.");
      return;
    }
    if (!celular.trim() || celular.replace(/\D/g, "").length < 7) {
      setErrorMsg("Por favor ingresa un número de celular válido.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("Por favor ingresa un correo electrónico válido.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    const fullName = `${nombre.trim()} ${apellido.trim()}`;
    // Limpiar número: quitar todo lo que no sea dígito, agregar 57 si empieza por 3
    const rawPhone = celular.replace(/\D/g, "");
    const guestPhone = rawPhone.startsWith("57") ? rawPhone : `57${rawPhone}`;

    // Mensaje para el ADMIN — El invitado te enviará este mensaje al terminar
    const WA_ADMIN = "573142296307";
    const waToAdmin = encodeURIComponent(
      `¡Hola José Ángel! Acabo de confirmar mi asistencia en tu página web. 🎉\n\nSoy *${fullName}*.\n¡Nos vemos en la graduación! 🎓`
    );

    // ── Enviar correos (Invitado y Admin) usando SendGrid vía Netlify Function ──
    try {
      await fetch("/.netlify/functions/send-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          celular: `+${guestPhone}`,
          email: email.trim(),
        }),
      });
    } catch (err) {
      console.warn("Error enviando correos vía Netlify Function:", err);
    }

    // ── Guardar en Google Sheets (solo almacenamiento, sin correo al usuario) ─
    // El Apps Script solo guarda en el Sheet; no envía correos
    if (GAS_URL && !GAS_URL.includes("TU_ID")) {
      try {
        await fetch(GAS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: GAS_SECRET,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            celular: `+${guestPhone}`,
            email: email.trim(),
          }),
        });
      } catch (err) {
        console.warn("Error guardando en Sheets:", err);
      }
    }

    setStatus("success");

    // ── Abrir WhatsApp Web para el INVITADO (confirmación manual) ────────
    const waLinkFinal = `https://wa.me/${WA_ADMIN}?text=${waToAdmin}`;
    setWaLink(waLinkFinal);
    
    setTimeout(() => {
      window.location.href = waLinkFinal;
    }, 1500);
  };

  return (
    <section id="confirmar" className="relative px-6 md:px-16 py-24 md:py-32 overflow-hidden scroll-mt-[80px]">
      {/* Background accent */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, oklch(0.78 0.14 80 / 0.07) 0%, transparent 60%)" }} />
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.5), transparent)" }} />

      <div className="relative max-w-2xl mx-auto">
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-serif-elegant tracking-[0.5em] text-xs uppercase text-gold/80 mb-3">¿Vendrás a celebrar?</p>
            <Flourish className="mx-auto mb-6" />
            <h2 className="font-luxe text-4xl md:text-6xl gradient-gold-text tracking-[0.06em]">Confirma tu Asistencia</h2>
            <p className="font-sans text-sm text-foreground/65 mt-5 tracking-[0.08em]">
              Déjanos saber que contaremos contigo esa noche especial.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.09 0.008 60 / 0.97), oklch(0.06 0.005 60 / 0.97))",
              border: "1px solid oklch(0.78 0.14 80 / 0.35)",
              boxShadow: "0 20px 60px oklch(0 0 0 / 0.4), inset 0 1px 0 oklch(0.92 0.1 88 / 0.06)",
            }}
          >
            <div aria-hidden className="absolute inset-3 pointer-events-none z-10">
              <CornerOrnaments size={36} />
            </div>

            <div className="relative z-20 px-8 md:px-12 py-10 md:py-14">
              {status === "success" ? (
                /* ── Éxito ── */
                <div className="text-center py-6 animate-fade-in-slow">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse-gold" style={{ background: "linear-gradient(135deg, oklch(0.78 0.14 80 / 0.2), oklch(0.78 0.14 80 / 0.08))", border: "1px solid oklch(0.78 0.14 80 / 0.5)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" className="w-9 h-9">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-luxe text-3xl gradient-gold-text tracking-[0.06em] mb-3">¡Confirmado!</p>
                  <p className="font-serif-elegant italic text-foreground/75 text-lg mb-2">
                    {nombre} {apellido}, nos alegra mucho contar contigo.
                  </p>
                  <Flourish className="mx-auto mb-6" />
                  {waLink && (
                    <a 
                      href={waLink} 
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all"
                      style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96a)", color: "#0a0906" }}
                    >
                      Abrir comprobante en WhatsApp
                    </a>
                  )}
                </div>
              ) : (
                /* ── Formulario ── */
                <form id="rsvp-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nombre */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="rsvp-nombre" className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold/80">
                        Nombre *
                      </label>
                      <input
                        id="rsvp-nombre"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full rounded-xl px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/35 outline-none transition-all duration-300 disabled:opacity-50"
                        style={{
                          background: "oklch(0.12 0.008 60 / 0.8)",
                          border: "1px solid oklch(0.78 0.14 80 / 0.3)",
                          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.03)",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.7)"; e.currentTarget.style.boxShadow = "0 0 0 2px oklch(0.78 0.14 80 / 0.12)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.3)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 oklch(1 0 0 / 0.03)"; }}
                      />
                    </div>

                    {/* Apellido */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="rsvp-apellido" className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold/80">
                        Apellido *
                      </label>
                      <input
                        id="rsvp-apellido"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Tu apellido"
                        value={apellido}
                        onChange={e => setApellido(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full rounded-xl px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/35 outline-none transition-all duration-300 disabled:opacity-50"
                        style={{
                          background: "oklch(0.12 0.008 60 / 0.8)",
                          border: "1px solid oklch(0.78 0.14 80 / 0.3)",
                          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.03)",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.7)"; e.currentTarget.style.boxShadow = "0 0 0 2px oklch(0.78 0.14 80 / 0.12)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.3)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 oklch(1 0 0 / 0.03)"; }}
                      />
                    </div>
                  </div>

                  {/* Celular */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rsvp-celular" className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold/80">
                      Celular *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-gold/60 select-none">+57</span>
                      <input
                        id="rsvp-celular"
                        type="tel"
                        autoComplete="tel"
                        placeholder="314 229 6307"
                        value={celular}
                        onChange={e => setCelular(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full rounded-xl pl-12 pr-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/35 outline-none transition-all duration-300 disabled:opacity-50"
                        style={{
                          background: "oklch(0.12 0.008 60 / 0.8)",
                          border: "1px solid oklch(0.78 0.14 80 / 0.3)",
                          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.03)",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.7)"; e.currentTarget.style.boxShadow = "0 0 0 2px oklch(0.78 0.14 80 / 0.12)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.3)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 oklch(1 0 0 / 0.03)"; }}
                      />
                    </div>
                    <p className="font-sans text-[0.63rem] tracking-[0.1em] text-foreground/40">Para enviarte la confirmación por WhatsApp</p>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rsvp-email" className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold/80">
                      Correo electrónico *
                    </label>
                    <input
                      id="rsvp-email"
                      type="email"
                      autoComplete="email"
                      placeholder="tucorreo@ejemplo.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full rounded-xl px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/35 outline-none transition-all duration-300 disabled:opacity-50"
                      style={{
                        background: "oklch(0.12 0.008 60 / 0.8)",
                        border: "1px solid oklch(0.78 0.14 80 / 0.3)",
                        boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.03)",
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.7)"; e.currentTarget.style.boxShadow = "0 0 0 2px oklch(0.78 0.14 80 / 0.12)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.3)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 oklch(1 0 0 / 0.03)"; }}
                    />
                    <p className="font-sans text-[0.63rem] tracking-[0.1em] text-foreground/40">Para enviarte la confirmación por correo</p>
                  </div>

                  {errorMsg && (
                    <p className="font-sans text-xs text-red-400 tracking-[0.1em]">{errorMsg}</p>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col items-center gap-4 pt-2">
                    <button
                      id="rsvp-submit"
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full font-serif-elegant uppercase text-background overflow-hidden transition-opacity disabled:opacity-60"
                      style={{
                        background: "var(--gradient-gold)",
                        paddingInline: "clamp(2rem, 8vw, 3.5rem)",
                        paddingBlock: "clamp(0.85rem, 3vw, 1.1rem)",
                        fontSize: "clamp(0.65rem, 2.5vw, 0.82rem)",
                        letterSpacing: "0.3em",
                        boxShadow: "0 8px 40px oklch(0.78 0.14 80 / 0.5)",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-background/40 border-t-background animate-spin" />
                          <span className="relative z-10">Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Confirmar Asistencia</span>
                          {/* WhatsApp icon */}
                          <svg viewBox="0 0 24 24" className="w-5 h-5 relative z-10" fill="oklch(0.08 0.005 60)">
                            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .14 5.34.14 11.92c0 2.1.55 4.15 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.56 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.48-8.42zM12.08 21.8a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.65-.23-.37a9.84 9.84 0 0 1-1.51-5.26c0-5.46 4.45-9.9 9.9-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.45-4.45 9.88-9.94 9.88zm5.43-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34z" />
                          </svg>
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </>
                      )}
                    </button>
                    <p className="font-sans text-[0.65rem] tracking-[0.15em] text-foreground/45 uppercase">
                      Confirma tu asistencia
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 16l4.553-2.276A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 5m0 15V5m0 0L9 7" />
    </svg>
  );
}

const GALLERY_LABELS = ["Logro", "Diploma", "Dedicación"];

function GalleryCarousel({ images, onOpen }: { images: string[]; onOpen: (src: string) => void }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }));

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
        plugins={[autoplay.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {images.map((src, i) => (
            <CarouselItem key={i} className="pl-4 basis-[82%] md:basis-1/2 lg:basis-1/3">
              <button
                type="button"
                onClick={() => onOpen(src)}
                className="group relative block w-full aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden gold-border-anim transition-transform duration-500 hover:scale-[1.02]"
                style={{ boxShadow: "0 20px 50px oklch(0 0 0 / 0.5), 0 0 40px oklch(0.78 0.14 80 / 0.12)" }}
              >
                <img src={src} alt={`Momento ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, oklch(0.06 0.005 60 / 0.85) 100%)" }} />
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <p className="font-serif-elegant italic text-gold text-base tracking-wider">{GALLERY_LABELS[i]}</p>
                  <span className="block h-px w-10 mt-2" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                </div>
                <span aria-hidden className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "oklch(0 0 0 / 0.6)", border: "1px solid oklch(0.78 0.14 80 / 0.5)" }}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" /></svg>
                </span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-2 bg-background/60 border-gold/40 text-gold hover:bg-background/80 hover:text-gold" />
        <CarouselNext className="hidden md:flex right-2 bg-background/60 border-gold/40 text-gold hover:bg-background/80 hover:text-gold" />
      </Carousel>
      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: current === i ? 32 : 10,
              background: current === i ? "var(--gradient-gold)" : "oklch(0.78 0.14 80 / 0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
