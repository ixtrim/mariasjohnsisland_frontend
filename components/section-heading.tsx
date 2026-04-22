"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  dark = false,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".animate-in");
    gsap.set(elements, { opacity: 0, y: 30 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div
      ref={containerRef}
      className={cn("max-w-3xl mb-12", alignmentClasses[align], className)}
    >
      {eyebrow && (
        <span
          className={cn(
            "animate-in text-sm uppercase tracking-[0.2em] font-medium",
            dark ? "text-light-blue" : "text-primary"
          )}
        >
          {eyebrow}
        </span>
      )}

      <div
        className={cn(
          "decorative-divider my-4",
          align !== "center" && "justify-start"
        )}
      >
        <span className={cn("text-xl", dark ? "text-light-blue" : "text-primary")}>
          &#10022;
        </span>
      </div>

      <h2
        className={cn(
          "animate-in font-[family-name:var(--font-dancing)] text-4xl md:text-5xl lg:text-6xl text-[#121212] mb-8 [text-shadow:-3px_3px_0px_#00a9e4]",
          dark ? "text-white" : "text-dark"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "animate-in mt-4 text-lg leading-relaxed",
            dark ? "text-white/80" : "text-dark/70"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
