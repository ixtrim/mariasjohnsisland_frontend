"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingDecorations, ChiliPepper, Lime } from "./mexican-decorations";
import type { GlobalOptionsFields } from "@/lib/cms";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Defaults (fallback when CMS has no data yet) ────────────────────────────

const DEFAULT_TAGLINE  = "Authentic Jalisco flavors,\ncrafted fresh every day.";
const DEFAULT_ADDRESS  = ["2817 Suite 6 Maybank Hwy", "Johns Island, SC 29455"];
const DEFAULT_PHONE    = "(843) 557-1005";
const DEFAULT_HOURS    = [
  { day: "Sunday",    hours: "12:00 PM - 9:00 PM"  },
  { day: "Mon - Thu", hours: "11:00 AM - 9:00 PM"  },
  { day: "Fri - Sat", hours: "11:00 AM - 10:00 PM" },
];
const DEFAULT_ORDER_URL      = "https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/v3";
const DEFAULT_GIFT_CARDS_URL = "https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/giftcards";
const DEFAULT_REWARDS_URL    = "https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/rewardsSignup";

// ─────────────────────────────────────────────────────────────────────────────

interface FooterProps {
  options?: GlobalOptionsFields;
}

export function Footer({ options = {} }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  // ── Resolve CMS values with defaults ──────────────────────────────────────
  const tagline     = options.footer_tagline  || DEFAULT_TAGLINE;
  const addressLine1= options.footer_address_1 || DEFAULT_ADDRESS[0];
  const addressLine2= options.footer_address_2 || DEFAULT_ADDRESS[1];
  const phone       = options.footer_phone    || DEFAULT_PHONE;
  const hours       = options.footer_hours?.length ? options.footer_hours : DEFAULT_HOURS;
  const orderUrl    = options.order_online_url || DEFAULT_ORDER_URL;
  const giftUrl     = options.gift_cards_url  || DEFAULT_GIFT_CARDS_URL;
  const rewardsUrl  = options.rewards_url     || DEFAULT_REWARDS_URL;
  const phoneHref   = `tel:+1${phone.replace(/\D/g, "")}`;

  useEffect(() => {
    if (!footerRef.current) return;
    const elements = footerRef.current.querySelectorAll(".footer-animate");
    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#121212] text-white relative overflow-hidden">
      <FloatingDecorations variant="footer" />

      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-[#121212] via-[#00a9e4] to-[#121212]" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo & Tagline */}
          <div className="footer-animate text-center md:text-left">
            <Link href="/" className="inline-block group">
              <div className="relative w-[180px] h-[60px] transition-transform duration-300 group-hover:scale-105 mx-auto md:mx-0">
                <Image src="/images/logo.png" alt="Maria's Mexican Grill" fill className="object-contain" />
              </div>
            </Link>
            <p className="mt-6 text-white/70 text-sm leading-relaxed font-[family-name:var(--font-dancing)] text-xl">
              {tagline.split("\n").map((line, i) => (
                <span key={i}>{line}{i < tagline.split("\n").length - 1 && <br />}</span>
              ))}
            </p>
            <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
              <ChiliPepper className="w-6 h-10 opacity-60" />
              <Lime className="w-8 h-8 opacity-60" />
              <ChiliPepper className="w-6 h-10 opacity-60 scale-x-[-1]" />
            </div>
          </div>

          {/* Hours */}
          <div className="footer-animate">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#00a9e4]" />
              Hours
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              {hours.map((row, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-white/10">
                  <span>{row.day}</span>
                  <span className="text-[#c1eaf9]">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="footer-animate">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#00a9e4]" />
              Location
            </h3>
            <address className="not-italic text-sm text-white/80 space-y-3">
              <p className="hover:text-white transition-colors">{addressLine1}</p>
              <p className="hover:text-white transition-colors">{addressLine2}</p>
              <a
                href={phoneHref}
                className="flex items-center gap-2 text-[#00a9e4] hover:text-[#c1eaf9] transition-colors mt-4 group"
              >
                <Phone className="w-4 h-4 group-hover:animate-pulse" />
                {phone}
              </a>
            </address>
          </div>

          {/* Order Online */}
          <div className="footer-animate text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Ready to Order?</h3>
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-flex items-center gap-2 bg-[#00a9e4] hover:bg-[#00a9e4]/90 text-white px-8 py-4 rounded-[5px] font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-lg shadow-[#00a9e4]/30"
            >
              Order Online
              <ExternalLink className="w-4 h-4" />
            </a>
            <div className="mt-6 flex gap-6 justify-center md:justify-start">
              <a
                href={giftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-[#00a9e4] transition-colors relative group"
              >
                Gift Cards
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00a9e4] transition-all duration-300 group-hover:w-full" />
              </a>
              <a
                href={rewardsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-[#00a9e4] transition-colors relative group"
              >
                Rewards
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00a9e4] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-animate mt-16 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} {"Maria's Mexican Grill"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
