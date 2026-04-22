"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock, ExternalLink, Mail } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { ContactForm } from "@/components/contact-form";
import { StyledMap } from "@/components/styled-map";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const businessHours = [
  { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
  { day: "Monday", hours: "11:00 AM - 9:00 PM" },
  { day: "Tuesday", hours: "11:00 AM - 9:00 PM" },
  { day: "Wednesday", hours: "11:00 AM - 9:00 PM" },
  { day: "Thursday", hours: "11:00 AM - 9:00 PM" },
  { day: "Friday", hours: "11:00 AM - 10:00 PM" },
  { day: "Saturday", hours: "11:00 AM - 10:00 PM" },
];

export default function LocationPage() {
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (infoRef.current) {
      const cards = infoRef.current.querySelectorAll(".info-card");
      gsap.set(cards, { opacity: 0, y: 30 });
      
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Visit Us"
        subtitle="Johns Island, SC"
        slogan="Experience authentic Mexican hospitality"
        backgroundImage="/images/dishes_01.jpg"
        height="large"
        showScrollIndicator={false}
      />

      {/* Location Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div ref={infoRef} className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Address Card */}
            <div className="info-card bg-light-blue rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-[5px] bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-dark mb-3">Address</h3>
              <address className="not-italic text-dark/70 leading-relaxed">
                {"Maria's Mexican Grill"}
                <br />
                2817 Suite 6 Maybank Hwy
                <br />
                Johns Island, SC 29455
              </address>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=32.7265,-80.0594"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-primary hover:text-dark font-semibold text-sm transition-colors"
              >
                Get Directions
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Phone Card */}
            <div className="info-card bg-light-blue rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-[5px] bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-dark mb-3">Phone</h3>
              <a
                href="tel:+18435571005"
                className="text-2xl font-bold text-primary hover:text-dark transition-colors"
              >
                (843) 557-1005
              </a>
              <p className="text-dark/70 mt-2">
                Call us for reservations or inquiries
              </p>
            </div>

            {/* Hours Card */}
            <div className="info-card bg-light-blue rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-[5px] bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-dark mb-3">Hours</h3>
              <div className="text-dark/70 space-y-1">
                <p>Sun: 12:00 PM - 9:00 PM</p>
                <p>Mon-Thu: 11:00 AM - 9:00 PM</p>
                <p>Fri-Sat: 11:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <StyledMap className="mb-16" />

          {/* Detailed Hours */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
                Plan Your Visit
              </span>
              <div className="decorative-divider my-4">
                <span className="text-xl text-primary">&#10022;</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-dark">
                Business Hours
              </h2>
            </div>
            
            <div className="bg-lighter-blue rounded-xl overflow-hidden">
              {businessHours.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-6 py-4 border-b border-white/50 last:border-b-0 hover:bg-light-blue transition-colors"
                >
                  <span className="font-medium text-dark">{item.day}</span>
                  <span className="text-dark/70">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-light-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
                Get In Touch
              </span>
              <div className="decorative-divider my-4">
                <span className="text-xl text-primary">&#10022;</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
                Contact Us
              </h2>
              <p className="text-dark/70 text-lg">
                Have a question or want to make a reservation? {"We'd"} love to hear from you!
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {"Can't"} Make It In?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Order online for pickup or delivery and enjoy our authentic Mexican flavors at home.
          </p>
          <a
            href="https://www.toasttab.com/marias-mexican-grill-2817-maybank-hwy-ste-7/v3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-blue/90 text-white rounded-[5px] font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105"
          >
            Order Online
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
