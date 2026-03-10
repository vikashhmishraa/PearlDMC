"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Globe,
  Shield,
  FileText,
  ChevronRight,
  ArrowUp,
  Scale,
  Users,
  CreditCard,
  AlertTriangle,
  Lock,
  Mail,
  BookOpen,
  Handshake,
  Ban,
  Info,
  ExternalLink,
  Download,
  CalendarDays,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// ─── Content block types (discriminated union) ────────────────────────────────

interface ParagraphBlock {
  type: "p";
  text: string;
}
interface SubheadingBlock {
  type: "subheading";
  text: string;
}
interface ListBlock {
  type: "list";
  items: string[];
}
interface HighlightBlock {
  type: "highlight";
  text: string;
}
interface ContactItem {
  label: string;
  value: string;
}
interface ContactBlock {
  type: "contact";
  items: ContactItem[];
}

type ContentBlock =
  | ParagraphBlock
  | SubheadingBlock
  | ListBlock
  | HighlightBlock
  | ContactBlock;

// ─── Section type ─────────────────────────────────────────────────────────────

interface Section {
  id: string;
  icon: React.ElementType;
  title: string;
  content: ContentBlock[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const sections: Section[] = [
  {
    id: "acceptance",
    icon: Handshake,
    title: "Acceptance of Terms",
    content: [
      {
        type: "p",
        text: 'By accessing, registering for, or using the PearlDMC B2B Partner Portal, website, or any services provided by Pearl Destination Management Company ("PearlDMC", "we", "us", or "our"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms") in their entirety.',
      },
      {
        type: "p",
        text: 'These Terms constitute a legally binding agreement between your agency ("Partner", "you", or "your") and PearlDMC. If you do not agree to these Terms, you must not access or use our services.',
      },
      {
        type: "p",
        text: "By registering as a partner, you represent and warrant that you have the full legal authority to enter into this agreement on behalf of your agency or company, and that your agency is a duly incorporated, licensed, and lawfully operating travel business in your jurisdiction.",
      },
      {
        type: "highlight",
        text: "These Terms were last updated on 1 January 2025. We reserve the right to modify these Terms at any time. Continued use of our services following notification of changes constitutes acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "eligibility",
    icon: Users,
    title: "Partner Eligibility & Registration",
    content: [
      {
        type: "p",
        text: "PearlDMC operates exclusively on a Business-to-Business (B2B) basis. Access to our net rates, booking portal, and services is restricted to registered travel industry professionals only. We do not transact directly with end consumers.",
      },
      {
        type: "subheading",
        text: "To be eligible for partner registration, your agency must:",
      },
      {
        type: "list",
        items: [
          "Be a legally registered and licensed travel agency, tour operator, corporate TMC, or travel industry entity",
          "Hold valid trade membership where applicable (IATA, TAAI, ADTOI, TIDS, or equivalent)",
          "Have a designated point of contact who is authorised to transact on behalf of the agency",
          "Operate in compliance with all applicable laws and regulations in your country of registration",
          "Not be engaged in any activities that compete directly with PearlDMC's destination management operations",
        ],
      },
      {
        type: "p",
        text: "PearlDMC reserves the right to approve or reject any partner registration application at our sole discretion, without obligation to provide a reason. Approval is typically communicated within 48 business hours of receiving a complete application.",
      },
      {
        type: "p",
        text: "You are responsible for maintaining the accuracy of your registered information and must notify us promptly of any material changes to your agency's details, ownership, or licensing status.",
      },
    ],
  },
  {
    id: "services",
    icon: Globe,
    title: "Services & B2B Portal",
    content: [
      {
        type: "p",
        text: "Upon approved registration, PearlDMC grants you a limited, non-exclusive, non-transferable licence to access the B2B Partner Portal and use our services solely for the purpose of booking travel services on behalf of your clients.",
      },
      {
        type: "subheading",
        text: "Our services include, but are not limited to:",
      },
      {
        type: "list",
        items: [
          "Access to B2B net rate cards across all active destinations",
          "FIT itinerary planning and quotation services",
          "Group and MICE programme management",
          "Airport transfers and ground transportation",
          "Hotel and resort accommodation contracting",
          "Guided tours, excursions, and activity booking",
          "Visa assistance documentation and guidance",
          "24/7 on-ground emergency support for active bookings",
          "Partner Resource Hub (destination guides, fact sheets, training materials)",
        ],
      },
      {
        type: "p",
        text: "PearlDMC reserves the right to modify, suspend, or discontinue any service or feature at any time with reasonable notice. We will endeavour to provide a minimum of 14 days' notice for material changes to services, except where changes are required to comply with legal obligations or address security concerns.",
      },
      {
        type: "highlight",
        text: "Net rates provided through the Partner Portal are strictly confidential and exclusively for B2B use. You must not display, share, or communicate our net rates to end consumers or third parties outside your agency.",
      },
    ],
  },
  {
    id: "bookings",
    icon: BookOpen,
    title: "Booking Terms & Conditions",
    content: [
      { type: "subheading", text: "Quotations & Confirmations" },
      {
        type: "p",
        text: "All quotations issued by PearlDMC are valid for 72 hours from the time of issuance, unless stated otherwise in writing. Prices quoted are subject to availability and may be revised prior to confirmation. A booking is only confirmed upon receipt of a written confirmation from PearlDMC and the deposit stipulated in the quotation.",
      },
      { type: "subheading", text: "Deposit & Payment" },
      {
        type: "list",
        items: [
          "A non-refundable deposit of 30% of the total booking value is required to confirm a booking",
          "The balance payment is due 45 days prior to the first travel date",
          "For bookings made within 45 days of travel, full payment is required at confirmation",
          "MICE and group bookings (20+ pax) are subject to custom payment schedules agreed at contracting stage",
          "All payments must be made in the invoiced currency (INR for Indian partners; USD for international)",
        ],
      },
      { type: "subheading", text: "Amendments" },
      {
        type: "p",
        text: "Minor amendments (date changes of ±3 days, room type upgrades, activity substitutions) requested before the balance due date are generally accommodated without additional fees, subject to supplier availability. Amendments may attract supplier fees which will be passed through at cost.",
      },
      { type: "subheading", text: "Cancellation Policy" },
      {
        type: "list",
        items: [
          "60+ days prior to travel: Full refund less the non-refundable deposit",
          "30–59 days prior to travel: 50% refund of total booking value",
          "15–29 days prior to travel: 25% refund of total booking value",
          "0–14 days prior to travel: No refund — 100% cancellation charge applies",
          "No-shows: No refund — full booking cost forfeited",
        ],
      },
      {
        type: "p",
        text: "Certain properties and peak season bookings may carry stricter cancellation terms, which will be disclosed in writing at time of quotation. Partner agencies are responsible for communicating these terms to their clients.",
      },
    ],
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Pricing, Currency & Invoicing",
    content: [
      {
        type: "p",
        text: "All prices quoted by PearlDMC are B2B net rates. Indian partners are invoiced in Indian Rupees (INR); international partners in United States Dollars (USD) unless explicitly stated otherwise. Net rates are exclusive of your agency's service fees, markups, and commissions, which you are free to apply at your own discretion.",
      },
      { type: "subheading", text: "Accepted Currencies" },
      {
        type: "p",
        text: "We accept INR, USD, EUR, GBP, AED, and SGD. Currency conversion is applied at the exchange rate prevailing on the invoice date. Currency risk between quotation and invoice date is borne by the partner agency.",
      },
      { type: "subheading", text: "Bank Charges & Transfer Fees" },
      {
        type: "p",
        text: "All bank transfer charges, SWIFT fees, and international wire costs are the responsibility of the partner agency. Payments received net of bank charges may be considered incomplete and require a top-up payment.",
      },
      {
        type: "highlight",
        text: "PearlDMC will never request payment to personal accounts or via unofficial channels. All invoices are issued on PearlDMC company letterhead with our official bank details. If in doubt, contact your account manager directly.",
      },
      { type: "subheading", text: "Credit Facilities" },
      {
        type: "p",
        text: "Monthly credit facilities may be extended to Platinum-tier partners at PearlDMC's sole discretion, subject to credit assessment. Credit terms, limits, and conditions are agreed separately in a Credit Facility Agreement and form part of these Terms.",
      },
    ],
  },
  {
    id: "liability",
    icon: Scale,
    title: "Liability & Indemnification",
    content: [
      {
        type: "p",
        text: "PearlDMC acts as a destination management company and facilitator of travel services provided by third-party suppliers including hotels, transport operators, tour guides, and activity providers. While we carefully vet all suppliers, we cannot be held liable for the acts, omissions, or defaults of independent suppliers.",
      },
      { type: "subheading", text: "Limitation of Liability" },
      {
        type: "p",
        text: "To the maximum extent permitted by applicable law, PearlDMC's total liability to a partner agency for any claim arising from or in connection with our services shall not exceed the total value of the booking to which the claim relates. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
      },
      { type: "subheading", text: "Force Majeure" },
      {
        type: "p",
        text: "PearlDMC shall not be liable for any failure or delay in performance of our obligations where such failure or delay results from circumstances beyond our reasonable control, including but not limited to: natural disasters, government travel restrictions, pandemics, civil unrest, acts of terrorism, or supplier insolvency.",
      },
      { type: "subheading", text: "Partner Indemnification" },
      {
        type: "p",
        text: "You agree to indemnify, defend, and hold harmless PearlDMC and its officers, directors, employees, and agents from any claims, liabilities, damages, costs, and expenses (including legal fees) arising from: (a) your use of our services; (b) your violation of these Terms; (c) your agency's misrepresentation of PearlDMC's services to clients; or (d) claims brought by your clients related to information you have provided to them.",
      },
    ],
  },
  {
    id: "confidentiality",
    icon: Lock,
    title: "Confidentiality & Data",
    content: [
      {
        type: "p",
        text: "Both parties agree to treat as strictly confidential all non-public information disclosed in connection with our partnership, including net rates, supplier contracts, operational procedures, and client information. This obligation survives the termination of the partnership.",
      },
      {
        type: "subheading",
        text: "Prohibited Uses of Confidential Information",
      },
      {
        type: "list",
        items: [
          "Sharing net rates or pricing structures with end consumers or competitors",
          "Using PearlDMC's supplier contacts to bypass our services and book directly",
          "Reproducing, distributing, or sublicensing our proprietary content without written consent",
          "Disclosing any non-public information about PearlDMC's operations to third parties",
        ],
      },
      { type: "subheading", text: "Data Protection" },
      {
        type: "p",
        text: "PearlDMC processes personal data in accordance with our Privacy Policy and the Digital Personal Data Protection Act, 2023 (India), which is incorporated into these Terms by reference. You are responsible for ensuring that any personal data of your clients shared with us is done so with appropriate consent and in compliance with applicable data protection laws.",
      },
      {
        type: "p",
        text: "You agree not to share login credentials for the Partner Portal with individuals outside your registered agency, and to notify us immediately if you suspect unauthorised access to your account.",
      },
    ],
  },
  {
    id: "prohibited",
    icon: Ban,
    title: "Prohibited Conduct",
    content: [
      {
        type: "p",
        text: "As a registered partner, you agree not to engage in any of the following prohibited activities in connection with your use of PearlDMC's services:",
      },
      {
        type: "list",
        items: [
          "Misrepresenting your agency's credentials, size, or licensing status during registration or in ongoing dealings",
          "Using PearlDMC's name, logo, or branding without prior written authorisation",
          "Attempting to circumvent our booking systems to contact suppliers directly for services covered by an active booking",
          "Engaging in fraudulent, deceptive, or misleading practices in relation to clients or PearlDMC",
          "Reverse engineering, scraping, or extracting data from the Partner Portal by automated means",
          "Subletting or reselling Partner Portal access to other agencies or individuals",
          "Using our services for any purpose prohibited by applicable law or regulation",
          "Facilitating bookings for individuals or entities subject to international sanctions",
        ],
      },
      {
        type: "p",
        text: "Violation of any prohibited conduct provisions may result in immediate suspension or termination of your partner account, forfeiture of any pending credits, and, where applicable, legal action to recover damages.",
      },
    ],
  },
  {
    id: "termination",
    icon: AlertTriangle,
    title: "Term, Suspension & Termination",
    content: [
      {
        type: "p",
        text: "These Terms apply from the date your partner registration is approved and continue until terminated by either party. Either party may terminate the partnership with 30 days' written notice, provided there are no pending or in-progress bookings.",
      },
      { type: "subheading", text: "Immediate Suspension" },
      {
        type: "p",
        text: "PearlDMC may suspend or terminate your partner account immediately and without prior notice if we determine, in our sole discretion, that you have: materially breached these Terms; engaged in fraudulent activity; failed to make payments when due; had your travel agency licence revoked or suspended; or caused reputational harm to PearlDMC.",
      },
      { type: "subheading", text: "Effect of Termination" },
      {
        type: "list",
        items: [
          "All pending bookings confirmed prior to termination will be honoured subject to full payment",
          "Access to the Partner Portal will be revoked on the termination date",
          "Confidentiality obligations and payment obligations survive termination indefinitely",
          "Any outstanding invoices become immediately due and payable upon termination",
        ],
      },
    ],
  },
  {
    id: "governing",
    icon: Scale,
    title: "Governing Law & Disputes",
    content: [
      {
        type: "p",
        text: "These Terms and any dispute or claim arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law provisions.",
      },
      {
        type: "p",
        text: "Any dispute arising from or related to these Terms that cannot be resolved amicably within 30 days of written notification shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996 (India). The arbitration shall be conducted under the rules of the Delhi International Arbitration Centre (DIAC) or Mumbai Centre for International Arbitration (MCIA), with the seat of arbitration in Mumbai, Maharashtra, and shall be conducted in English.",
      },
      {
        type: "p",
        text: "Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent actual or threatened infringement of intellectual property rights or breach of confidentiality obligations.",
      },
      {
        type: "highlight",
        text: "Nothing in these Terms limits your statutory rights as a business in your jurisdiction of registration. Some jurisdictions do not allow the exclusion of certain warranties or limitation of certain liabilities — in such cases, the applicable laws of your jurisdiction shall apply to the extent required.",
      },
    ],
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact & Legal Notices",
    content: [
      {
        type: "p",
        text: "For any questions regarding these Terms of Service, or to serve formal legal notices on PearlDMC, please contact us through the following channels:",
      },
      {
        type: "contact",
        items: [
          { label: "Legal & Compliance", value: "legal@pearldmc.com" },
          { label: "Partner Support", value: "partners@pearldmc.com" },
          {
            label: "Registered Address",
            value:
              "Level 12, Crescenzo Building, G Block BKC, Bandra Kurla Complex, Mumbai 400 051, Maharashtra, India",
          },
          {
            label: "Company Registration",
            value: "CIN: U63090MH2007PTC173XXX | GST: 27AXXXX0000X1ZX",
          },
        ],
      },
      {
        type: "p",
        text: "Legal notices sent by email are effective on the date sent, provided no delivery failure notification is received within 24 hours. Notices sent by registered post are effective 5 business days after posting to the registered address above.",
      },
    ],
  },
];

// ─── SectionContent ───────────────────────────────────────────────────────────

function SectionContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p
                key={i}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {block.text}
              </p>
            );

          case "subheading":
            return (
              <h4
                key={i}
                className="font-serif font-bold text-base text-foreground mt-6 mb-2"
              >
                {block.text}
              </h4>
            );

          case "list":
            return (
              <ul key={i} className="space-y-2 ml-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "highlight":
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-accent/[0.08] border border-accent/20 my-5"
              >
                <Info className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {block.text}
                </p>
              </div>
            );

          case "contact":
            return (
              <div key={i} className="grid sm:grid-cols-2 gap-3 my-4">
                {block.items.map((item, j) => (
                  <div
                    key={j}
                    className="p-4 rounded-xl bg-muted border border-border"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > 400);
      let current = sections[0].id;
      for (const s of sections) {
        const el = sectionRefs.current[s.id];
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string): void => {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-16 px-4 overflow-hidden bg-foreground">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 rounded-full blur-3xl opacity-10 pointer-events-none bg-accent" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.75 0.12 85) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-5 border border-accent/25 bg-accent/10 text-accent">
            <FileText className="w-3.5 h-3.5" />
            Legal Documents
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-card leading-tight mb-4 text-balance">
            Terms of <em className="text-accent not-italic">Service</em>
          </h1>
          <p className="text-card/55 text-base max-w-xl mx-auto leading-relaxed mb-8">
            These Terms govern the B2B partnership relationship between your
            agency and PearlDMC. Please read them carefully before using our
            services.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-card/40">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-accent/60" />
              Last updated: 1 January 2025
            </span>
            <span className="text-card/20">·</span>
            <span className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-accent/60" />
              Governed by Indian Law
            </span>
            <span className="text-card/20">·</span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-accent/60" />
              B2B Partners Only
            </span>
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS BAR ──────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-muted-foreground font-medium shrink-0">
              Also see:
            </span>
            <Link
              href="/privacy"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
            >
              <Lock className="w-3 h-3" /> Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
            >
              <Mail className="w-3 h-3" /> Contact Legal
            </Link>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all ml-auto">
              <Download className="w-3 h-3" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12 items-start">
          {/* ── STICKY TOC SIDEBAR ───────────────────────────────────────── */}
          <aside className="lg:sticky lg:top-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-1">
              Table of Contents
            </p>
            <nav className="space-y-0.5">
              {sections.map((s, i) => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group border ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground shadow-sm"
                        : "bg-transparent border-transparent hover:bg-card hover:border-border"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors text-xs font-bold ${
                        isActive
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-xs font-medium leading-tight flex-1 ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {s.title}
                    </span>
                    <ChevronRight
                      className={`w-3 h-3 shrink-0 transition-transform ${
                        isActive
                          ? "text-primary-foreground translate-x-0.5"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Quick contact */}
            <div className="mt-6 pt-5 border-t border-border">
              <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                <p className="font-serif font-bold text-sm text-foreground mb-1">
                  Legal Questions?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Our legal and compliance team responds within one business
                  day.
                </p>
                <Link
                  href="mailto:legal@pearldmc.com"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  Email Legal Team
                </Link>
              </div>
            </div>
          </aside>

          {/* ── CONTENT ──────────────────────────────────────────────────── */}
          <div className="space-y-2">
            {/* Preamble card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-foreground mb-2">
                    About These Terms
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These Terms of Service apply to all registered B2B partners
                    of Pearl Destination Management Company. They set out the
                    rules governing your use of our portal and services, your
                    rights and obligations as a partner, and the legal framework
                    for our relationship. These Terms should be read alongside
                    our{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  id={section.id}
                  ref={(el: HTMLDivElement | null) => {
                    sectionRefs.current[section.id] = el;
                  }}
                  className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden scroll-mt-24"
                >
                  <div className="flex items-center gap-4 px-7 py-5 border-b border-border bg-muted/30">
                    <span className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-secondary-foreground" />
                    </span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-0.5">
                        Section {idx + 1}
                      </p>
                      <h3 className="font-serif font-bold text-lg text-foreground leading-tight">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <div className="px-7 py-6">
                    <SectionContent content={section.content} />
                  </div>
                </div>
              );
            })}

            {/* Footer note */}
            <div className="bg-muted/50 rounded-2xl border border-border p-6 mt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-serif font-bold text-base text-foreground mb-2">
                    Acknowledgement
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    By registering as a B2B partner and using PearlDMC&apos;s
                    services, you acknowledge that you have read, understood,
                    and agree to these Terms of Service in full. If you have
                    questions or concerns about any provision, please contact
                    our legal team at{" "}
                    <a
                      href="mailto:legal@pearldmc.com"
                      className="text-primary hover:underline font-medium"
                    >
                      legal@pearldmc.com
                    </a>{" "}
                    before completing your registration.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 group"
                    >
                      Register as Partner
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                      href="/privacy"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-border text-foreground hover:border-primary/30 hover:bg-muted/50 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLL TO TOP ────────────────────────────────────────────────── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center bg-primary">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-primary-foreground/15 bg-primary-foreground/8 text-secondary">
            <Handshake className="w-3.5 h-3.5" />
            Ready to Partner?
          </div>
          <h2 className="font-serif text-3xl font-bold mb-4 text-primary-foreground text-balance">
            Agree to the terms? Let&apos;s get you started.
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-lg mx-auto text-primary-foreground/60">
            Register your agency today and gain access to exclusive B2B net
            rates across 10+ destinations. Approval within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase bg-background text-foreground hover:bg-background/90 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group"
            >
              Register as Partner
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl text-sm font-medium tracking-wide uppercase border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Legal Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
