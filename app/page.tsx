"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { ImageGallery } from "@/components/image-gallery";
import { FloatingDecorations, SectionDivider, DecorativeDivider, ChiliPepper, Lime, Cactus, Margarita } from "@/components/mexican-decorations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DISH_NAMES = [
  "Tacos al Pastor", "Enchiladas Rojas", "Fresh Guacamole", "Sizzling Fajitas",
  "Cheese Quesadillas", "Tamales", "Chiles Rellenos", "Carne Asada",
  "Carnitas Plate", "Birria Tacos", "Pozole Rojo", "Crispy Tostadas",
  "Loaded Nachos", "Burritos", "Sopes", "Tlayudas",
  "Crispy Flautas", "Mole Enchiladas", "Mexican Rice & Beans", "Fresh Salsa Verde",
  "Handmade Tortillas",
];

const DRINK_NAMES = ["Classic Margarita", "Horchata", "Michelada"];

const galleryImages = [
  ...DISH_NAMES.map((name, i) => ({
    src: `/images/dishes_${String(i + 1).padStart(2, "0")}.jpg`,
    thumb: `/images/thumb_dishes_${String(i + 1).padStart(2, "0")}.jpg`,
    alt: name,
    category: "food",
  })),
  ...DRINK_NAMES.map((name, i) => ({
    src: `/images/drinks_${String(i + 1).padStart(2, "0")}.jpg`,
    thumb: `/images/thumb_drinks_${String(i + 1).padStart(2, "0")}.jpg`,
    alt: name,
    category: "drinks",
  })),
];

export default function HomePage() {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate welcome section
    if (welcomeRef.current) {
      const elements = welcomeRef.current.querySelectorAll(".animate-item");
      gsap.set(elements, { opacity: 0, y: 50 });
      
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: welcomeRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate menu section with scale and rotation
    if (menuRef.current) {
      const image = menuRef.current.querySelector(".menu-image");
      const content = menuRef.current.querySelector(".menu-content");
      const decorLeft = menuRef.current.querySelector(".decor-left");
      const decorRight = menuRef.current.querySelector(".decor-right");

      gsap.set(image, { opacity: 0, x: -80, scale: 0.9 });
      gsap.set(content, { opacity: 0, x: 80 });
      gsap.set([decorLeft, decorRight], { opacity: 0, scale: 0, rotation: -180 });

      ScrollTrigger.create({
        trigger: menuRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(image, { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" });
          gsap.to(content, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
          gsap.to([decorLeft, decorRight], { 
            opacity: 1, 
            scale: 1, 
            rotation: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: "back.out(1.7)",
            delay: 0.5 
          });
        },
      });
    }

    // Animate info cards
    if (infoRef.current) {
      const cards = infoRef.current.querySelectorAll(".info-card");
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.9 });
      
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate CTA section with bounce
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 60, scale: 0.95 });
      
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        showLogo
        ctaButtons={[
          { label: "View Menu", href: "/menu", variant: "primary" },
          { label: "Order Online", href: "https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/v3", variant: "outline", external: true },
        ]}
      />

      {/* Welcome Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <FloatingDecorations variant="section" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div ref={welcomeRef} className="max-w-4xl mx-auto text-center">
            <span className="animate-item text-[#00a9e4] text-sm uppercase tracking-[0.2em] font-medium">
              Welcome to
            </span>
            
            <DecorativeDivider className="animate-item my-6" />
            
            <h2 className="animate-item font-[family-name:var(--font-dancing)] text-4xl md:text-5xl lg:text-6xl text-[#121212] mb-8 [text-shadow:-3px_3px_0px_#00a9e4]">
              {"Maria's Mexican Grill"}
            </h2>
            
            <p className="animate-item text-lg md:text-xl text-[#121212]/70 leading-relaxed">
              Welcome to {"Maria's Mexican Grill"}, located on {"John's Island"}, South Carolina, where bold 
              flavors and fresh ingredients come together to create an unforgettable dining experience. 
              At {"Maria's"}, we bring a fresh twist to traditional Mexican cuisine, delivering the authentic 
              south-of-the-border taste you crave in every bite.
            </p>
            
            <p className="animate-item text-lg md:text-xl text-[#121212]/70 leading-relaxed mt-6">
              Whether {"you're"} stopping in for a satisfying meal or a refreshing drink, our menu has 
              something for everyone. From savory favorites to flavorful beverages, {"Maria's Mexican Grill"} 
              is the perfect place to relax, enjoy great food, and feel right at home.
            </p>

            <SectionDivider className="animate-item mt-12" />
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section ref={menuRef} className="py-24 md:py-32 bg-[#dbf2fa] overflow-hidden relative">
        {/* Decorative elements */}
        <Cactus className="decor-left absolute top-20 left-8 w-16 h-28 opacity-15 hidden lg:block" />
        <Margarita className="decor-right absolute bottom-20 right-8 w-14 h-20 opacity-15 hidden lg:block" />
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="menu-image relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/images/dishes_18.jpg"
                  alt="Restaurant Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/30 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#00a9e4]/10 rounded-2xl -z-10" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#dbf2fa] rounded-2xl -z-10" />
              <ChiliPepper className="absolute -top-4 right-8 w-10 h-16 opacity-40" />
            </div>

            {/* Content */}
            <div className="menu-content">
              <span className="text-[#00a9e4] text-sm uppercase tracking-[0.2em] font-medium">
                Discover
              </span>
              
              <DecorativeDivider className="my-4 justify-start [&>div:first-child]:ml-0" />
              
              <h2 className="font-[family-name:var(--font-dancing)] text-4xl md:text-5xl lg:text-6xl text-[#121212] mb-8 [text-shadow:-3px_3px_0px_#00a9e4]">
                Our Menu
              </h2>
              
              <p className="text-lg text-[#121212]/70 leading-relaxed mb-6">
                {"Maria's Mexican Grill"} menu is a celebration of authentic flavors inspired by the rich 
                culinary traditions of the Jalisco region of Mexico. Each dish is thoughtfully prepared 
                by skilled craftsmen who are passionate about creating unforgettable flavors that honor 
                time-honored recipes.
              </p>
              
              <p className="text-lg text-[#121212]/70 leading-relaxed mb-10">
                By blending tradition with a fresh approach, the menu offers an experience that captures 
                the true essence of Mexican cuisine. Every bite reflects a commitment to quality and 
                authenticity, delivering a dining experience worthy of the masters.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/menu"
                  className="btn-animated inline-flex items-center gap-2 px-8 py-4 bg-[#00a9e4] text-white rounded-[5px] font-semibold text-sm uppercase tracking-wide shadow-lg shadow-[#00a9e4]/30"
                >
                  View Full Menu
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/happy-hour"
                  className="btn-animated inline-flex items-center gap-2 px-8 py-4 border-2 border-[#00a9e4] text-[#00a9e4] hover:bg-[#00a9e4] hover:text-white rounded-[5px] font-semibold text-sm uppercase tracking-wide transition-colors duration-300"
                >
                  Happy Hour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Dishes"
            title="A Taste of Jalisco"
            description="Fresh ingredients, bold flavors, and traditional recipes crafted with passion."
          />

          <ImageGallery images={galleryImages} variant="masonry" className="max-w-7xl mx-auto" />
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-20 bg-[#121212] text-white relative overflow-hidden">
        <FloatingDecorations variant="footer" />
        
        <div ref={infoRef} className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {/* Location */}
            <div className="info-card flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00a9e4]/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-20 h-20 rounded-[5px] bg-[#00a9e4]/20 flex items-center justify-center mb-6 pulse-glow">
                <MapPin className="w-10 h-10 text-[#00a9e4]" />
              </div>
              <h3 className="font-[family-name:var(--font-dancing)] text-2xl mb-3">Location</h3>
              <p className="text-white/70">2817 Suite 6 Maybank Hwy</p>
              <p className="text-white/70">Johns Island, SC 29455</p>
            </div>

            {/* Hours */}
            <div className="info-card flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00a9e4]/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-20 h-20 rounded-[5px] bg-[#00a9e4]/20 flex items-center justify-center mb-6 pulse-glow">
                <Clock className="w-10 h-10 text-[#00a9e4]" />
              </div>
              <h3 className="font-[family-name:var(--font-dancing)] text-2xl mb-3">Hours</h3>
              <p className="text-white/70">Mon-Thu: 11AM - 9PM</p>
              <p className="text-white/70">Fri-Sat: 11AM - 10PM</p>
              <p className="text-white/70">Sun: 12PM - 9PM</p>
            </div>

            {/* Contact */}
            <div className="info-card flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00a9e4]/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-20 h-20 rounded-[5px] bg-[#00a9e4]/20 flex items-center justify-center mb-6 pulse-glow">
                <Phone className="w-10 h-10 text-[#00a9e4]" />
              </div>
              <h3 className="font-[family-name:var(--font-dancing)] text-2xl mb-3">Contact</h3>
              <a href="tel:+18435571005" className="text-[#00a9e4] hover:text-[#c1eaf9] transition-colors text-lg">
                (843) 557-1005
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#c1eaf9] relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-[10%]"><Lime className="w-12 h-12" /></div>
          <div className="absolute bottom-10 right-[15%]"><ChiliPepper className="w-8 h-14" /></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={ctaRef}
            className="max-w-4xl mx-auto text-center bg-white rounded-3xl shadow-2xl p-10 md:p-16 relative overflow-hidden"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#00a9e4]/10 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#00a9e4]/10 rounded-tl-full" />
            
            <h2 className="font-semibold text-4xl md:text-5xl text-[#121212] mb-6">
              Ready to Experience Authentic Mexican Flavors?
            </h2>
            <p className="text-lg text-[#121212]/70 mb-10 max-w-2xl mx-auto">
              Order online for pickup or delivery, or join us for a memorable dining experience at {"Maria's Mexican Grill"}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/v3"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animated inline-flex items-center gap-2 px-10 py-5 bg-[#00a9e4] text-white rounded-[5px] font-semibold text-sm uppercase tracking-wide shadow-xl shadow-[#00a9e4]/30"
              >
                Order Online
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/location"
                className="btn-animated inline-flex items-center gap-2 px-10 py-5 bg-[#121212] text-white rounded-[5px] font-semibold text-sm uppercase tracking-wide shadow-xl shadow-[#121212]/30"
              >
                Get Directions
                <MapPin className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
