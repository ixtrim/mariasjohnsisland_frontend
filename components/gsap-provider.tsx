"use client";

import { useEffect, useRef, RefObject, createContext, useContext, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP Context Provider
const GSAPContext = createContext<boolean>(false);

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize GSAP defaults
    gsap.defaults({
      ease: "power3.out",
      duration: 0.8,
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Initialize all reveal animations
    const revealElements = document.querySelectorAll(".reveal-section, .gsap-fade-in, .gsap-fade-in-left, .gsap-fade-in-right, .gsap-scale-in, .gsap-rotate-in");
    
    revealElements.forEach((element) => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // Stagger children animations
    const staggerContainers = document.querySelectorAll(".stagger-children");
    staggerContainers.forEach((container) => {
      const children = container.children;
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <GSAPContext.Provider value={true}>
      {children}
    </GSAPContext.Provider>
  );
}

export function useGSAP() {
  return useContext(GSAPContext);
}

// Hook for fade-in animations on scroll
export function useScrollFadeIn<T extends HTMLElement>(
  options: {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const {
      y = 60,
      x = 0,
      duration = 1,
      delay = 0,
      stagger = 0.12,
      start = "top 85%",
    } = options;

    const children = element.querySelectorAll(".gsap-child");
    const targets = children.length > 0 ? children : element;

    gsap.set(targets, { opacity: 0, y, x });

    const animation = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: children.length > 0 ? stagger : 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
    };
  }, [options]);

  return ref;
}

// Hook for parallax effect
export function useParallax<T extends HTMLElement>(
  speed: number = 0.5
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const animation = gsap.to(element, {
      yPercent: -30 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return ref;
}

// Hook for staggered reveal with more options
export function useStaggerReveal<T extends HTMLElement>(
  selector: string,
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
    start?: string;
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { 
      duration = 0.8, 
      stagger = 0.15, 
      y = 40, 
      x = 0, 
      scale = 1,
      rotation = 0,
      start = "top 80%"
    } = options;
    const children = element.querySelectorAll(selector);

    if (children.length === 0) return;

    gsap.set(children, { 
      opacity: 0, 
      y, 
      x,
      scale: scale !== 1 ? 0.9 : 1,
      rotation
    });

    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
    };
  }, [selector, options]);

  return ref;
}

// Hook for text reveal animation
export function useTextReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.set(element, {
      clipPath: "inset(0 100% 0 0)",
      opacity: 1,
    });

    const animation = gsap.to(element, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return ref;
}

// Hook for scale animation on hover with more effects
export function useHoverAnimation<T extends HTMLElement>(
  options: {
    scale?: number;
    y?: number;
    rotation?: number;
    duration?: number;
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { scale = 1.05, y = -5, rotation = 0, duration = 0.3 } = options;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        y,
        rotation,
        duration,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [options]);

  return ref;
}

// Hook for magnetic button effect
export function useMagneticEffect<T extends HTMLElement>(
  strength: number = 0.3
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

// Hook for smooth section reveal
export function useSectionReveal<T extends HTMLElement>(
  options: {
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    delay?: number;
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { direction = "up", duration = 1, delay = 0 } = options;

    const directionValues = {
      up: { y: 80, x: 0 },
      down: { y: -80, x: 0 },
      left: { y: 0, x: 80 },
      right: { y: 0, x: -80 },
    };

    const { x, y } = directionValues[direction];

    gsap.set(element, { opacity: 0, y, x });

    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
    };
  }, [options]);

  return ref;
}

// Animated Counter Component
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const obj = { value: 0 };

    const animation = gsap.to(obj, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
      },
    });

    return () => {
      animation.kill();
    };
  }, [end, duration, suffix, prefix]);

  return <span ref={ref}>0</span>;
}

// Animated Button Component
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  external?: boolean;
}

export function AnimatedButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  external = false,
}: AnimatedButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(element.querySelector(".btn-bg"), {
        scale: 1.5,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(element.querySelector(".btn-bg"), {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(element, {
        scale: 0.98,
        duration: 0.1,
      });
    };

    const handleMouseUp = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.1,
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mouseup", handleMouseUp);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center px-8 py-4 font-medium rounded-lg transition-shadow";
  const variantStyles = {
    primary: "bg-[#00a9e4] text-white shadow-lg shadow-[#00a9e4]/30",
    secondary: "bg-[#1c0301] text-white shadow-lg shadow-[#1c0301]/30",
    outline: "border-2 border-[#00a9e4] text-[#00a9e4] hover:text-white",
  };

  const content = (
    <>
      <span className="btn-bg absolute inset-0 bg-white/20 rounded-full scale-0 origin-center" />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

// Image reveal animation component
interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

export function RevealImage({ src, alt, className = "", direction = "left" }: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;

    const clipPaths = {
      left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
      right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
      up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
      down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
    };

    gsap.set(container, { clipPath: clipPaths[direction].from });
    gsap.set(image, { scale: 1.3 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(container, {
      clipPath: clipPaths[direction].to,
      duration: 1.2,
      ease: "power4.inOut",
    }).to(
      image,
      {
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
      },
      "-=0.8"
    );

    return () => {
      tl.kill();
    };
  }, [direction]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// Split text animation component
interface SplitTextProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function SplitText({ children, className = "", tag: Tag = "span" }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const text = children;
    const chars = text.split("");

    element.innerHTML = chars
      .map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const charElements = element.querySelectorAll("span");

    gsap.set(charElements, { opacity: 0, y: 50 });

    gsap.to(charElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, [children]);

  return <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={className}>{children}</Tag>;
}
