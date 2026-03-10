"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Cookie,
  Shield,
  Lock,
  FileText,
  Mail,
  ChevronRight,
  ArrowUp,
  Globe,
  Info,
  CheckCircle,
  AlertCircle,
  CalendarDays,
  Download,
  ExternalLink,
  Handshake,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Eye,
  BarChart3,
  Megaphone,
  Settings,
  Zap,
  Server,
  Smartphone,
  Monitor,
  UserCheck,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// ─── Cookie categories config (for preference manager) ────────────────────────
const cookieCategories = [
  {
    id: "necessary",
    icon: Shield,
    name: "Strictly Necessary",
    desc: "Essential for the B2B portal to function. Cannot be disabled.",
    required: true,
    examples: [
      {
        name: "session_id",
        purpose: "Maintains your authenticated portal session",
        duration: "Session",
      },
      {
        name: "csrf_token",
        purpose: "Protects against cross-site request forgery attacks",
        duration: "Session",
      },
      {
        name: "lb_route",
        purpose: "Load balancer routing for consistent performance",
        duration: "Session",
      },
      {
        name: "cookie_consent",
        purpose: "Stores your cookie preferences",
        duration: "12 months",
      },
      {
        name: "auth_remember",
        purpose: "Keeps you signed in when 'Remember Me' is selected",
        duration: "30 days",
      },
    ],
  },
  {
    id: "functional",
    icon: Settings,
    name: "Functional",
    desc: "Remember your preferences to personalise your experience.",
    required: false,
    examples: [
      {
        name: "preferred_currency",
        purpose: "Remembers your preferred display currency (INR/USD/EUR)",
        duration: "6 months",
      },
      {
        name: "preferred_language",
        purpose: "Stores your language/locale selection",
        duration: "6 months",
      },
      {
        name: "portal_layout",
        purpose: "Saves your portal view preferences (grid/list)",
        duration: "6 months",
      },
      {
        name: "recent_searches",
        purpose: "Stores recently viewed destinations for quick access",
        duration: "30 days",
      },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    name: "Analytics",
    desc: "Help us understand how the portal is used so we can improve it.",
    required: false,
    examples: [
      {
        name: "_ga",
        purpose: "Google Analytics — distinguishes unique users (anonymised)",
        duration: "24 months",
      },
      {
        name: "_ga_[ID]",
        purpose: "Maintains analytics session state (anonymised IP)",
        duration: "24 months",
      },
      {
        name: "hotjar_session",
        purpose: "Heatmap analytics to improve portal usability (no PII)",
        duration: "Session",
      },
      {
        name: "perf_metrics",
        purpose: "First-party page load and feature usage metrics",
        duration: "3 months",
      },
    ],
  },
  {
    id: "marketing",
    icon: Megaphone,
    name: "Marketing",
    desc: "Track engagement with our newsletters and product announcements.",
    required: false,
    examples: [
      {
        name: "email_track",
        purpose: "Tracks open and click events in PearlDMC newsletters",
        duration: "6 months",
      },
      {
        name: "utm_source",
        purpose: "Records campaign source for attribution (first-party only)",
        duration: "30 days",
      },
      {
        name: "partner_ref",
        purpose: "Tracks referral source for partner registration attribution",
        duration: "30 days",
      },
    ],
  },
];

// ─── Page sections ─────────────────────────────────────────────────────────────
const sections = [
  {
    id: "what-are-cookies",
    icon: Cookie,
    title: "What Are Cookies?",
    content: [
      {
        type: "p",
        text: "Cookies are small text files placed on your device (computer, tablet, or mobile) by websites you visit. They are widely used to make websites work more efficiently, remember your preferences, and provide information to website owners about how their sites are being used.",
      },
      {
        type: "p",
        text: "Cookies do not contain executable code and cannot carry viruses. They cannot access other files on your device. A cookie can only be read by the server that placed it — PearlDMC cookies are only readable by PearlDMC.",
      },
      {
        type: "subheading",
        text: "Types of Cookies by Origin",
      },
      {
        type: "list",
        items: [
          "First-party cookies — Set directly by PearlDMC (pearldmc.com) for core functionality and analytics",
          "Third-party cookies — Set by external services we use (e.g., Google Analytics, Hotjar) under their own privacy policies",
        ],
      },
      {
        type: "subheading",
        text: "Types of Cookies by Duration",
      },
      {
        type: "list",
        items: [
          "Session cookies — Exist only while your browser is open and are automatically deleted when you close it",
          "Persistent cookies — Remain on your device for a set period or until you manually delete them",
        ],
      },
      {
        type: "highlight",
        text: "PearlDMC does not use cookies for advertising or behavioural targeting. We do not share cookie data with advertising networks, data brokers, or any third party for commercial purposes.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: Globe,
    title: "How We Use Cookies",
    content: [
      {
        type: "p",
        text: "PearlDMC uses cookies on our public website (pearldmc.com) and within the B2B Partner Portal. The cookies we use serve four distinct purposes, described in detail below and manageable via our Cookie Preference Centre.",
      },
      {
        type: "categories",
      },
    ],
  },
  {
    id: "third-party",
    icon: Server,
    title: "Third-Party Services",
    content: [
      {
        type: "p",
        text: "Some cookies on our website are placed by third-party services we use to deliver and improve our platform. These services operate under their own privacy policies and cookie policies, which we link to below.",
      },
      {
        type: "table",
        rows: [
          {
            service: "Google Analytics",
            purpose: "Web and portal usage analytics",
            policy: "policies.google.com/privacy",
            category: "Analytics",
          },
          {
            service: "Hotjar",
            purpose: "Heatmaps and usability session recording",
            policy: "hotjar.com/legal/privacy",
            category: "Analytics",
          },
          {
            service: "Razorpay",
            purpose: "Payment gateway (session only, no tracking)",
            policy: "razorpay.com/privacy",
            category: "Necessary",
          },
          {
            service: "Cloudflare",
            purpose: "DDoS protection, load balancing, CDN",
            policy: "cloudflare.com/privacypolicy",
            category: "Necessary",
          },
          {
            service: "SendGrid / Twilio",
            purpose: "Transactional email delivery tracking",
            policy: "twilio.com/en-us/legal/privacy",
            category: "Marketing",
          },
        ],
      },
      {
        type: "p",
        text: "We have configured all third-party analytics tools with IP anonymisation enabled and data retention set to the minimum required for their purpose. We do not permit third parties to use cookies placed on our site for their own independent marketing or analytics purposes.",
      },
      {
        type: "highlight",
        text: "We conduct periodic reviews of all third-party cookies to ensure they continue to meet our standards. If a service no longer meets our requirements, we remove it from our platform.",
      },
    ],
  },
  {
    id: "your-choices",
    icon: ToggleRight,
    title: "Your Cookie Choices",
    content: [
      {
        type: "p",
        text: "You have full control over non-essential cookies. When you first visit our website, you will be presented with our Cookie Consent Banner where you can accept all cookies, reject all non-essential cookies, or customise your preferences by category.",
      },
      {
        type: "subheading",
        text: "Cookie Preference Centre",
      },
      {
        type: "p",
        text: "You can revisit and update your cookie preferences at any time using the Cookie Preference Centre accessible from the footer of every page on our website. Changes take effect immediately for new cookies; you may need to refresh the page for all changes to apply.",
      },
      {
        type: "preferences",
      },
      {
        type: "subheading",
        text: "Browser-Level Controls",
      },
      {
        type: "p",
        text: "You can also manage cookies directly through your browser settings. Most browsers allow you to view, block, or delete cookies. Please note that blocking all cookies, including strictly necessary ones, will prevent the B2B portal from functioning correctly and you will not be able to log in.",
      },
      {
        type: "list",
        items: [
          "Google Chrome — Settings → Privacy and Security → Cookies and other site data",
          "Mozilla Firefox — Settings → Privacy & Security → Cookies and Site Data",
          "Safari (Mac/iOS) — Preferences → Privacy → Manage Website Data",
          "Microsoft Edge — Settings → Cookies and site permissions",
        ],
      },
      {
        type: "highlight",
        text: "Withdrawing consent for functional or analytics cookies will not affect the lawfulness of any processing based on consent given before withdrawal. Strictly necessary cookies cannot be disabled as they are required for the portal to operate.",
      },
    ],
  },
  {
    id: "devices",
    icon: Smartphone,
    title: "Cookies on Mobile Devices",
    content: [
      {
        type: "p",
        text: "The PearlDMC B2B Portal is optimised for use on desktop, tablet, and mobile browsers. Cookie behaviour on mobile devices is governed by the same principles described in this Policy.",
      },
      {
        type: "p",
        text: "If you access our portal through a mobile browser, cookies function identically to desktop. If you use a native mobile application (should one be released in the future), we will update this Policy to describe any additional tracking technologies such as device identifiers or local storage.",
      },
      {
        type: "p",
        text: "On iOS devices, Safari's Intelligent Tracking Prevention (ITP) may automatically restrict or expire certain third-party cookies. On Android, cookie behaviour depends on your chosen browser. We recommend reviewing your mobile browser's privacy settings.",
      },
    ],
  },
  {
    id: "retention",
    icon: CalendarDays,
    title: "Cookie Retention Periods",
    content: [
      {
        type: "p",
        text: "Each cookie we set has a defined maximum retention period appropriate to its purpose. The retention periods for all cookies used by PearlDMC are listed in the full cookie table in the 'How We Use Cookies' section above.",
      },
      {
        type: "p",
        text: "Session cookies are automatically deleted when you close your browser. Persistent cookies are deleted automatically upon expiry of their defined duration, or earlier if you delete them manually through your browser or our Cookie Preference Centre.",
      },
      {
        type: "highlight",
        text: "Your cookie consent preferences are themselves stored in a cookie (cookie_consent) valid for 12 months. If you clear all cookies from your browser, you will be asked for your preferences again on your next visit.",
      },
    ],
  },
  {
    id: "india-law",
    icon: Shield,
    title: "Compliance — India & International",
    content: [
      {
        type: "p",
        text: "PearlDMC's cookie practices are designed to comply with applicable law across our key markets. As an Indian company, our primary compliance framework is the Digital Personal Data Protection Act, 2023 (DPDP Act), under which cookies that process personal data require a valid consent or legitimate use basis.",
      },
      {
        type: "subheading",
        text: "India — DPDP Act 2023",
      },
      {
        type: "p",
        text: "Under the DPDP Act, we obtain free, specific, informed, and unambiguous consent before placing any non-essential cookies that process personal data. You may withdraw this consent at any time via the Cookie Preference Centre. We do not rely on 'legitimate interest' as a basis for marketing cookies.",
      },
      {
        type: "subheading",
        text: "EU/EEA — GDPR & ePrivacy Directive",
      },
      {
        type: "p",
        text: "For users accessing our website from the European Economic Area, we comply with the GDPR and the EU ePrivacy Directive (Cookie Law). We obtain prior opt-in consent for all non-essential cookies and provide granular category-level controls.",
      },
      {
        type: "subheading",
        text: "United Kingdom — UK GDPR & PECR",
      },
      {
        type: "p",
        text: "For UK users, we comply with the UK GDPR and the Privacy and Electronic Communications Regulations (PECR). Our consent mechanism satisfies the 'clear and positive action' requirement of PECR for non-essential cookies.",
      },
      {
        type: "subheading",
        text: "Other Jurisdictions",
      },
      {
        type: "p",
        text: "We apply the same consent standards globally regardless of local legal requirements, ensuring all partners receive a consistent and privacy-respecting experience.",
      },
    ],
  },
  {
    id: "updates",
    icon: RefreshCw,
    title: "Updates to This Policy",
    content: [
      {
        type: "p",
        text: "We review this Cookie Policy periodically and update it to reflect changes to the cookies we use, changes in applicable law, or improvements to our platform. The date of the most recent update is shown at the top of this page.",
      },
      {
        type: "p",
        text: "Where changes are material — for example, if we introduce a new category of cookies — we will notify registered partner agencies by email and display a notice on our website. We will request fresh consent where required by law.",
      },
      {
        type: "highlight",
        text: "This Cookie Policy was last updated on 1 January 2025. It forms part of our Privacy Policy and should be read alongside our Terms of Service.",
      },
    ],
  },
  {
    id: "contact",
    icon: Mail,
    title: "Questions & Contact",
    content: [
      {
        type: "p",
        text: "If you have any questions about how PearlDMC uses cookies, or if you wish to exercise your data rights in relation to data collected through cookies, please contact our Data Protection Officer:",
      },
      {
        type: "contact",
        items: [
          { label: "Data Protection Officer", value: "privacy@pearldmc.com" },
          { label: "General Privacy Queries", value: "privacy@pearldmc.com" },
          {
            label: "Postal Address",
            value:
              "DPO, PearlDMC, Level 12, Crescenzo Building, G Block BKC, Bandra Kurla Complex, Mumbai 400 051, India",
          },
          {
            label: "Response Timeframe",
            value:
              "5 business days for acknowledgement; 30 days for full response",
          },
        ],
      },
      {
        type: "p",
        text: "For complaints about our use of cookies, you may also contact the Data Protection Board of India (once constituted under the DPDP Act, 2023), or your relevant national supervisory authority.",
      },
    ],
  },
];

// ─── Reusable content renderer ────────────────────────────────────────────────
function SectionContent({
  content,
  preferences,
  setPreferences,
}: {
  content: any[];
  preferences: Record<string, boolean>;
  setPreferences: (p: Record<string, boolean>) => void;
}) {
  const toggle = (id: string) => {
    if (id === "necessary") return;
    setPreferences({ ...preferences, [id]: !preferences[id] });
  };

  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        if (block.type === "p") {
          return (
            <p
              key={i}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {block.text}
            </p>
          );
        }
        if (block.type === "subheading") {
          return (
            <h4
              key={i}
              className="font-serif font-bold text-base text-foreground mt-6 mb-2"
            >
              {block.text}
            </h4>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2 ml-1">
              {block.items.map((item: string, j: number) => (
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
        }
        if (block.type === "highlight") {
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-accent/8 border border-accent/20 my-5"
            >
              <Info className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <p className="text-sm text-foreground leading-relaxed font-medium">
                {block.text}
              </p>
            </div>
          );
        }
        if (block.type === "contact") {
          return (
            <div key={i} className="grid sm:grid-cols-2 gap-3 my-4">
              {block.items.map(
                (item: { label: string; value: string }, j: number) => (
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
                ),
              )}
            </div>
          );
        }
        if (block.type === "table") {
          return (
            <div
              key={i}
              className="overflow-x-auto rounded-xl border border-border my-4"
            >
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Service
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Purpose
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Policy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row: any, j: number) => (
                    <tr
                      key={j}
                      className={`border-b border-border last:border-b-0 ${j % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {row.service}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                        {row.purpose}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full border ${
                            row.category === "Necessary"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : row.category === "Analytics"
                                ? "bg-accent/10 text-accent border-accent/20"
                                : row.category === "Marketing"
                                  ? "bg-orange-50 text-orange-600 border-orange-200"
                                  : "bg-muted text-muted-foreground border-border"
                          }`}
                        >
                          {row.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://${row.policy}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline text-xs"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // ── Cookie category cards ────────────────────────────────────────
        if (block.type === "categories") {
          return (
            <div key={i} className="space-y-4 my-2">
              {cookieCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="bg-card rounded-2xl border border-border overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {cat.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cat.desc}
                          </p>
                        </div>
                      </div>
                      {cat.required ? (
                        <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          Always On
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground/60 font-medium shrink-0 italic">
                          Managed in Preference Centre ↓
                        </span>
                      )}
                    </div>
                    {/* Cookie list */}
                    <div className="divide-y divide-border">
                      {cat.examples.map((ex, ei) => (
                        <div
                          key={ei}
                          className="px-5 py-3 grid grid-cols-[1fr_auto] gap-3 items-center"
                        >
                          <div>
                            <p className="text-xs font-mono font-semibold text-foreground mb-0.5">
                              {ex.name}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {ex.purpose}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground bg-muted border border-border rounded-lg px-2 py-1 shrink-0 whitespace-nowrap">
                            {ex.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // ── Cookie preference toggles ────────────────────────────────────
        if (block.type === "preferences") {
          return (
            <div
              key={i}
              className="my-5 bg-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-border bg-muted/30">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Cookie Preference Centre
                </p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  Your preferences are saved automatically when toggled.
                </p>
              </div>
              <div className="divide-y divide-border">
                {cookieCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isOn = cat.required || preferences[cat.id];
                  return (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between gap-4 px-5 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isOn ? "bg-primary/10" : "bg-muted"}`}
                        >
                          <Icon
                            className={`w-4 h-4 ${isOn ? "text-primary" : "text-muted-foreground/50"}`}
                          />
                        </div>
                        <div>
                          <p
                            className={`text-sm font-semibold ${isOn ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {cat.name}
                          </p>
                          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-sm">
                            {cat.desc}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggle(cat.id)}
                        disabled={cat.required}
                        aria-label={`Toggle ${cat.name} cookies`}
                        className={`shrink-0 relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                          isOn ? "bg-primary" : "bg-border"
                        } ${cat.required ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-all duration-200 ${isOn ? "left-5" : "left-0.5"}`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3 flex-wrap">
                <p className="text-xs text-muted-foreground/60">
                  Changes saved automatically.{" "}
                  <span className="text-primary">Refresh the page</span> to
                  apply all updates.
                </p>
                <button
                  onClick={() =>
                    setPreferences({
                      necessary: true,
                      functional: false,
                      analytics: false,
                      marketing: false,
                    })
                  }
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Reject all non-essential
                </button>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CookiesPage() {
  const [activeSection, setActiveSection] = useState("what-are-cookies");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
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

  // Auto-save feedback when preferences change
  useEffect(() => {
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(t);
  }, [preferences]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
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
            <Cookie className="w-3.5 h-3.5" />
            Legal Documents
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-card leading-tight mb-4 text-balance">
            Cookie <em className="text-accent not-italic">Policy</em>
          </h1>
          <p className="text-card/55 text-base max-w-xl mx-auto leading-relaxed mb-8">
            We use cookies to keep the portal secure, remember your preferences,
            and understand how you use our services. Here's exactly what we use
            and why.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-card/40">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-accent/60" />
              Last updated: 1 January 2025
            </span>
            <span className="text-card/20">·</span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-accent/60" />
              DPDP Act 2023 · GDPR · PECR
            </span>
            <span className="text-card/20">·</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent/60" />
              No Advertising Cookies
            </span>
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ──────────────────────────────────────────────────── */}
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
              href="/terms"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
            >
              <FileText className="w-3 h-3" /> Terms of Service
            </Link>
            <a
              href="mailto:privacy@pearldmc.com"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
            >
              <UserCheck className="w-3 h-3" /> Cookie Rights Request
            </a>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all ml-auto">
              <Download className="w-3 h-3" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── AT A GLANCE ──────────────────────────────────────────────────── */}
      <div className="bg-muted/50 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Cookies at a Glance
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                icon: Shield,
                color: "primary",
                label: "Strictly Necessary",
                count: "5 cookies",
                note: "Cannot be disabled",
              },
              {
                icon: Settings,
                color: "accent",
                label: "Functional",
                count: "4 cookies",
                note: "Optional — on by default",
              },
              {
                icon: BarChart3,
                color: "accent",
                label: "Analytics",
                count: "4 cookies",
                note: "Optional — on by default",
              },
              {
                icon: Megaphone,
                color: "orange",
                label: "Marketing",
                count: "3 cookies",
                note: "Optional — off by default",
              },
            ].map(({ icon: Icon, color, label, count, note }) => (
              <div
                key={label}
                className="flex items-start gap-3 bg-card rounded-xl border border-border p-4"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    color === "primary"
                      ? "bg-primary/10"
                      : color === "orange"
                        ? "bg-orange-50"
                        : "bg-accent/10"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      color === "primary"
                        ? "text-primary"
                        : color === "orange"
                          ? "text-orange-500"
                          : "text-accent"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    {label}
                  </p>
                  <p className="text-xs font-bold text-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12 items-start">
          {/* ── STICKY TOC ───────────────────────────────────────────────── */}
          <aside className="lg:sticky lg:top-8 space-y-1">
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
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
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

            {/* Preference saved indicator */}
            <div
              className={`mt-5 flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all duration-300 ${
                saved
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-border bg-muted/40 text-muted-foreground"
              }`}
            >
              <CheckCircle className="w-4 h-4 shrink-0" />
              <p className="text-xs font-medium">
                {saved ? "Preferences saved!" : "Preferences up to date"}
              </p>
            </div>

            {/* DPO Card */}
            <div className="mt-3 bg-card rounded-2xl border border-border p-4 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Cookie className="w-4 h-4 text-primary" />
              </div>
              <p className="font-serif font-bold text-sm text-foreground mb-1">
                Cookie Questions?
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Contact our DPO for any cookie-related enquiries or data rights
                requests.
              </p>
              <a
                href="mailto:privacy@pearldmc.com"
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-3 h-3" />
                Email DPO
              </a>
            </div>
          </aside>

          {/* ── CONTENT ──────────────────────────────────────────────────── */}
          <div className="space-y-2">
            {/* Intro card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-foreground mb-2">
                    About This Policy
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This Cookie Policy explains how PearlDMC uses cookies and
                    similar tracking technologies on our website and B2B Partner
                    Portal. It forms part of our{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and should be read alongside our{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>
                    . You can manage your preferences at any time using the
                    Cookie Preference Centre in the 'Your Cookie Choices'
                    section below.
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
                  ref={(el) => {
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
                    <SectionContent
                      content={section.content}
                      preferences={preferences}
                      setPreferences={setPreferences}
                    />
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
                    Your Choices Matter
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You can update your cookie preferences at any time using the
                    Preference Centre above, or by contacting our DPO at{" "}
                    <a
                      href="mailto:privacy@pearldmc.com"
                      className="text-primary hover:underline font-medium"
                    >
                      privacy@pearldmc.com
                    </a>
                    . Blocking non-essential cookies will not affect your access
                    to the B2B Portal or the quality of our services.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Link
                      href="/privacy"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 group"
                    >
                      <Lock className="w-4 h-4" />
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-border text-foreground hover:border-primary/30 hover:bg-muted/50 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Terms of Service
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
            Transparent by Design
          </div>
          <h2 className="font-serif text-3xl font-bold mb-4 text-primary-foreground text-balance">
            We only use what we need
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-lg mx-auto text-primary-foreground/60">
            No advertising networks. No data brokers. No cross-site tracking.
            Just the cookies needed to keep the portal secure and your
            experience smooth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase bg-background text-foreground hover:bg-background/90 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group"
            >
              Register as Partner
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="mailto:privacy@pearldmc.com"
              className="px-8 py-4 rounded-xl text-sm font-medium tracking-wide uppercase border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact DPO
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
