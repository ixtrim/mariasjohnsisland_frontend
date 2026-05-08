"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/hero-section";
import { MenuDisplay, CompactMenu } from "@/components/menu-display";
import { ImageGallery } from "@/components/image-gallery";
import type { MenuSection } from "@/lib/menu-data";
import type { MenuPageFields } from "@/lib/cms";
import { heroImageUrl, toGalleryImages } from "@/lib/cms";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const menuTabs = [
  { id: "food",    label: "Food"     },
  { id: "drinks",  label: "Drinks"   },
  { id: "tequila", label: "Tequilas" },
];

const DEFAULT_FOOD_IMAGES = [
  { src: "/images/dishes_03.jpg", alt: "Tacos Al Pastor" },
  { src: "/images/dishes_09.jpg", alt: "Enchiladas"      },
  { src: "/images/dishes_15.jpg", alt: "Guacamole"       },
  { src: "/images/dishes_14.jpg", alt: "Fajitas"         },
];

const DEFAULT_INTRO_QUOTE =
  '"Maria\'s Mexican Grill menu is a celebration of authentic flavors inspired by the rich culinary traditions of the Jalisco region of Mexico. Each dish is thoughtfully prepared by skilled craftsmen who are passionate about creating unforgettable flavors that honor time-honored recipes. By blending tradition with a fresh approach, the menu offers an experience that captures the true essence of Mexican cuisine. Every bite reflects a commitment to quality and authenticity, delivering a dining experience worthy of the masters."';

interface MenuPageClientProps {
  foodMenu:   MenuSection;
  drinksMenu: MenuSection;
  tequilaMenu:MenuSection;
  cms:        MenuPageFields;
}

export default function MenuPageClient({
  foodMenu,
  drinksMenu,
  tequilaMenu,
  cms,
}: MenuPageClientProps) {
  const [activeTab, setActiveTab] = useState("food");
  const tabContentRef = useRef<HTMLDivElement>(null);
  const introRef      = useRef<HTMLDivElement>(null);

  // ── Resolve CMS values with fallbacks ──────────────────────────────────────
  const heroBg     = heroImageUrl(cms.hero_background_image, "/images/dishes_04.jpg");
  const heroTitle  = cms.hero_title    || "Our Menu";
  const heroSub    = cms.hero_subtitle || "Authentic Flavors";
  const heroSlogan = cms.hero_slogan   || "A celebration of Jalisco culinary traditions";
  const introQuote = cms.intro_quote ? `"${cms.intro_quote}"` : DEFAULT_INTRO_QUOTE;
  const foodImages = toGalleryImages(cms.food_gallery, DEFAULT_FOOD_IMAGES);

  useEffect(() => {
    if (introRef.current) {
      const elements = introRef.current.querySelectorAll(".animate-intro");
      gsap.set(elements, { opacity: 0, y: 30 });
      gsap.to(elements, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: introRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }
  }, []);

  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(tabContentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }
  }, [activeTab]);

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
          <div ref={introRef} className="max-w-4xl mx-auto text-center">
            <p className="animate-intro text-lg md:text-xl text-dark/70 leading-relaxed font-serif italic">
              {introQuote}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-light-blue">
        <div className="container mx-auto px-4">
          <ImageGallery images={foodImages} variant="slider" className="max-w-5xl mx-auto" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-light-blue rounded-[5px] p-1">
              {menuTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-3 rounded-[5px] font-semibold text-sm uppercase tracking-wide transition-all duration-300",
                    activeTab === tab.id ? "bg-primary text-white shadow-lg" : "text-dark hover:text-primary"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div ref={tabContentRef} className="max-w-4xl mx-auto">
            {activeTab === "food"    && <MenuDisplay sections={[foodMenu]} />}
            {activeTab === "drinks"  && <CompactMenu sections={[drinksMenu]} variant="drinks" />}
            {activeTab === "tequila" && <CompactMenu sections={[tequilaMenu]} variant="tequila" />}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Experience our authentic Jalisco flavors from the comfort of your home or join us for an unforgettable dining experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/v3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary hover:bg-blue/90 text-white rounded-[5px] font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105"
            >
              Order Online
            </a>
            <a href="/location" className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-dark rounded-[5px] font-semibold text-sm uppercase tracking-wide transition-all duration-300">
              Visit Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
