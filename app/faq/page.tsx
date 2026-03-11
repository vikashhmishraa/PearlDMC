"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  Globe,
  Shield,
  Clock,
  MessageCircle,
  HelpCircle,
  CreditCard,
  MapPin,
  Headphones,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Question {
  q: string;
  a: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  count: number;
  questions: Question[];
}

interface TrustStat {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface SearchResult extends Question {
  categoryLabel: string;
  catId: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "partnership",
    label: "Partnership & Registration",
    icon: Globe,
    count: 4,
    questions: [
      {
        q: "How do I become a registered B2B partner with PearlDMC?",
        a: "Becoming a partner is straightforward. Submit your agency credentials, trade license, and IATA/TAAI/TIDS membership via our Partner Registration form. Our partnerships team reviews applications within 48 business hours. Once approved, you'll receive full access to our B2B portal, net rate cards, and a dedicated account manager.",
      },
      {
        q: "What types of travel agencies can partner with PearlDMC?",
        a: "We work with tour operators, retail travel agencies, OTAs, corporate travel management companies (TMCs), and wholesale aggregators worldwide. Whether you're a boutique luxury agency or a large-scale operator, we tailor our services to match your business model and client base.",
      },
      {
        q: "Is there a minimum booking volume required to maintain partner status?",
        a: "Our standard partnership has no minimum volume requirement for the first year, giving you time to explore our full portfolio. After 12 months, preferred partner tiers (Silver, Gold, Platinum) are unlocked based on booking volume, offering progressively better net rates, priority support, and co-marketing opportunities.",
      },
      {
        q: "Do you offer dedicated account managers for B2B partners?",
        a: "Yes. Every registered partner is assigned a dedicated account manager fluent in your market language and destination expertise. Your account manager is your single point of contact for quotes, amendments, escalations, and FAM trip applications.",
      },
    ],
  },
  {
    id: "destinations",
    label: "Destinations & Services",
    icon: MapPin,
    count: 4,
    questions: [
      {
        q: "Which destinations does PearlDMC currently cover?",
        a: "We operate across 10+ destinations in four regions: Asia Pacific (Bali, Japan, South Korea, Thailand), Indian Ocean (Maldives, Mauritius, Seychelles), Africa (South Africa, Zanzibar/Tanzania, Kenya), and Europe & Americas (Switzerland, Italy, Turkey, USA). We expand our portfolio regularly — contact us for destinations not yet listed.",
      },
      {
        q: "What services does PearlDMC provide as a full-service DMC?",
        a: "Our services include airport transfers and private transportation, hotel contracting and accommodation, guided tours and excursions, group and MICE logistics, honeymoon and luxury packages, liveaboard cruises, visa assistance documentation, 24/7 on-ground emergency support, and bespoke FIT itinerary construction.",
      },
      {
        q: "Can PearlDMC handle MICE and large group bookings?",
        a: "Absolutely. MICE is one of our strongest verticals. We manage incentive trips, corporate retreats, conferences, product launches, and team-building events. Our MICE team handles everything from venue sourcing and AV logistics to gala dinners and themed experiences, typically for groups of 10 to 500+ pax.",
      },
      {
        q: "Do you offer fully customizable FIT packages?",
        a: "Yes — FIT customization is at the core of our B2B offering. Start from any pre-built package and modify duration, accommodation category, transport mode, activities, and meal plans. We build bespoke itineraries from scratch within 24 hours for most destinations.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Payments",
    icon: CreditCard,
    count: 4,
    questions: [
      {
        q: "How are B2B net rates structured?",
        a: "Our net rates are quoted per person based on double occupancy, excluding international flights unless otherwise stated. Rates vary by season (peak/shoulder/low), accommodation category (3★ to 5★ and luxury villas), and group size. Partners receive a tiered rate card upon registration, with volume-based discounts applied automatically.",
      },
      {
        q: "What currencies do you accept for payments?",
        a: "We quote and invoice in INR as our base currency for Indian partners. We also accept USD, EUR, GBP, AED, and SGD for international partners. Currency conversion is applied at the rate on the invoice date. Forward rate agreements are available for large group bookings upon request.",
      },
      {
        q: "What are your payment terms and deposit requirements?",
        a: "Standard terms require a 30% non-refundable deposit upon confirmation, with the balance due 45 days before the travel date. For last-minute bookings (within 30 days), full payment is required at confirmation. MICE and groups over 20 pax follow a custom payment schedule agreed at the time of contracting.",
      },
      {
        q: "Do you offer credit facilities for high-volume partners?",
        a: "Yes. Platinum-tier partners and established agencies with strong booking history may apply for a monthly credit facility. Limits are assessed based on 12-month booking volume, payment history, and financial references. Apply through your account manager after 6 months of active partnership.",
      },
    ],
  },
  {
    id: "bookings",
    label: "Bookings & Operations",
    icon: BookOpen,
    count: 4,
    questions: [
      {
        q: "How do I submit a booking or quotation request?",
        a: "Requests can be submitted via our B2B portal (fastest), by email to your account manager, or through the inquiry form on each destination page. Include travel dates, pax count, room type preference, nationality (for visa purposes), and any special requests. Standard turnaround is 4–12 hours; complex FITs within 24 hours.",
      },
      {
        q: "What is the typical lead time required for bookings?",
        a: "We recommend a minimum of 14 days for standard FIT bookings and 30 days for groups over 15 pax. Peak season travel (December–January, Golden Week, Eid periods) should be requested 60–90 days in advance. Last-minute availability exists but is subject to supplier constraints.",
      },
      {
        q: "How are amendments and cancellations handled?",
        a: "Amendments before the balance due date are generally free for minor changes (date shifts of ±3 days, room upgrades). Cancellations follow a tiered policy: 100% refund minus deposit 60+ days out; 50% refund 30–59 days; no refund within 29 days. Full supplier cancellation policies are disclosed at time of quote.",
      },
      {
        q: "What happens if a supplier cancels or fails to deliver?",
        a: "PearlDMC carries professional indemnity insurance and maintains contracts with backup suppliers in every destination. In the event of a confirmed supplier failure, we immediately source an equivalent or better alternative at no additional cost. Your account manager will notify you within 2 hours of any disruption.",
      },
    ],
  },
  {
    id: "support",
    label: "Support & Communication",
    icon: Headphones,
    count: 3,
    questions: [
      {
        q: "What support is available for clients while they are traveling?",
        a: "All PearlDMC guests receive a 24/7 local emergency contact number and a welcome pack upon arrival. Our destination operations teams are available round the clock for transfers, medical emergencies, itinerary changes, and escalations. In select destinations, guests have a dedicated local guide for the duration of their stay.",
      },
      {
        q: "In what languages does PearlDMC operate?",
        a: "Our B2B operations team communicates in English and Hindi as primary languages. We also have specialists in Arabic, Mandarin, Spanish, French, and German. Local ground teams are native speakers. Multilingual guest documentation is available for most major source markets.",
      },
      {
        q: "How can I access training and product knowledge resources?",
        a: "Registered partners have access to our Partner Resource Hub, which includes destination guides, property fact sheets, video walkthroughs, sample itineraries, and rate cards. We run monthly webinars on new products, and FAM trip applications for qualifying partners are open quarterly.",
      },
    ],
  },
];

const trustStats: TrustStat[] = [
  { icon: Globe, value: "10+", label: "Destinations" },
  { icon: Shield, value: "Licensed", label: "& Insured" },
  { icon: Clock, value: "24/7", label: "On-Ground Support" },
  { icon: MessageCircle, value: "4hr", label: "Response Time" },
];

// ─── AccordionItem ────────────────────────────────────────────────────────────

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-[oklch(0.88_0.02_90)] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span
          className={`text-sm font-medium leading-relaxed transition-colors duration-200 ${
            isOpen
              ? "text-[oklch(0.35_0.08_180)]"
              : "text-[oklch(0.18_0.02_200)] group-hover:text-[oklch(0.35_0.08_180)]"
          }`}
        >
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${
            isOpen
              ? "bg-[oklch(0.35_0.08_180)] text-white rotate-180"
              : "bg-[oklch(0.94_0.01_90)] text-[oklch(0.45_0.02_200)] group-hover:bg-[oklch(0.35_0.08_180)]/10 group-hover:text-[oklch(0.35_0.08_180)]"
          }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "400px" : "0px" }}
      >
        <p className="pb-5 text-sm leading-relaxed text-[oklch(0.45_0.02_200)] pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("partnership");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState<string>("");

  const toggle = (catId: string, qIdx: number): void => {
    const key = `${catId}-${qIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentCategory = categories.find((c) => c.id === activeCategory);

  const searchResults: SearchResult[] = search.trim()
    ? categories.flatMap((cat) =>
        cat.questions
          .filter(
            (item) =>
              item.q.toLowerCase().includes(search.toLowerCase()) ||
              item.a.toLowerCase().includes(search.toLowerCase()),
          )
          .map((item) => ({
            ...item,
            categoryLabel: cat.label,
            catId: cat.id,
          })),
      )
    : [];

  const isSearching = search.trim().length > 0;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background text-foreground">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative py-20 px-4 text-center overflow-hidden bg-foreground">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-56 rounded-full blur-3xl opacity-10 pointer-events-none bg-accent" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-6 border border-accent/25 bg-accent/10 text-accent">
              <HelpCircle className="w-3.5 h-3.5" />
              Help Centre
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-balance text-card">
              Frequently Asked{" "}
              <em className="text-accent not-italic">Questions</em>
            </h1>

            <p className="text-lg max-w-xl mx-auto mb-10 leading-relaxed text-card/55">
              Everything your agency needs to know about partnering with
              PearlDMC — from registration to on-ground operations.
            </p>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-accent/60" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 bg-card/[0.06] border border-accent/25 text-card placeholder:text-card/30 focus:border-accent/60 focus:bg-card/[0.09]"
              />
            </div>
          </div>

          {/* Trust stats strip */}
          <div className="relative z-10 mt-14 max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-accent/10 border-t border-accent/[0.12]">
            {trustStats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 py-5 px-3 bg-card/[0.04]"
              >
                <Icon className="w-4 h-4 mb-0.5 text-accent" />
                <span className="font-serif text-xl font-bold text-card">
                  {value}
                </span>
                <span className="text-xs text-card/40">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEARCH RESULTS ───────────────────────────────────────────────── */}
        {isSearching && (
          <section className="py-12 px-4 max-w-3xl mx-auto">
            <p className="text-sm mb-6 font-medium text-muted-foreground">
              {searchResults.length > 0
                ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${search}"`
                : `No results found for "${search}"`}
            </p>

            {searchResults.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center shadow-sm">
                <Search className="w-8 h-8 mx-auto mb-3 text-accent" />
                <p className="font-medium mb-1 text-foreground">
                  No questions found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try a different keyword or browse by category below
                </p>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                {searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-6 border-b border-border last:border-b-0"
                  >
                    <p className="text-xs font-semibold tracking-widest uppercase pt-4 pb-0.5 text-accent">
                      {item.categoryLabel}
                    </p>
                    <AccordionItem
                      question={item.q}
                      answer={item.a}
                      isOpen={!!openItems[`search-${idx}`]}
                      onToggle={() =>
                        setOpenItems((p) => ({
                          ...p,
                          [`search-${idx}`]: !p[`search-${idx}`],
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── MAIN LAYOUT ──────────────────────────────────────────────────── */}
        {!isSearching && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
                {/* ── Sidebar ──────────────────────────────────────────────── */}
                <aside className="lg:sticky lg:top-8 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4 px-1 text-muted-foreground">
                    Browse by topic
                  </p>

                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                          isActive
                            ? "bg-primary border-primary text-primary-foreground shadow-sm"
                            : "bg-transparent border-transparent hover:bg-card hover:border-border"
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isActive ? "bg-primary-foreground/15" : "bg-muted"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-primary"}`}
                          />
                        </span>
                        <span
                          className={`text-sm font-medium flex-1 leading-tight ${
                            isActive
                              ? "text-primary-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {cat.label}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            isActive
                              ? "bg-primary-foreground/15 text-primary-foreground"
                              : "bg-border text-muted-foreground"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}

                  {/* Support card */}
                  <div className="mt-6 rounded-2xl p-5 border border-border bg-card shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-serif font-semibold text-base mb-1 text-foreground">
                      Still have questions?
                    </p>
                    <p className="text-xs leading-relaxed mb-4 text-muted-foreground">
                      Our partner support team responds within 4 business hours.
                    </p>
                    <button className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      Contact Support
                    </button>
                  </div>
                </aside>

                {/* ── Accordion panel ──────────────────────────────────────── */}
                <div>
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      {(() => {
                        const Icon = currentCategory?.icon;
                        return Icon ? (
                          <Icon className="w-5 h-5 text-secondary-foreground" />
                        ) : null;
                      })()}
                    </span>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">
                        {currentCategory?.label}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {currentCategory?.count} questions
                      </p>
                    </div>
                  </div>

                  {/* Questions card */}
                  <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                    <div className="divide-y divide-border">
                      {currentCategory?.questions.map((item, idx) => (
                        <div key={idx} className="px-6">
                          <AccordionItem
                            question={item.q}
                            answer={item.a}
                            isOpen={!!openItems[`${activeCategory}-${idx}`]}
                            onToggle={() => toggle(activeCategory, idx)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next category nudge */}
                  {(() => {
                    const currentIdx = categories.findIndex(
                      (c) => c.id === activeCategory,
                    );
                    const next = categories[currentIdx + 1];
                    if (!next) return null;
                    const Icon = next.icon;
                    return (
                      <button
                        onClick={() => setActiveCategory(next.id)}
                        className="mt-4 w-full flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </span>
                          <div className="text-left">
                            <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-0.5">
                              Next topic
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {next.label}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
                      </button>
                    );
                  })()}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
        <section className="py-20 px-4 text-center bg-primary">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-primary-foreground/15 bg-primary-foreground/8 text-secondary">
              <Globe className="w-3.5 h-3.5" />
              Ready to partner?
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance text-primary-foreground">
              Start your B2B journey with PearlDMC
            </h2>
            <p className="text-base leading-relaxed mb-10 max-w-lg mx-auto text-primary-foreground/60">
              Join 1,000+ travel agencies already booking through our platform.
              Register today and receive exclusive net rates and a dedicated
              account manager.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/agent/auth/signup"
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
