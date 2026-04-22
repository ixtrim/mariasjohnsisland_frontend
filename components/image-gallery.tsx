"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lightbox } from "./lightbox";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  variant?: "slider" | "grid" | "masonry";
  className?: string;
}

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

  // Scroll animation for grid/masonry
  useEffect(() => {
    if (variant === "slider" || !containerRef.current) return;

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
                  src={image.src}
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

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
          >
            <ChevronLeft className="w-5 h-5 text-dark" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            disabled={currentSlide === images.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
          >
            <ChevronRight className="w-5 h-5 text-dark" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
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
                src={image.src}
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
      <div
        ref={containerRef}
        className={cn(
          "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4",
          className
        )}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item break-inside-avoid relative rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300 + (index % 3) * 100}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
