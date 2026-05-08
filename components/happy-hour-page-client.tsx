"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Wine, Beer, Martini } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { CompactMenu } from "@/components/menu-display";
import { ImageGallery } from "@/components/image-gallery";
import type { MenuSection } from "@/lib/menu-data";
import type { HappyHourSpecial } from "@/lib/google-sheets";
import type { HappyHourFields } from "@/lib/cms";
import { heroImageUrl, toGalleryImages } from "@/lib/cms";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, LucideIcon> = { Martini, Wine, Beer };

const DEFAULT_DRINK_IMAGES = [
  { src: "/images/drinks_01.jpg", alt: "Cerveza"               },
  { src: "/images/drinks_02.jpg", alt: "Craft Cerveza"         },
  { src: "/images/drinks_03.jpg", alt: "Classic Lime Margarita"},
];

interface HappyHourPageClientProps {
  drinksMenu:         MenuSection;
  happyHourSpecials:  HappyHourSpecial[];
  cms:                HappyHourFields;
}

export default function HappyHourPageClient({
  drinksMenu,
  happyHourSpecials,
  cms,
}: HappyHourPageClientProps) {
  const specialsRef = useRef<HTMLDivElement>(null);
  const timeRef     = useRef<HTMLDivElement>(null);

  // ── Resolve CMS values with fallbacks ──────────────────────────────────────
  const heroBg      = heroImageUrl(cms.hero_background_image, "/images/thumb_drinks_03.jpg");
  const heroTitle   = cms.hero_title    || "Happy Hour";
  const heroSub     = cms.hero_subtitle || "Everyday 4-7PM";
  const heroSlogan  = cms.hero_slogan   || "Unwind with unbeatable drink specials";
  const hhDays      = cms.happy_hour_days    || "Everyday";
  const hhStart     = cms.happy_hour_start   || "4";
  const hhEnd       = cms.happy_hour_end     || "7";
  const hhTagline   = cms.happy_hour_tagline || "Join us for the best happy hour on Johns Island";
  const drinkImages = toGalleryImages(cms.drink_gallery, DEFAULT_DRINK_IMAGES);

  useEffect(() => {
    if (timeRef.current) {
      gsap.set(timeRef.current, { opacity: 0, scale: 0.9 });
      gsap.to(timeRef.current, {
        opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)",
        scrollTrigger: { trigger: timeRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }
    if (specialsRef.current) {
      const cards = specialsRef.current.querySelectorAll(".special-card");
      gsap.set(cards, { opacity: 0, y: 40 });
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: specialsRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }
  }, []);

  return (
    <>
      <HeroSection
        title={heroTitle}
        subtitle={heroSub}
        slogan={heroSlogan}
        backgroundImage={heroBg}
        height="large"
        showScrollIndicator={false}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Time card */}
          <div ref={timeRef} className="max-w-xl mx-auto text-center mb-16">
            <div className="bg-primary rounded-2xl p-8 shadow-2xl shadow-primary/20">
              <div className="w-20 h-20 rounded-[5px] bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{hhDays}</h2>
              <p className="text-5xl md:text-6xl font-bold text-white mb-2">{hhStart} - {hhEnd} PM</p>
              <p className="text-white/80 text-lg">{hhTagline}</p>
            </div>
          </div>

          {/* Specials grid */}
          <div ref={specialsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {happyHourSpecials.map((special, index) => {
              const Icon = iconMap[special.icon] ?? Martini;
              return (
                <div key={index} className="special-card bg-light-blue rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-[5px] bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-dark mb-2">{special.title}</h3>
                  <span className="inline-block bg-primary text-white text-sm font-bold px-4 py-1 rounded-[5px]">
                    {special.discount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-lighter-blue">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark text-center mb-8">
            Our Signature Drinks
          </h2>
          <ImageGallery images={drinkImages} variant="slider" className="max-w-4xl mx-auto" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">Full Selection</span>
            <div className="decorative-divider my-4"><span className="text-xl text-primary">&#10022;</span></div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark">Drinks Menu</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <CompactMenu sections={[drinksMenu]} variant="drinks" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{"Don't Miss Happy Hour!"}</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join us every day from {hhStart} to {hhEnd} PM for amazing drink specials. Bring your friends and unwind with us.
          </p>
          <a href="/location" className="inline-flex px-8 py-4 bg-primary hover:bg-blue/90 text-white rounded-[5px] font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105">
            Get Directions
          </a>
        </div>
      </section>
    </>
  );
}
