"use client";

import React, { useState } from "react";
import {
  Globe,
  Shield,
  Users,
  Award,
  Heart,
  ArrowRight,
  MapPin,
  Star,
  TrendingUp,
  Handshake,
  Compass,
  Zap,
  CheckCircle,
  ChevronRight,
  Quote,
} from "lucide-react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
  sub: string;
}

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

interface Value {
  icon: React.ElementType;
  title: string;
  desc: string;
}

interface TeamMember {
  name: string;
  title: string;
  region: string;
  bio: string;
  initials: string;
}

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  rating: number;
}

interface Region {
  name: string;
  destinations: string[];
  flag: string;
}

interface Accreditation {
  icon: React.ElementType;
  title: string;
  sub: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: Stat[] = [
  { value: "17+", label: "Years Operating", sub: "Founded 2007" },
  { value: "10+", label: "Destinations", sub: "4 Regions Worldwide" },
  { value: "1,000+", label: "Partner Agencies", sub: "Across 60 Countries" },
  { value: "98%", label: "Satisfaction Rate", sub: "Based on partner surveys" },
];

const milestones: Milestone[] = [
  {
    year: "2007",
    title: "Founded in Mumbai",
    desc: "PearlDMC was established in Mumbai, India, with a vision to give international and domestic travel agencies access to a reliable, transparent DMC partner for the world's most sought-after destinations.",
  },
  {
    year: "2011",
    title: "Expanded to Indian Ocean",
    desc: "Opened operations in the Maldives and Mauritius, serving the luxury and honeymoon travel segment with bespoke overwater villa packages.",
  },
  {
    year: "2015",
    title: "MICE Division Launched",
    desc: "Formed a dedicated MICE & Groups division handling corporate incentives, conferences, and events across Asia Pacific for groups up to 500 pax.",
  },
  {
    year: "2018",
    title: "Africa & Indian Ocean Expansion",
    desc: "Established ground operations in South Africa, Zanzibar, and Kenya — completing our multi-region global portfolio and meeting the growing demand from Indian travellers for exotic long-haul destinations.",
  },
  {
    year: "2021",
    title: "B2B Portal Goes Live",
    desc: "Launched our proprietary partner portal giving registered agencies real-time access to net rates, availability, and booking management.",
  },
  {
    year: "2024",
    title: "1,000 Partners Milestone",
    desc: "Reached 1,000+ registered B2B partner agencies across 60 source markets, with operations in three regional offices worldwide.",
  },
];

const values: Value[] = [
  {
    icon: Handshake,
    title: "Partnership First",
    desc: "We treat every agency as a long-term partner, not a transaction. Our success is measured by your growth.",
  },
  {
    icon: Compass,
    title: "Local Mastery",
    desc: "Our ground teams are destination natives — not outsourced handlers. Authentic expertise, not brochure knowledge.",
  },
  {
    icon: Shield,
    title: "Reliability Above All",
    desc: "Backup suppliers in every destination, professional indemnity insurance, and a 24/7 operations line that actually answers.",
  },
  {
    icon: Zap,
    title: "Speed & Precision",
    desc: "4-hour response times, 24-hour FIT itineraries, and proactive communication at every stage of the booking lifecycle.",
  },
  {
    icon: Heart,
    title: "Client-Centred Care",
    desc: "The traveller's experience is the ultimate measure of our work. We obsess over every detail so your clients return.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    desc: "We expand our portfolio, improve our systems, and train our teams constantly — so your product stays competitive.",
  },
];

const team: TeamMember[] = [
  {
    name: "Vikas Mishra",
    title: "Chief Executive Officer",
    region: "Delhi, India",
    bio: "17 years in destination management. Former VP at one of India's leading outbound tour operators. Arjun founded PearlDMC with a conviction that B2B travel deserved a more transparent and reliable partner — built in India, for the world.",
    initials: "VM",
  },
  {
    name: "James Whitfield",
    title: "Chief Operations Officer",
    region: "Dubai, UAE",
    bio: "Ex-operations director at a global DMC network. James oversees all ground operations, supplier contracts, and our 24/7 emergency response infrastructure across all destinations.",
    initials: "JW",
  },
  {
    name: "Priya Nair",
    title: "Head of Partnerships",
    region: "New Delhi, India",
    bio: "15 years in B2B travel sales across India, the Middle East, and Europe. Priya leads our global agency recruitment, partner tier programmes, and co-marketing initiatives.",
    initials: "PN",
  },
  {
    name: "Rahul Sharma",
    title: "MICE & Groups Director",
    region: "Mumbai, India",
    bio: "Specialist in large-scale incentive programmes, corporate retreats, and multi-destination group movements for Indian corporates and global MNCs. Rahul has executed events from Tokyo to Johannesburg.",
    initials: "RS",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "PearlDMC is our go-to DMC for the entire Asia Pacific region. Their responsiveness and attention to detail have made them an indispensable partner for our luxury clients.",
    author: "Sophie Laurent",
    company: "Voyage Privé, France",
    rating: 5,
  },
  {
    quote:
      "We've worked with many DMCs over the years. PearlDMC stands out because they actually answer the phone at 2am when something goes wrong — and it always gets resolved.",
    author: "David Okafor",
    company: "Prestige Travel Group, UK",
    rating: 5,
  },
  {
    quote:
      "The MICE team handled our 200-person incentive to Bali flawlessly. Every detail, from airport arrivals to gala night, was executed perfectly.",
    author: "Yuki Tanaka",
    company: "Nippon Business Travel, Japan",
    rating: 5,
  },
];

const regions: Region[] = [
  {
    name: "Asia Pacific",
    destinations: [
      "Bali, Indonesia",
      "Japan",
      "South Korea",
      "Thailand",
      "Vietnam",
    ],
    flag: "🌏",
  },
  {
    name: "Indian Ocean",
    destinations: ["Maldives", "Mauritius", "Seychelles"],
    flag: "🌊",
  },
  {
    name: "Africa",
    destinations: ["South Africa", "Zanzibar, Tanzania", "Kenya"],
    flag: "🌍",
  },
  {
    name: "Europe & Americas",
    destinations: ["Switzerland", "Italy", "Turkey", "USA"],
    flag: "✈️",
  },
];

const accreditations: Accreditation[] = [
  {
    icon: Award,
    title: "IATA Accredited",
    sub: "International Air Transport Association",
  },
  {
    icon: Shield,
    title: "MoT Registered",
    sub: "Ministry of Tourism, Govt. of India",
  },
  {
    icon: CheckCircle,
    title: "PI Insured",
    sub: "Professional Indemnity Coverage",
  },
  {
    icon: Users,
    title: "TAAI Member",
    sub: "Travel Agents Association of India",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SectionEyebrowProps {
  children: React.ReactNode;
}

function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
  light?: boolean;
}

function SectionHeading({ children, light = false }: SectionHeadingProps) {
  return (
    <h2
      className={`font-serif text-3xl md:text-4xl font-bold leading-tight text-balance ${light ? "text-primary-foreground" : "text-foreground"}`}
    >
      {children}
    </h2>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(
    null,
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-foreground px-4 py-24">
          {/* Layered ambient glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 rounded-full blur-3xl opacity-10 bg-accent" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-5 bg-primary" />
            <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 bg-accent" />
          </div>

          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, oklch(0.75 0.12 85) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-8 border border-accent/25 bg-accent/10 text-accent">
              <Globe className="w-3.5 h-3.5" />
              Our Story Since 2007
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-card text-balance">
              The world&apos;s best journeys <br className="hidden md:block" />
              start with the{" "}
              <em className="text-accent not-italic">right partner</em>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-card/55 mb-12">
              PearlDMC is a full-service Destination Management Company built
              exclusively for travel agencies, tour operators, and MICE
              professionals. We handle everything on the ground — so you can
              focus on selling.
            </p>

            {/* Stat strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px max-w-3xl mx-auto border border-accent/10 overflow-hidden rounded-2xl">
              {stats.map(({ value, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center py-6 px-4"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <span className="font-serif text-3xl font-bold text-card mb-1">
                    {value}
                  </span>
                  <span className="text-xs font-semibold text-card/70 mb-0.5">
                    {label}
                  </span>
                  <span className="text-xs text-card/35">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>

        {/* ── MISSION STATEMENT ────────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left — pull quote */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 opacity-10">
                <Quote className="w-full h-full text-accent" />
              </div>
              <blockquote className="relative z-10">
                <p className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug mb-6">
                  &ldquo;We don&apos;t just book trips. We engineer experiences
                  that make travellers loyal to{" "}
                  <em className="text-accent not-italic">your</em>{" "}
                  agency.&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-sm shrink-0">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Vikas M
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CEO &amp; Co-Founder, PearlDMC
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Right — paragraphs */}
            <div className="space-y-5">
              <SectionEyebrow>Our Mission</SectionEyebrow>
              <SectionHeading>
                Built for travel professionals, by travel professionals
              </SectionHeading>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  PearlDMC was founded in 2007 with a single frustration: travel
                  agencies deserved a DMC partner that was as invested in the
                  client experience as they were. Too many operators were
                  opaque, slow, and transactional. We set out to be different.
                </p>
                <p>
                  Today, we operate across 10+ destinations in four regions —
                  Asia Pacific, the Indian Ocean, Africa, and Europe &amp;
                  Americas. Every destination has our own ground team, our own
                  vetted supplier network, and our own 24/7 operations cover.
                  Nothing is outsourced.
                </p>
                <p>
                  Our entire business model is B2B. We don&apos;t compete with
                  travel agencies. We exist to make them stronger, more
                  profitable, and more capable of delivering remarkable
                  experiences to their clients.
                </p>
              </div>
              <a
                href="/destinations"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 group mt-2"
              >
                Explore our destinations
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-muted/50 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <SectionEyebrow>What Drives Us</SectionEyebrow>
              <SectionHeading>
                Six principles behind every decision
              </SectionHeading>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200 group"
                  style={{ animationDelay: `${i * 80}ms` }}
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

        {/* ── JOURNEY / TIMELINE ───────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <SectionEyebrow>Our Journey</SectionEyebrow>
              <SectionHeading>
                17 years of growth, milestone by milestone
              </SectionHeading>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[11px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {milestones.map((m, i) => {
                  const isRight = i % 2 === 0;
                  const isExpanded = expandedMilestone === i;
                  return (
                    <div
                      key={m.year}
                      className={`relative flex items-start gap-6 md:gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      {/* Dot */}
                      <div className="relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-5 shrink-0">
                        <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-sm" />
                      </div>

                      {/* Card */}
                      <div
                        className={`flex-1 md:w-[calc(50%-2rem)] ${isRight ? "md:pr-12" : "md:pl-12"} md:mt-0`}
                        style={{ marginLeft: isRight ? undefined : "auto" }}
                      >
                        <button
                          onClick={() =>
                            setExpandedMilestone(isExpanded ? null : i)
                          }
                          className="w-full text-left bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <span className="text-xs font-bold tracking-widest uppercase text-accent">
                              {m.year}
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-200 ${isExpanded ? "rotate-90 text-primary" : "group-hover:translate-x-0.5"}`}
                            />
                          </div>
                          <h3 className="font-serif font-bold text-base text-foreground mb-0">
                            {m.title}
                          </h3>
                          <div
                            className="overflow-hidden transition-all duration-300"
                            style={{
                              maxHeight: isExpanded ? "120px" : "0px",
                              marginTop: isExpanded ? "8px" : "0px",
                            }}
                          >
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {m.desc}
                            </p>
                          </div>
                        </button>
                      </div>

                      {/* Spacer for opposite side on desktop */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── GLOBAL FOOTPRINT ─────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-foreground relative overflow-hidden">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-40 rounded-full blur-3xl opacity-10 pointer-events-none bg-accent" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                Our Reach
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-card text-balance">
                Four regions. One seamless network.
              </h2>
              <p className="text-card/50 text-sm mt-3 max-w-lg mx-auto">
                Every destination is served by our own ground team — never
                third-party handlers.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {regions.map(({ name, destinations: dests, flag }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-card/10 p-6 hover:border-accent/30 hover:bg-card/5 transition-all duration-200 group"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{flag}</span>
                    <h3 className="font-serif font-bold text-card text-base">
                      {name}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {dests.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2 text-sm text-card/55"
                      >
                        <MapPin className="w-3 h-3 text-accent shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-card/10">
                    <span className="text-xs text-accent font-medium">
                      {dests.length} destination{dests.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ─────────────────────────────────────────────────────────── */}
        {/* <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <SectionEyebrow>Leadership Team</SectionEyebrow>
                <SectionHeading>The people behind PearlDMC</SectionHeading>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Decades of combined experience in destination management, B2B
                travel sales, and on-ground operations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {team.map(({ name, title, region, bio, initials }) => (
                <div
                  key={name}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/25 transition-all duration-200 group"
                >
                  
                  <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <span className="font-serif text-2xl font-bold text-primary-foreground">
                        {initials}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif font-bold text-base text-foreground mb-0.5">
                      {name}
                    </h3>
                    <p className="text-xs font-semibold text-accent mb-1">
                      {title}
                    </p>
                    <div className="flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3 text-muted-foreground/50 shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {region}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                      {bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-muted/50 border-y border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <SectionEyebrow>Partner Voices</SectionEyebrow>
              <SectionHeading>What our partners say</SectionHeading>
            </div>

            {/* Featured testimonial */}
            <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm mb-5 relative overflow-hidden">
              <div className="absolute top-6 right-8 opacity-5">
                <Quote className="w-24 h-24 text-primary" />
              </div>
              <div className="flex gap-1 mb-6">
                {Array.from({
                  length: testimonials[activeTestimonial].rating,
                }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="font-serif text-xl md:text-2xl font-bold text-foreground leading-snug mb-6 relative z-10">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground text-xs font-bold font-serif">
                    {testimonials[activeTestimonial].author
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonials[activeTestimonial].author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </footer>
            </div>

            {/* Selector pills */}
            <div className="flex gap-3 justify-center">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
                    activeTestimonial === i
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {t.author.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACCREDITATIONS ───────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <SectionEyebrow>Trust &amp; Compliance</SectionEyebrow>
              <SectionHeading>
                Licensed, accredited, and fully insured
              </SectionHeading>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {accreditations.map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm flex items-start gap-4 hover:border-primary/20 hover:shadow-md transition-all duration-200"
                >
                  <span className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-secondary-foreground" />
                  </span>
                  <div>
                    <p className="font-serif font-bold text-sm text-foreground mb-0.5">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
        <section className="py-20 px-4 text-center bg-primary">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-primary-foreground/15 bg-primary-foreground/8 text-secondary">
              <Handshake className="w-3.5 h-3.5" />
              Become a Partner
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance text-primary-foreground">
              Join 1,000+ agencies already growing with PearlDMC
            </h2>
            <p className="text-base leading-relaxed mb-10 max-w-lg mx-auto text-primary-foreground/60">
              Register as a B2B partner today and get access to exclusive net
              rates, a dedicated account manager, and a global network of
              on-ground experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase bg-background text-foreground hover:bg-background/90 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/destinations"
                className="px-8 py-4 rounded-xl text-sm font-medium tracking-wide uppercase border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 transition-all inline-flex items-center justify-center"
              >
                View Destinations
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
