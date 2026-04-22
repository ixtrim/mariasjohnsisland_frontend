"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!formRef.current) return;

    const fields = formRef.current.querySelectorAll(".form-field");
    gsap.set(fields, { opacity: 0, y: 20 });

    gsap.to(fields, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo purposes, always succeed
    setStatus("success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Reset status after 5 seconds
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="form-field">
          <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-light-blue bg-white text-dark placeholder-dark/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-light-blue bg-white text-dark placeholder-dark/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone */}
        <div className="form-field">
          <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-light-blue bg-white text-dark placeholder-dark/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="(843) 555-0123"
          />
        </div>

        {/* Subject */}
        <div className="form-field">
          <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
            Subject <span className="text-primary">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-light-blue bg-white text-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          >
            <option value="">Select a subject</option>
            <option value="reservation">Reservation Inquiry</option>
            <option value="catering">Catering Request</option>
            <option value="event">Private Event</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="form-field">
        <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-light-blue bg-white text-dark placeholder-dark/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          placeholder="How can we help you?"
        />
      </div>

      {/* Submit Button */}
      <div className="form-field">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "w-full md:w-auto px-8 py-4 rounded-[5px] font-semibold text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2",
            status === "submitting"
              ? "bg-dark/50 text-white cursor-not-allowed"
              : "bg-primary hover:bg-blue/90 text-white hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          )}
        >
          {status === "submitting" ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-[5px] animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p>Thank you for your message! We&apos;ll get back to you soon.</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>Something went wrong. Please try again later.</p>
        </div>
      )}
    </form>
  );
}
