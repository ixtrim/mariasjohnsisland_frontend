"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronDown, ExternalLink } from "lucide-react";
import { FloatingDecorations, DecorativeDivider } from "./mexican-decorations";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  slogan?: string;
  backgroundImage?: string;
  showScrollIndicator?: boolean;
  height?: "full" | "large" | "medium";
  overlay?: "dark" | "light" | "gradient";
  ctaButtons?: { label: string; href: string; variant?: "primary" | "outline"; external?: boolean }[];
}

export function HeroSection({
  title = "Maria's",
  subtitle = "Mexican Grill",
  slogan = "Authentic Jalisco Flavors, Crafted Fresh Every Day",
  backgroundImage = "/images/hero-bg.jpg",
  showScrollIndicator = true,
  height = "full",
  overlay = "gradient",
  ctaButtons,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate title with split text effect
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, scale: 0.8, rotationX: 20 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.2, ease: "power4.out" }
      );
    }

    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40, letterSpacing: "0.5em" },
        { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 1, ease: "power3.out" },
        "-=0.7"
      );
    }

    // Animate decorative divider
    if (decorRef.current) {
      tl.fromTo(
        decorRef.current,
        { opacity: 0, scale: 0.5, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }

    // Animate slogan with typewriter effect
    if (sloganRef.current) {
      tl.fromTo(
        sloganRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.4"
      );
    }

    // Animate CTA buttons with stagger and bounce
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll("a");
      tl.fromTo(
        buttons,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: "back.out(1.4)" },
        "-=0.4"
      );
    }

    // Animate scroll indicator
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );

      // Continuous bounce animation
      gsap.to(scrollRef.current, {
        y: 15,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Parallax effect on scroll
    if (containerRef.current) {
      const bgImage = containerRef.current.querySelector(".hero-bg");
      if (bgImage) {
        gsap.to(bgImage, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }
  }, []);

  const heightClasses = {
    full: "min-h-screen",
    large: "min-h-[85vh]",
    medium: "min-h-[60vh]",
  };

  const overlayClasses = {
    dark: "bg-[#1c0301]/60",
    light: "bg-white/30",
    gradient: "bg-gradient-to-b from-[#1c0301]/80 via-[#1c0301]/40 to-[#1c0301]/80",
  };

  return (
    <section
      ref={containerRef}
      className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <div className="hero-bg absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Restaurant ambiance"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      </div>

      {/* Floating Mexican decorations */}
      <FloatingDecorations variant="hero" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="font-[family-name:var(--font-dancing)] text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white drop-shadow-2xl"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
        >
          {title}
        </h1>
        <p
          ref={subtitleRef}
          className="text-white text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase mt-2 drop-shadow-lg"
        >
          {subtitle}
        </p>

        <div ref={decorRef} className="my-8 md:my-10">
          <DecorativeDivider />
        </div>

        <p
          ref={sloganRef}
          className="text-xl sm:text-2xl md:text-3xl text-white/90 italic max-w-3xl mx-auto drop-shadow-lg font-light"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          {slogan}
        </p>

        {ctaButtons && ctaButtons.length > 0 && (
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center gap-5 mt-10"
          >
            {ctaButtons.map((btn, index) => (
              btn.external ? (
                <a
                  key={index}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-animated flex items-center gap-2 ${
                    btn.variant === "outline"
                      ? "px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1c0301] rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300"
                      : "px-10 py-4 bg-[#00a9e4] text-white rounded-full font-semibold text-sm uppercase tracking-wide shadow-xl shadow-[#00a9e4]/40"
                  }`}
                >
                  {btn.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  key={index}
                  href={btn.href}
                  className={`btn-animated ${
                    btn.variant === "outline"
                      ? "px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1c0301] rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300"
                      : "px-10 py-4 bg-[#00a9e4] text-white rounded-full font-semibold text-sm uppercase tracking-wide shadow-xl shadow-[#00a9e4]/40"
                  }`}
                >
                  {btn.label}
                </Link>
              )
            ))}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div
          ref={scrollRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
