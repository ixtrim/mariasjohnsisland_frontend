"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lightbox } from "./lightbox";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GalleryImage {
  src: string;
  alt: string;
  thumb?: string;
  category?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  variant?: "slider" | "grid" | "masonry";
  className?: string;
}

const ASPECT_PATTERN = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[2/3]",
  "aspect-[5/4]",
  "aspect-square",
];

export function ImageGallery({
  images,
  variant = "slider",
  className,
}: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayImages, setDisplayImages] = useState<GalleryImage[]>(images);
  const hasEnteredView = useRef(false);
  const prevDisplayRef = useRef<GalleryImage[]>(images);

  // Slider navigation
  const goToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const newIndex = Math.max(0, Math.min(index, images.length - 1));
    setCurrentSlide(newIndex);
    gsap.to(sliderRef.current, {
      x: `-${newIndex * 100}%`,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(images.map((img) => img.category).filter(Boolean) as string[])
    );
    return cats.length > 0 ? ["all", ...cats] : [];
  }, [images]);

  // Animate masonry items in
  const animateIn = useCallback(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".gallery-item");
    if (items.length === 0) return;
    gsap.set(items, { opacity: 0, y: 50, scale: 0.88 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.65,
      stagger: { each: 0.055, ease: "power2.out" },
      ease: "back.out(1.3)",
    });
  }, []);

  // Scroll trigger — initial masonry reveal
  useEffect(() => {
    if (variant !== "masonry" || !containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".gallery-item");
    gsap.set(items, { opacity: 0, y: 50, scale: 0.88 });

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 82%",
      once: true,
      onEnter: () => {
        hasEnteredView.current = true;
        animateIn();
      },
    });

    return () => st.kill();
  }, [variant, animateIn]);

  // Animate in after filter updates displayImages
  useEffect(() => {
    if (prevDisplayRef.current === displayImages) return;
    prevDisplayRef.current = displayImages;
    if (!hasEnteredView.current) return;
    requestAnimationFrame(() => animateIn());
  }, [displayImages, animateIn]);

  // Filter handler with GSAP transition
  const handleFilter = useCallback(
    (cat: string) => {
      if (cat === activeFilter) return;
      const filtered =
        cat === "all" ? images : images.filter((img) => img.category === cat);
      const items = containerRef.current?.querySelectorAll(".gallery-item");

      if (items && items.length > 0 && hasEnteredView.current) {
        gsap.to(Array.from(items), {
          opacity: 0,
          scale: 0.9,
          y: -15,
          duration: 0.2,
          stagger: 0.015,
          ease: "power2.in",
          onComplete: () => {
            setActiveFilter(cat);
            setDisplayImages(filtered);
          },
        });
      } else {
        setActiveFilter(cat);
        setDisplayImages(filtered);
      }
    },
    [activeFilter, images]
  );

  // Auto-advance slider
  useEffect(() => {
    if (variant !== "slider") return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev === images.length - 1 ? 0 : prev + 1;
        if (sliderRef.current) {
          gsap.to(sliderRef.current, {
            x: `-${next * 100}%`,
            duration: 0.6,
            ease: "power3.out",
          });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [variant, images.length]);

  // Scroll animation for grid
  useEffect(() => {
    if (variant !== "grid" || !containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".gallery-item");
    gsap.set(items, { opacity: 0, y: 50, scale: 0.95 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, [variant]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  if (variant === "slider") {
    return (
      <>
        <div
          ref={containerRef}
          className={cn("relative overflow-hidden rounded-lg", className)}
        >
          <div ref={sliderRef} className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full relative aspect-[16/9] cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.thumb || image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-[5px] shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
          >
            <ChevronLeft className="w-5 h-5 text-dark" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            disabled={currentSlide === images.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-[5px] shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
          >
            <ChevronRight className="w-5 h-5 text-dark" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                className={cn(
                  "w-2 h-2 rounded-[5px] transition-all",
                  index === currentSlide
                    ? "bg-primary w-6"
                    : "bg-white/70 hover:bg-white"
                )}
              />
            ))}
          </div>
        </div>

        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      </>
    );
  }

  if (variant === "grid") {
    return (
      <>
        <div
          ref={containerRef}
          className={cn(
            "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
            className
          )}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.thumb || image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-50" />
              </div>
            </div>
          ))}
        </div>

        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      </>
    );
  }

  // Masonry layout
  return (
    <>
      {/* Filter tabs */}
      {categories.length > 1 && (
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={cn(
                "px-6 py-2.5 rounded-[5px] text-sm font-semibold uppercase tracking-widest transition-all duration-300",
                activeFilter === cat
                  ? "bg-[#00a9e4] text-white shadow-lg shadow-[#00a9e4]/30 scale-105"
                  : "bg-white text-[#121212]/60 hover:text-[#121212] border border-[#121212]/10 hover:border-[#00a9e4]/50 hover:scale-105"
              )}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Masonry columns */}
      <div
        ref={containerRef}
        className={cn("columns-2 md:columns-3 lg:columns-4 gap-3", className)}
      >
        {displayImages.map((image, index) => (
          <div
            key={image.src}
            className="gallery-item break-inside-avoid mb-3 relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
            onClick={() => openLightbox(index)}
          >
            <div
              className={cn(
                "relative w-full",
                ASPECT_PATTERN[index % ASPECT_PATTERN.length]
              )}
            >
              <Image
                src={image.thumb || image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#121212]/0 group-hover:bg-[#121212]/45 transition-colors duration-300 flex flex-col items-center justify-center gap-2">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                  <ZoomIn className="w-9 h-9 text-white drop-shadow-lg" />
                </div>
                <p className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 text-white text-xs font-medium tracking-wide text-center px-2 line-clamp-1">
                  {image.alt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        images={displayImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
