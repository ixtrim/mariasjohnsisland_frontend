"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Snazzy Maps style - Blue-tinted minimal style matching brand colors
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ weight: "2.00" }],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [{ color: "#c1eaf9" }],
  },
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#1c0301" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#dbf2fa" }],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#c1eaf9" }, { visibility: "on" }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ saturation: -100 }, { lightness: 45 }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#1c0301" }],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#00a9e4" }, { lightness: 60 }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#00a9e4" }, { visibility: "on" }],
  },
];

interface StyledMapProps {
  className?: string;
}

export function StyledMap({ className }: StyledMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Restaurant coordinates
  const lat = 32.7265;
  const lng = -80.0594;

  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { opacity: 0, y: 30 });
      
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        initMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      (window as typeof window & { initMap: () => void }).initMap = initMap;
      
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Custom marker
      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Maria's Mexican Grill",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#00a9e4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
      });

      // Info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: system-ui, sans-serif;">
            <h3 style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #1c0301;">Maria's Mexican Grill</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">2817 Suite 6 Maybank Hwy<br>Johns Island, SC 29455</p>
          </div>
        `,
      });

      new window.google.maps.Marker({
        position: { lat, lng },
        map,
      }).addListener("click", () => {
        infoWindow.open(map);
      });

      setMapLoaded(true);
    };

    // Only load if we have an API key, otherwise show static fallback
    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      loadGoogleMaps();
    } else {
      setMapLoaded(true);
    }
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Maria's+Mexican+Grill+2817+Maybank+Hwy+Johns+Island+SC`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=32.7265,-80.0594`;

  return (
    <div ref={containerRef} className={className}>
      {/* Map Container */}
      <div className="relative rounded-xl overflow-hidden shadow-xl">
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <div ref={mapRef} className="w-full h-[400px]" />
        ) : (
          // Static map fallback using iframe embed
          <div className="relative w-full h-[400px] bg-light-blue">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.8!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQzJzM1LjQiTiA4MMKwMDMnMzMuOCJX!5e0!3m2!1sen!2sus!4v1&style=feature:all|element:geometry.fill|weight:2.00&style=feature:landscape|element:all|color:0xdbf2fa&style=feature:water|element:all|color:0x00a9e4`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maria's Mexican Grill Location"
            />
            
            {/* Custom marker overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
              </div>
            </div>
          </div>
        )}

        {/* Map Overlay Info */}
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
            <h3 className="font-serif text-lg font-bold text-dark mb-2">
              {"Maria's Mexican Grill"}
            </h3>
            <p className="text-sm text-dark/70 mb-3">
              2817 Suite 6 Maybank Hwy
              <br />
              Johns Island, SC 29455
            </p>
            <div className="flex gap-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-blue/90 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Directions
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add google maps types
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: google.maps.MapOptions) => google.maps.Map;
        Marker: new (options: google.maps.MarkerOptions) => google.maps.Marker;
        InfoWindow: new (options?: google.maps.InfoWindowOptions) => google.maps.InfoWindow;
        SymbolPath: {
          CIRCLE: number;
        };
      };
    };
  }
}
