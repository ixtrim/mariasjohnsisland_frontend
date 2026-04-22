"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { createPortal } from "react-dom";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function LightboxContent({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setIsAnimating(true);

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          onNavigate(newIndex);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    }
  }, [currentIndex, images.length, onNavigate, isAnimating]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setIsAnimating(true);

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          onNavigate(newIndex);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    }
  }, [currentIndex, images.length, onNavigate, isAnimating]);

  const handleClose = useCallback(() => {
    if (overlayRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose, handlePrevious, handleNext]);

  useEffect(() => {
    if (isOpen && isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentIndex, isAnimating]);

  useEffect(() => {
    if (!isOpen) return;

    if (overlayRef.current && contentRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)", delay: 0.1 }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#1c0301]/97 backdrop-blur-md flex items-center justify-center"
      style={{ zIndex: 99999 }}
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 p-4 bg-[#00a9e4]/20 hover:bg-[#00a9e4] rounded-full text-white transition-all duration-300 hover:scale-110 hover:rotate-90 group"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 transition-transform group-hover:scale-110" />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-[#00a9e4] hover:bg-[#00a9e4]/80 rounded-full text-white transition-all duration-300 hover:scale-110 hover:-translate-x-1 shadow-lg shadow-[#00a9e4]/30"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-[#00a9e4] hover:bg-[#00a9e4]/80 rounded-full text-white transition-all duration-300 hover:scale-110 hover:translate-x-1 shadow-lg shadow-[#00a9e4]/30"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image container */}
      <div
        ref={contentRef}
        className="flex items-center justify-center w-full h-full p-8 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          ref={imageRef}
          className="relative w-full h-full max-w-6xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain bg-[#1c0301]"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
          />
        </div>
      </div>

      {/* Image info */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white/80 text-lg font-medium">{currentImage.alt}</p>
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#00a9e4] rounded-full text-white font-medium shadow-lg shadow-[#00a9e4]/30">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && images.length <= 10 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl max-w-[90vw] overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                if (!isAnimating && index !== currentIndex) {
                  setIsAnimating(true);
                  if (imageRef.current) {
                    const direction = index > currentIndex ? -50 : 50;
                    gsap.to(imageRef.current, {
                      opacity: 0,
                      x: direction,
                      duration: 0.2,
                      ease: "power2.in",
                      onComplete: () => {
                        onNavigate(index);
                        gsap.fromTo(
                          imageRef.current,
                          { opacity: 0, x: -direction },
                          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
                        );
                      },
                    });
                  }
                }
              }}
              className={cn(
                "relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300",
                index === currentIndex
                  ? "ring-3 ring-[#00a9e4] scale-110 shadow-lg shadow-[#00a9e4]/50"
                  : "opacity-50 hover:opacity-100 hover:scale-105"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Lightbox(props: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !props.isOpen) return null;

  return createPortal(
    <LightboxContent {...props} />,
    document.body
  );
}

// Hook to manage lightbox state
export function useLightbox(images: { src: string; alt: string }[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navigate = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    isOpen,
    currentIndex,
    open,
    close,
    navigate,
    LightboxComponent: () => (
      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={close}
        onNavigate={navigate}
      />
    ),
  };
}
