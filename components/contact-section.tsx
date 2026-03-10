"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  Globe,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    primary: "b2b@pearldmc.com",
    secondary: "reservations@pearldmc.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    primary: "+63 2 8912 3456",
    secondary: "+91 7065 999 650 (WhatsApp)",
  },
  {
    icon: MapPin,
    title: "Global HQ",
    primary: "25th Floor, One Bonifacio High Street",
    secondary: "BGC, Taguig City, Philippines 1634",
  },
  {
    icon: Clock,
    title: "Operating Hours",
    primary: "24/7 Global Operations",
    secondary: "Regional offices across all destinations",
  },
];

const destinations = [
  "Philippines",
  "Bali, Indonesia",
  "Japan",
  "South Korea",
  "Maldives",
  "Mauritius",
  "Seychelles",
  "South Africa",
  "Zanzibar, Tanzania",
  "Jamaica",
  "Multiple Destinations",
];

const inquiryTypes = [
  "General Inquiry",
  "Rate Request",
  "Partnership Application",
  "Group Booking",
  "MICE Inquiry",
  "Cruise Shore Excursions",
  "Other",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    destination: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Contact Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Start Your Global Partnership Today
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ready to offer your clients unforgettable experiences across 10+
            destinations? Get in touch with our team and receive competitive B2B
            rates within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      {info.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {info.primary}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {info.secondary}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Global Coverage */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">Global Coverage</p>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                With regional offices and local teams across all our
                destinations, we ensure seamless operations no matter where your
                clients travel.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Asia Pacific", "Indian Ocean", "Africa", "Caribbean"].map(
                  (region) => (
                    <span
                      key={region}
                      className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {region}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Quick Response Badge */}
            <div className="bg-primary rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-primary-foreground mb-1">
                    Quick Response Guarantee
                  </p>
                  <p className="text-primary-foreground/80 text-sm">
                    We respond to all inquiries within 24 hours. For urgent
                    requests, use our 24/7 emergency hotline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                    Thank You for Your Inquiry!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our team will review your message and get back to you within
                    24 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        destination: "",
                        inquiryType: "",
                        message: "",
                      });
                    }}
                    variant="outline"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Request Partnership Information
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Fill out the form below and our partnerships team will
                    contact you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          placeholder="Your company"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Business Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 234 567 890"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="destination">
                          Destination of Interest *
                        </Label>
                        <select
                          id="destination"
                          value={formData.destination}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              destination: e.target.value,
                            })
                          }
                          required
                          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select destination</option>
                          {destinations.map((dest) => (
                            <option key={dest} value={dest}>
                              {dest}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">Inquiry Type *</Label>
                        <select
                          id="inquiryType"
                          value={formData.inquiryType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              inquiryType: e.target.value,
                            })
                          }
                          required
                          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select inquiry type</option>
                          {inquiryTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements, destinations of interest, expected volume, etc."
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Inquiry
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy.
                      Your information will only be used for business
                      correspondence.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
