"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// SVG Mexican decorative elements
export function ChiliPepper({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 5C20 5 18 10 18 15C18 15 15 12 12 12C9 12 8 15 10 18C12 21 18 20 18 20C18 25 16 35 18 50C20 65 25 75 25 75C25 75 30 65 32 50C34 35 32 25 32 20C32 20 38 21 40 18C42 15 41 12 38 12C35 12 32 15 32 15C32 10 30 5 25 5Z"
        fill="#00a9e4"
      />
      <path
        d="M22 8C22 8 20 2 25 2C30 2 28 8 28 8"
        stroke="#1c0301"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Lime({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="25" fill="#c1eaf9" />
      <circle cx="30" cy="30" r="20" fill="#dbf2fa" />
      <path
        d="M30 15V45M20 20L40 40M15 30H45M20 40L40 20"
        stroke="#00a9e4"
        strokeWidth="2"
        opacity="0.5"
      />
      <circle cx="30" cy="30" r="5" fill="#00a9e4" opacity="0.3" />
    </svg>
  );
}

export function Cactus({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="22" y="20" width="16" height="70" rx="8" fill="#00a9e4" />
      <rect x="2" y="35" width="12" height="30" rx="6" fill="#00a9e4" />
      <rect x="46" y="45" width="12" height="25" rx="6" fill="#00a9e4" />
      <path d="M14 35V50H22" stroke="#00a9e4" strokeWidth="8" strokeLinecap="round" />
      <path d="M46 45V55H38" stroke="#00a9e4" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="30" cy="95" rx="20" ry="5" fill="#c1eaf9" />
    </svg>
  );
}

export function Avocado({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="25" cy="40" rx="20" ry="28" fill="#c1eaf9" />
      <ellipse cx="25" cy="42" rx="14" ry="20" fill="#dbf2fa" />
      <circle cx="25" cy="45" r="10" fill="#00a9e4" />
      <circle cx="23" cy="43" r="3" fill="white" opacity="0.5" />
    </svg>
  );
}

export function Taco({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 50C10 30 25 15 40 15C55 15 70 30 70 50"
        stroke="#00a9e4"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="30" cy="35" rx="6" ry="8" fill="#c1eaf9" />
      <ellipse cx="45" cy="32" rx="5" ry="7" fill="#dbf2fa" />
      <ellipse cx="55" cy="38" rx="4" ry="6" fill="#c1eaf9" />
      <circle cx="35" cy="42" r="4" fill="#00a9e4" opacity="0.5" />
      <circle cx="50" cy="44" r="3" fill="#00a9e4" opacity="0.5" />
    </svg>
  );
}

export function Sombrero({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="50" cy="50" rx="48" ry="8" fill="#00a9e4" />
      <ellipse cx="50" cy="48" rx="35" ry="6" fill="#c1eaf9" />
      <path
        d="M30 48C30 30 38 15 50 15C62 15 70 30 70 48"
        fill="#00a9e4"
      />
      <ellipse cx="50" cy="15" rx="10" ry="5" fill="#dbf2fa" />
      <path
        d="M35 35H65"
        stroke="#dbf2fa"
        strokeWidth="2"
      />
      <path
        d="M32 42H68"
        stroke="#dbf2fa"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Jalapeno({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8C10 8 8 15 8 25C8 40 12 55 15 55C18 55 22 40 22 25C22 15 20 8 15 8Z"
        fill="#00a9e4"
      />
      <path
        d="M12 5C12 5 14 0 15 0C16 0 18 5 18 5"
        stroke="#1c0301"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="12" cy="20" rx="2" ry="3" fill="white" opacity="0.3" />
    </svg>
  );
}

export function Margarita({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 25L30 70L50 25"
        fill="#c1eaf9"
        stroke="#00a9e4"
        strokeWidth="3"
      />
      <ellipse cx="30" cy="25" rx="22" ry="8" fill="#dbf2fa" stroke="#00a9e4" strokeWidth="2" />
      <rect x="28" y="68" width="4" height="10" fill="#00a9e4" />
      <ellipse cx="30" cy="78" rx="10" ry="3" fill="#00a9e4" />
      <circle cx="45" cy="20" r="8" fill="#c1eaf9" stroke="#00a9e4" strokeWidth="2" />
      <path d="M45 15V25M40 20H50" stroke="#00a9e4" strokeWidth="1" />
    </svg>
  );
}

interface FloatingDecorationsProps {
  variant?: "hero" | "section" | "footer";
}

export function FloatingDecorations({ variant = "section" }: FloatingDecorationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const decorations = containerRef.current.querySelectorAll(".floating-decor");
    
    decorations.forEach((decor, index) => {
      gsap.to(decor, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });
  }, []);

  if (variant === "hero") {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <ChiliPepper className="floating-decor absolute top-[10%] left-[5%] w-12 h-20 opacity-20" />
        <Lime className="floating-decor absolute top-[20%] right-[8%] w-16 h-16 opacity-25" />
        <Cactus className="floating-decor absolute bottom-[15%] left-[3%] w-14 h-24 opacity-15" />
        <Avocado className="floating-decor absolute bottom-[25%] right-[5%] w-12 h-16 opacity-20" />
        <Taco className="floating-decor absolute top-[60%] left-[8%] w-20 h-14 opacity-15" />
        <Sombrero className="floating-decor absolute top-[5%] right-[15%] w-24 h-16 opacity-20" />
        <Jalapeno className="floating-decor absolute bottom-[40%] right-[12%] w-8 h-14 opacity-20" />
        <Margarita className="floating-decor absolute top-[40%] left-[12%] w-14 h-20 opacity-15" />
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <ChiliPepper className="floating-decor absolute top-[20%] left-[5%] w-8 h-14 opacity-30" />
        <Lime className="floating-decor absolute top-[30%] right-[8%] w-10 h-10 opacity-30" />
        <Margarita className="floating-decor absolute bottom-[20%] left-[80%] w-10 h-14 opacity-25" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <ChiliPepper className="floating-decor absolute top-[15%] left-[3%] w-8 h-14 opacity-15" />
      <Lime className="floating-decor absolute bottom-[20%] right-[5%] w-10 h-10 opacity-20" />
      <Jalapeno className="floating-decor absolute top-[60%] right-[3%] w-6 h-10 opacity-15" />
    </div>
  );
}

export function DecorativeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#00a9e4]" />
      <ChiliPepper className="w-6 h-10" />
      <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#00a9e4]" />
    </div>
  );
}

export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-6 py-8 ${className}`}>
      <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#c1eaf9]" />
      <div className="flex items-center gap-3">
        <Jalapeno className="w-4 h-7 opacity-60" />
        <Lime className="w-6 h-6 opacity-80" />
        <Jalapeno className="w-4 h-7 opacity-60 scale-x-[-1]" />
      </div>
      <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#c1eaf9]" />
    </div>
  );
}
