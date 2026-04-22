"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/happy-hour", label: "Happy Hour" },
  {
    href: "https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/v3",
    label: "Online Order",
    external: true,
  },
  {
    href: "https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/giftcards?utmCampaign=onlineOrdering",
    label: "Gift Cards",
    external: true,
  },
  {
    href: "https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/rewardsSignup",
    label: "Rewards",
    external: true,
  },
  { href: "/location", label: "Location" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Animate header on mount
  useEffect(() => {
    if (headerRef.current && navItemsRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      const navLinks = navItemsRef.current.querySelectorAll("a");
      gsap.fromTo(
        navLinks,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[#121212] shadow-xl py-2"
          : "bg-[#121212] backdrop-blur-sm py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="relative w-[180px] h-[60px] md:w-[220px] md:h-[70px] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Maria's Mexican Grill"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div ref={navItemsRef} className="hidden lg:flex items-center gap-6">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link flex items-center gap-1 text-sm font-medium tracking-wide uppercase text-white hover:text-[#00a9e4] transition-all duration-300 relative group"
                >
                  {item.label}
                  <ExternalLink className="w-3 h-3" />
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00a9e4] transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link text-sm font-medium tracking-wide uppercase transition-all duration-300 relative group",
                    pathname === item.href
                      ? "text-[#00a9e4]"
                      : "text-white hover:text-[#00a9e4]"
                  )}
                >
                  {item.label}
                  <span 
                    className={cn(
                      "absolute bottom-0 left-0 h-[2px] bg-[#00a9e4] transition-all duration-300",
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    )} 
                  />
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#00a9e4] transition-colors duration-300"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500 ease-in-out",
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-6 flex flex-col gap-4 bg-[#121212] border-t border-[#00a9e4]/20 mt-4 px-2">
            {navItems.map((item, index) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-[#00a9e4] text-lg font-medium tracking-wide transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium tracking-wide transition-all duration-300 py-2 px-4 rounded-lg",
                    pathname === item.href
                      ? "text-[#00a9e4] bg-[#00a9e4]/10"
                      : "text-white hover:text-[#00a9e4] hover:bg-white/5"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
