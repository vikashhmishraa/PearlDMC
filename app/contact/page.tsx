"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Send,
  CheckCircle,
  ChevronDown,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Building2,
  Users,
  Headphones,
  CalendarCheck,
} from "lucide-react";

import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Channel {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  href: string;
}

interface Office {
  city: string;
  country: string;
  flag: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  inquiryType: string;
  destination: string;
  travelDate: string;
  paxCount: string;
  message: string;
}

// ── Contact channels ──────────────────────────────────────────────────────────
const channels: Channel[] = [
  {
    icon: Mail,
    label: "B2B Partnerships",
    value: "b2b@pearldmc.com",
    sub: "Rate requests & registrations",
    href: "mailto:b2b@pearldmc.com",
  },
  {
    icon: Phone,
    label: "Operations Hotline",
    value: "+91 7065 999 650",
    sub: "24/7 on-ground emergencies",
    href: "tel:+917065999650",
  },
  {
    icon: Headphones,
    label: "MICE & Groups",
    value: "mice@pearldmc.com",
    sub: "Groups 15 pax and above",
    href: "mailto:mice@pearldmc.com",
  },
  {
    icon: CalendarCheck,
    label: "Book a Call",
    value: "Schedule via Calendly",
    sub: "30-min intro with our team",
    href: "https://calendly.com/pearldmc/30min",
  },
];

// ── Global offices ────────────────────────────────────────────────────────────
const offices: Office[] = [
  {
    city: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    role: "Regional Office",
    address: "Jln Kartika plaza 1, Kuta, Bali, Indonesia. 80361",
    phone: "+62 361 234567",
    email: "b2b@pearldmc.com",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM GMT+8",
  },
  {
    city: "Manila",
    country: "Philippines",
    flag: "🇵🇭",
    role: "Asia Pacific Office",
    address: "Makati City, Metro Manila, Philippines. 1226",
    phone: "+63 969 207 6284",
    email: "b2b@pearldmc.com",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM GMT+8",
  },
  {
    city: "Noida",
    country: "India",
    flag: "🇮🇳",
    role: "Head Office — Asia Pacific",
    address:
      "C-618, Spectrum Metro Mall, Sector 75, Noida, Uttar Pradesh, India. 201301",
    phone: "+91 7065999650",
    email: "b2b@pearldmc.com",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM IST",
  },
  {
    city: "Ahmedabad",
    country: "India",
    flag: "🇮🇳",
    role: "Representative Office",
    address:
      "C-618, Spectrum Metro Mall, Sector 75, Noida, Uttar Pradesh, India. 201301",
    phone: "+91 7065999650",
    email: "b2b@pearldmc.com",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM IST",
  },
];

// ── Inquiry types ─────────────────────────────────────────────────────────────
const inquiryTypes: string[] = [
  "B2B Partnership Registration",
  "FIT Package Request",
  "MICE / Group Booking",
  "Honeymoon & Luxury",
  "Destination Information",
  "Press & Media",
  "General Enquiry",
];

const destinations: string[] = [
  "Bali, Indonesia",
  "Japan",
  "South Korea",
  "Thailand",
  "Vietnam",
  "Maldives",
  "Mauritius",
  "Seychelles",
  "South Africa",
  "Zanzibar, Tanzania",
  "Kenya",
  "Switzerland",
  "Italy",
  "Turkey",
  "USA",
  "Other / Not listed",
];

// ── Select component ──────────────────────────────────────────────────────────

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

function Select({
  label,
  options,
  value,
  onChange,
  required = false,
}: SelectProps) {
  return (
    <div className="relative">
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full appearance-none px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

// ── Input component ───────────────────────────────────────────────────────────

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: InputProps) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  inquiryType: "",
  destination: "",
  travelDate: "",
  paxCount: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeOffice, setActiveOffice] = useState<number>(0);

  // Typed field setter — keyof FormState ensures only valid field names are accepted
  const set = (field: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm(emptyForm);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative py-20 px-4 overflow-hidden bg-foreground">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full blur-3xl opacity-10 pointer-events-none bg-accent" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-5 pointer-events-none bg-primary" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-6 border border-accent/25 bg-accent/10 text-accent">
              <Globe className="w-3.5 h-3.5" />
              Global B2B DMC Partner
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-balance text-card">
              Let&apos;s build something{" "}
              <em className="text-accent not-italic">remarkable</em> together
            </h1>

            <p className="text-lg max-w-xl mx-auto leading-relaxed text-card/55 mb-12">
              Whether you&apos;re registering as a partner, requesting rates, or
              planning a group movement — our team responds within 4 business
              hours.
            </p>

            {/* Quick contact pills */}
            <div className="flex flex-wrap gap-3 justify-center">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-card/15 bg-card/[0.06] text-card/80 text-sm font-medium hover:bg-card/[0.12] hover:border-accent/40 hover:text-card transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-accent shrink-0" />
                  <span>{value}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN GRID: FORM + INFO ────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            {/* ── FORM ─────────────────────────────────────────────────────── */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              {/* Form header */}
              <div className="px-8 py-6 border-b border-border bg-muted/40">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Send className="w-5 h-5 text-secondary-foreground" />
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground">
                      Send an Inquiry
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      We reply within 4 business hours
                    </p>
                  </div>
                </div>
              </div>

              {submitted ? (
                /* Success state */
                <div className="px-8 py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto mb-8">
                    Thank you,{" "}
                    <strong className="text-foreground">
                      {form.firstName}
                    </strong>
                    . A member of our partnerships team will be in touch within
                    4 business hours.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-xs text-muted-foreground font-medium mb-6">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    Confirmation sent to {form.email}
                  </div>
                  <br />
                  <button
                    onClick={handleReset}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                  {/* Name row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={set("firstName")}
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={set("lastName")}
                      required
                    />
                  </div>

                  {/* Agency + Country */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Agency / Company"
                      placeholder="Sunrise Travel Ltd."
                      value={form.company}
                      onChange={set("company")}
                      required
                    />
                    <Input
                      label="Country"
                      placeholder="India"
                      value={form.country}
                      onChange={set("country")}
                      required
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Business Email"
                      type="email"
                      placeholder="jane@agency.com"
                      value={form.email}
                      onChange={set("email")}
                      required
                    />
                    <Input
                      label="Phone / WhatsApp"
                      type="tel"
                      placeholder="+91 98200 00000"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border pt-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                      Travel Details
                    </p>
                  </div>

                  {/* Inquiry type + Destination */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select
                      label="Inquiry Type"
                      options={inquiryTypes}
                      value={form.inquiryType}
                      onChange={set("inquiryType")}
                      required
                    />
                    <Select
                      label="Destination"
                      options={destinations}
                      value={form.destination}
                      onChange={set("destination")}
                    />
                  </div>

                  {/* Date + Pax */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Estimated Travel Date"
                      type="month"
                      value={form.travelDate}
                      onChange={set("travelDate")}
                    />
                    <Input
                      label="Number of Pax"
                      type="number"
                      placeholder="2"
                      value={form.paxCount}
                      onChange={set("paxCount")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                      Message / Special Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your client's preferences, budget range, accommodation category, or any special requirements…"
                      value={form.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        set("message")(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-sm font-semibold tracking-wide uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                  >
                    Send Inquiry
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-xs text-center text-muted-foreground leading-relaxed">
                    By submitting you agree to our{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    . We never share your data with third parties.
                  </p>
                </form>
              )}
            </div>

            {/* ── RIGHT COLUMN ─────────────────────────────────────────────── */}
            <div className="space-y-5">
              {/* Response promise */}
              <div className="bg-primary rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-primary-foreground/15 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </span>
                  <div>
                    <p className="font-serif font-bold text-primary-foreground text-base">
                      4-Hour Response
                    </p>
                    <p className="text-xs text-primary-foreground/60">
                      Guaranteed on business days
                    </p>
                  </div>
                </div>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  Every inquiry is reviewed by a senior partnerships manager —
                  not a bot. You&apos;ll receive a personalised response with
                  rates, availability, or next steps.
                </p>
              </div>

              {/* Contact channels */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-muted/40">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Direct Channels
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {channels.map(({ icon: Icon, label, value, sub, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors group"
                    >
                      <span className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                          {label}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {value}
                        </p>
                        <p className="text-xs text-muted-foreground">{sub}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Follow PearlDMC
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      href: "https://linkedin.com/company/pearldmc",
                    },
                    {
                      icon: Instagram,
                      label: "Instagram",
                      href: "https://instagram.com/pearldmc",
                    },
                    {
                      icon: Facebook,
                      label: "Facebook",
                      href: "https://facebook.com/pearldmc",
                    },
                    {
                      icon: Twitter,
                      label: "Twitter / X",
                      href: "https://x.com/PearlDMC",
                    },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      title={label}
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GLOBAL OFFICES ───────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-muted/50 border-t border-border">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                  Worldwide Presence
                </p>
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Our Global Offices
                </h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                {offices.map((o, i) => (
                  <button
                    key={o.city}
                    onClick={() => setActiveOffice(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      activeOffice === i
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {o.flag} {o.city}
                  </button>
                ))}
              </div>
            </div>

            {/* Active office card */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Details */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-3xl">{offices[activeOffice].flag}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      {offices[activeOffice].city}
                    </h3>
                    <p className="text-sm text-accent font-medium">
                      {offices[activeOffice].role}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {(
                    [
                      { icon: MapPin, value: offices[activeOffice].address },
                      { icon: Phone, value: offices[activeOffice].phone },
                      { icon: Mail, value: offices[activeOffice].email },
                      { icon: Clock, value: offices[activeOffice].hours },
                    ] as { icon: React.ElementType; value: string }[]
                  ).map(({ icon: Icon, value }) => (
                    <div key={value} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-primary" />
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* All offices summary */}
              <div className="space-y-4">
                {offices.map((office, i) => (
                  <button
                    key={office.city}
                    onClick={() => setActiveOffice(i)}
                    className={`w-full text-left flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 ${
                      activeOffice === i
                        ? "bg-primary border-primary text-primary-foreground shadow-sm"
                        : "bg-card border-border hover:border-primary/30 hover:shadow-sm"
                    }`}
                  >
                    <span className="text-2xl shrink-0">{office.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-serif font-bold text-base ${activeOffice === i ? "text-primary-foreground" : "text-foreground"}`}
                      >
                        {office.city}, {office.country}
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${activeOffice === i ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                      >
                        {office.role}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${activeOffice === i ? "text-primary-foreground translate-x-0.5" : "text-muted-foreground/40"}`}
                    />
                  </button>
                ))}

                {/* Partner badge */}
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card">
                  <span className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-secondary-foreground" />
                  </span>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      1,000+ Partner Agencies
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Across 60+ source markets worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CONTACT US ───────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                Why PearlDMC
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                What to expect when you reach out
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(
                [
                  {
                    icon: Clock,
                    title: "4-Hour Reply",
                    desc: "Every inquiry acknowledged by a real partnerships manager, not an automated system.",
                  },
                  {
                    icon: Building2,
                    title: "Custom Rate Cards",
                    desc: "Net rates built around your agency's volume, client tier, and preferred destinations.",
                  },
                  {
                    icon: Globe,
                    title: "Local Expertise",
                    desc: "Ground teams in every destination — not outsourced handlers but our own staff.",
                  },
                  {
                    icon: Headphones,
                    title: "Dedicated Support",
                    desc: "One account manager for your agency across all bookings and all destinations.",
                  },
                ] as { icon: React.ElementType; title: string; desc: string }[]
              ).map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
                >
                  <span className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </span>
                  <h3 className="font-serif font-bold text-base text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
        <section className="py-20 px-4 text-center bg-primary">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-primary-foreground/15 bg-primary-foreground/8 text-secondary">
              <Globe className="w-3.5 h-3.5" />
              Partner with PearlDMC
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance text-primary-foreground">
              Ready to grow your travel business?
            </h2>
            <p className="text-base leading-relaxed mb-10 max-w-lg mx-auto text-primary-foreground/60">
              Join 1,000+ agencies already booking exclusive B2B rates across
              Asia, the Indian Ocean, and Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/agent/auth/register"
                className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase bg-background text-foreground hover:bg-background/90 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group"
              >
                Register as Partner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/brochures"
                className="px-8 py-4 rounded-xl text-sm font-medium tracking-wide uppercase border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 transition-all inline-flex items-center justify-center"
              >
                Download Partner Guide
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
