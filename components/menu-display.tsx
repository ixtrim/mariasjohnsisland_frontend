"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { MenuSection, MenuCategory, MenuItem } from "@/lib/menu-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MenuDisplayProps {
  sections: MenuSection[];
  className?: string;
}

export function MenuDisplay({ sections, className }: MenuDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const categories = containerRef.current.querySelectorAll(".menu-category");
    
    categories.forEach((category) => {
      gsap.set(category, { opacity: 0, y: 30 });
      
      gsap.to(category, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: category,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className={cn("space-y-16", className)}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-12">
          {/* Section Title */}
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark">
              {section.title}
            </h2>
            <div className="decorative-divider my-4">
              <span className="text-xl text-primary">&#10022;</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {section.categories.map((category, categoryIndex) => (
              <MenuCategory
                key={categoryIndex}
                category={category}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MenuCategory({ category }: { category: MenuCategory }) {
  const hasDescriptions = category.items.some(item => item.description);
  
  return (
    <div className="menu-category">
      {/* Category Header */}
      <div className="mb-6 pb-4 border-b-2 border-primary/20">
        <h3 className="font-serif text-2xl font-bold text-dark">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-dark/60 mt-1 italic">{category.description}</p>
        )}
      </div>

      {/* Items */}
      {hasDescriptions ? (
        <div className="space-y-6">
          {category.items.map((item, index) => (
            <MenuItemDetailed key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {category.items.map((item, index) => (
            <MenuItemSimple key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuItemDetailed({ item }: { item: MenuItem }) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-serif text-lg font-semibold text-dark group-hover:text-primary transition-colors">
          {item.name}
        </h4>
        {item.price ? (
          <span className="text-primary font-semibold whitespace-nowrap">
            {item.price}
          </span>
        ) : item.prices ? (
          <div className="flex gap-4">
            {item.prices.map((p, i) => (
              <span key={i} className="text-dark/70 whitespace-nowrap">
                <span className="text-sm">{p.size}</span>{" "}
                <span className="text-primary font-semibold">{p.price}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {item.description && (
        <p className="mt-1 text-dark/60 text-sm leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  );
}

function MenuItemSimple({ item }: { item: MenuItem }) {
  return (
    <div className="py-2 px-3 bg-light-blue/30 rounded-lg hover:bg-light-blue/50 transition-colors">
      <span className="text-dark font-medium">{item.name}</span>
      {item.price && (
        <span className="text-primary font-semibold ml-2">{item.price}</span>
      )}
    </div>
  );
}

// Compact menu for drinks/tequila section
interface CompactMenuProps {
  sections: MenuSection[];
  variant?: "drinks" | "tequila";
  className?: string;
}

export function CompactMenu({ sections, variant = "drinks", className }: CompactMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const categories = containerRef.current.querySelectorAll(".compact-category");
    
    categories.forEach((category, index) => {
      gsap.set(category, { opacity: 0, y: 20 });
      
      gsap.to(category, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: category,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  const bgColor = variant === "drinks" ? "bg-light-blue/20" : "bg-lighter-blue/30";

  return (
    <div ref={containerRef} className={cn("space-y-8", className)}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={cn(
                "compact-category p-6 rounded-xl mb-4",
                bgColor
              )}
            >
              <h4 className="font-serif text-xl font-bold text-dark mb-1">
                {category.name}
              </h4>
              {category.description && (
                <p className="text-sm text-primary font-medium mb-4">
                  {category.description}
                </p>
              )}
              
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-dark">{item.name}</span>
                      {item.price && (
                        <>
                          <span className="flex-1 border-b border-dotted border-dark/20 min-w-[20px]" />
                          <span className="text-primary font-semibold">{item.price}</span>
                        </>
                      )}
                      {item.prices && (
                        <span className="text-sm text-dark/70 ml-auto">
                          {item.prices.map((p, i) => (
                            <span key={i}>
                              {p.size}: <span className="text-primary font-semibold">{p.price}</span>
                              {i < item.prices!.length - 1 && " | "}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-dark/60 mt-1">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
