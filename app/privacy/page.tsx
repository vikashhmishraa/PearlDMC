// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import {
//   Shield,
//   Lock,
//   Eye,
//   Database,
//   Globe,
//   Mail,
//   FileText,
//   ChevronRight,
//   ArrowUp,
//   Users,
//   Server,
//   RefreshCw,
//   AlertCircle,
//   CheckCircle,
//   Handshake,
//   Download,
//   CalendarDays,
//   Phone,
//   Info,
//   UserCheck,
//   Trash2,
//   Share2,
//   Cookie,
//   BarChart3,
//   ExternalLink,
//   Bell,
// } from "lucide-react";
// import { Header } from "@/components/header";
// import { Footer } from "@/components/footer";

// // ─── Sections ────────────────────────────────────────────────────────────────
// const sections = [
//   {
//     id: "overview",
//     icon: Shield,
//     title: "Overview & Commitment",
//     content: [
//       {
//         type: "p",
//         text: 'Pearl Destination Management Company ("PearlDMC", "we", "us", or "our") is committed to protecting the privacy and personal data of our B2B partners, their employees, and the end travellers whose data we process on their behalf. This Privacy Policy explains how we collect, use, store, share, and protect personal data in connection with our services, website, and B2B Partner Portal.',
//       },
//       {
//         type: "p",
//         text: "This Policy applies to all individuals whose data PearlDMC processes, including: registered partner agency contacts, individual users of the B2B portal, and travellers whose personal information is shared with us by partner agencies to facilitate bookings.",
//       },
//       {
//         type: "highlight",
//         text: "PearlDMC operates as both a Data Controller (for partner registration and portal data) and a Data Processor (for traveller data shared by partner agencies to fulfil bookings). Our obligations differ in each capacity and are set out clearly in this Policy.",
//       },
//       {
//         type: "p",
//         text: "We comply with applicable data protection laws including the Philippine Data Privacy Act of 2012 (Republic Act No. 10173), the European Union General Data Protection Regulation (GDPR) for data subjects in the EEA, the UK GDPR for UK data subjects, and other applicable national privacy frameworks.",
//       },
//     ],
//   },
//   {
//     id: "data-we-collect",
//     icon: Database,
//     title: "Data We Collect",
//     content: [
//       {
//         type: "subheading",
//         text: "Partner Registration & Account Data",
//       },
//       {
//         type: "p",
//         text: "When you register as a B2B partner, we collect the following information about your agency and its designated contact persons:",
//       },
//       {
//         type: "list",
//         items: [
//           "Agency name, registered address, country, city, and website",
//           "Agency type, trade membership details, and IATA or ABTA number",
//           "Full name, job title, business email address, and phone number of the contact person",
//           "WhatsApp or mobile number (optional, for operational communication)",
//           "Annual booking volume range and typical group size",
//           "Destinations of interest and how you heard about PearlDMC",
//           "Portal login credentials (password stored in hashed, salted form — never in plain text)",
//         ],
//       },
//       {
//         type: "subheading",
//         text: "Booking & Traveller Data",
//       },
//       {
//         type: "p",
//         text: "When partner agencies submit bookings or quotation requests, we process personal data of the travellers to be served. This data is shared with us by you as the partner agency and may include:",
//       },
//       {
//         type: "list",
//         items: [
//           "Traveller full names as they appear on passports",
//           "Nationality, date of birth, and passport number (where required for visa processing or hotel check-in)",
//           "Dietary requirements, medical conditions, or accessibility needs relevant to the travel arrangements",
//           "Flight details and travel dates",
//           "Emergency contact information",
//           "Special occasion details (e.g., honeymoon, anniversary) where disclosed for service personalisation",
//         ],
//       },
//       {
//         type: "subheading",
//         text: "Technical & Usage Data",
//       },
//       {
//         type: "list",
//         items: [
//           "IP address, browser type, and device type when accessing our website or portal",
//           "Pages visited, time spent, and click behaviour for portal usability analytics",
//           "Login timestamps and session activity for security monitoring",
//           "Cookies and similar tracking technologies (see Cookie Policy section below)",
//         ],
//       },
//       {
//         type: "subheading",
//         text: "Communications Data",
//       },
//       {
//         type: "p",
//         text: "We retain records of communications between your agency and PearlDMC, including emails, inquiry forms, chat messages, and telephone call logs, to the extent required for service delivery, dispute resolution, and legal compliance.",
//       },
//     ],
//   },
//   {
//     id: "how-we-use",
//     icon: BarChart3,
//     title: "How We Use Your Data",
//     content: [
//       {
//         type: "p",
//         text: "PearlDMC processes personal data only for specific, legitimate purposes and only to the extent necessary for those purposes. We do not use personal data for automated decision-making or profiling that produces legal or similarly significant effects.",
//       },
//       {
//         type: "subheading",
//         text: "Partner Data — Purposes & Legal Bases",
//       },
//       {
//         type: "table",
//         rows: [
//           {
//             purpose: "Processing partner registration and account creation",
//             basis: "Contract performance",
//           },
//           {
//             purpose: "Providing access to the B2B Portal and net rate cards",
//             basis: "Contract performance",
//           },
//           {
//             purpose: "Sending booking confirmations, vouchers, and documents",
//             basis: "Contract performance",
//           },
//           {
//             purpose:
//               "Invoicing, payment processing, and financial record-keeping",
//             basis: "Legal obligation",
//           },
//           {
//             purpose: "Fraud prevention and account security monitoring",
//             basis: "Legitimate interests",
//           },
//           {
//             purpose: "Sending product updates, new destination announcements",
//             basis: "Consent (opt-in)",
//           },
//           {
//             purpose:
//               "Conducting partner satisfaction surveys and FAM trip invitations",
//             basis: "Legitimate interests",
//           },
//           {
//             purpose:
//               "Improving our portal and services through usage analytics",
//             basis: "Legitimate interests",
//           },
//         ],
//       },
//       {
//         type: "subheading",
//         text: "Traveller Data — Purposes & Legal Bases",
//       },
//       {
//         type: "list",
//         items: [
//           "Fulfilling hotel reservations, transfers, tours, and other booked services — Contract performance",
//           "Processing visa assistance requests and immigration documentation — Legal obligation / Contract",
//           "Providing on-ground emergency support during travel — Vital interests",
//           "Sharing with suppliers strictly necessary to fulfil the booking — Contract performance",
//         ],
//       },
//       {
//         type: "highlight",
//         text: "We do not sell, rent, or trade personal data to any third party for their own marketing or commercial purposes. This includes traveller data shared by partner agencies.",
//       },
//     ],
//   },
//   {
//     id: "sharing",
//     icon: Share2,
//     title: "Data Sharing & Third Parties",
//     content: [
//       {
//         type: "p",
//         text: "PearlDMC shares personal data with third parties only when strictly necessary and under appropriate contractual protections. We maintain a record of all third-party processors with whom we share data.",
//       },
//       {
//         type: "subheading",
//         text: "Categories of Recipients",
//       },
//       {
//         type: "list",
//         items: [
//           "Hotels, resorts, and accommodation providers — to fulfil room reservations (traveller names, check-in dates, special requests)",
//           "Ground transportation operators — to coordinate airport transfers and vehicle bookings (flight details, pax names)",
//           "Tour guides and activity operators — to deliver booked excursions (names, group size)",
//           "Visa processing authorities and government departments — where legally required for entry documentation",
//           "Payment processors and banking institutions — to process invoices and payments (financial data only)",
//           "Cloud infrastructure providers — to host and operate the B2B Portal securely",
//           "Email and communication service providers — to send booking confirmations and support messages",
//           "Legal and accounting advisors — under strict professional confidentiality obligations",
//         ],
//       },
//       {
//         type: "p",
//         text: "All third-party suppliers and processors engaged by PearlDMC are contractually required to process data only for the specified purpose, maintain appropriate technical and organisational security measures, and comply with applicable data protection laws.",
//       },
//       {
//         type: "subheading",
//         text: "International Data Transfers",
//       },
//       {
//         type: "p",
//         text: "As a global DMC operating across multiple regions, data may be transferred to countries outside your home jurisdiction. Where data is transferred outside the EEA or UK to countries without an adequacy decision, we rely on Standard Contractual Clauses (SCCs) or other approved transfer mechanisms. Transfers to the Philippines are subject to the Data Privacy Act 2012 and NPC guidelines.",
//       },
//     ],
//   },
//   {
//     id: "retention",
//     icon: Server,
//     title: "Data Retention",
//     content: [
//       {
//         type: "p",
//         text: "We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, to comply with legal obligations, and to resolve disputes or enforce agreements.",
//       },
//       {
//         type: "subheading",
//         text: "Retention Periods",
//       },
//       {
//         type: "list",
//         items: [
//           "Partner account and registration data: Duration of the active partnership plus 5 years after termination",
//           "Booking records and transaction data: 7 years from the date of travel (financial record-keeping requirement)",
//           "Traveller personal data: 2 years from the travel date, unless retained longer for legal or insurance purposes",
//           "Marketing communication preferences and opt-in records: Duration of consent plus 3 years",
//           "Security logs and access records: 12 months on a rolling basis",
//           "Correspondence and email records: 3 years from the date of last communication",
//           "Legal claims and dispute records: Until the claim is fully resolved plus applicable limitation period",
//         ],
//       },
//       {
//         type: "p",
//         text: "Upon expiry of the applicable retention period, personal data is securely deleted or anonymised. Anonymised data (which can no longer identify any individual) may be retained indefinitely for statistical and analytical purposes.",
//       },
//       {
//         type: "highlight",
//         text: "Partner agencies requesting early deletion of their data should note that some data must be retained to comply with financial, legal, and regulatory obligations and cannot be deleted on request.",
//       },
//     ],
//   },
//   {
//     id: "security",
//     icon: Lock,
//     title: "Security Measures",
//     content: [
//       {
//         type: "p",
//         text: "PearlDMC implements a comprehensive set of technical and organisational security measures to protect personal data against unauthorised access, loss, alteration, disclosure, or destruction.",
//       },
//       {
//         type: "subheading",
//         text: "Technical Safeguards",
//       },
//       {
//         type: "list",
//         items: [
//           "256-bit SSL/TLS encryption for all data transmitted between users and our portal",
//           "AES-256 encryption for sensitive data fields stored at rest",
//           "Bcrypt password hashing with individual salts — passwords are never stored in plain text",
//           "Multi-factor authentication (MFA) available and strongly recommended for all portal accounts",
//           "Regular penetration testing and vulnerability assessments by independent security firms",
//           "Automated intrusion detection and real-time security monitoring of portal infrastructure",
//           "Role-based access controls — staff access data only on a strict need-to-know basis",
//         ],
//       },
//       {
//         type: "subheading",
//         text: "Organisational Safeguards",
//       },
//       {
//         type: "list",
//         items: [
//           "Annual data protection training mandatory for all staff with access to personal data",
//           "Designated Data Protection Officer (DPO) responsible for compliance oversight",
//           "Data Processing Agreements (DPAs) in place with all third-party processors",
//           "Documented incident response procedures with 72-hour breach notification capability",
//           "Regular internal audits of data handling practices and access logs",
//         ],
//       },
//       {
//         type: "p",
//         text: "Despite our robust security measures, no system can guarantee absolute security. In the event of a data breach that poses a risk to your rights and freedoms, we will notify affected parties and relevant supervisory authorities within the timeframes required by applicable law.",
//       },
//     ],
//   },
//   {
//     id: "your-rights",
//     icon: UserCheck,
//     title: "Your Rights",
//     content: [
//       {
//         type: "p",
//         text: "Depending on your location and the applicable data protection law, you may have the following rights regarding your personal data held by PearlDMC. We will respond to all valid requests within 30 days, or within the shorter timeframe required by applicable law.",
//       },
//       {
//         type: "rights",
//         items: [
//           {
//             icon: "Eye",
//             title: "Right of Access",
//             desc: "Request a copy of the personal data we hold about you and information about how we process it.",
//           },
//           {
//             icon: "RefreshCw",
//             title: "Right to Rectification",
//             desc: "Request correction of inaccurate or incomplete personal data we hold about you.",
//           },
//           {
//             icon: "Trash2",
//             title: "Right to Erasure",
//             desc: "Request deletion of your personal data where it is no longer necessary for the purpose it was collected, subject to legal retention requirements.",
//           },
//           {
//             icon: "AlertCircle",
//             title: "Right to Restrict Processing",
//             desc: "Request that we limit how we use your data in certain circumstances, such as while a dispute is being resolved.",
//           },
//           {
//             icon: "Share2",
//             title: "Right to Data Portability",
//             desc: "Receive your personal data in a structured, machine-readable format and transfer it to another controller (applies to GDPR jurisdictions).",
//           },
//           {
//             icon: "Bell",
//             title: "Right to Object",
//             desc: "Object to processing based on legitimate interests or for direct marketing purposes. We will cease processing unless we have compelling legitimate grounds.",
//           },
//           {
//             icon: "CheckCircle",
//             title: "Right to Withdraw Consent",
//             desc: "Withdraw consent at any time for processing based on consent, without affecting the lawfulness of prior processing.",
//           },
//           {
//             icon: "Shield",
//             title: "Right to Lodge a Complaint",
//             desc: "Lodge a complaint with your national data protection authority if you believe we have not handled your data in accordance with applicable law.",
//           },
//         ],
//       },
//       {
//         type: "p",
//         text: "To exercise any of these rights, please submit a written request to privacy@pearldmc.com. We may need to verify your identity before processing your request. There is no charge for exercising your rights, though we may charge a reasonable fee for manifestly unfounded or excessive requests.",
//       },
//     ],
//   },
//   {
//     id: "cookies",
//     icon: Cookie,
//     title: "Cookies & Tracking",
//     content: [
//       {
//         type: "p",
//         text: "PearlDMC uses cookies and similar technologies on our website and B2B Portal to ensure proper functionality, improve user experience, and analyse usage patterns. A cookie is a small text file placed on your device by our website.",
//       },
//       {
//         type: "subheading",
//         text: "Types of Cookies We Use",
//       },
//       {
//         type: "list",
//         items: [
//           "Strictly Necessary Cookies — Required for the portal to function. These cannot be disabled (e.g., session authentication, CSRF protection tokens, load balancing)",
//           "Functional Cookies — Remember your preferences such as language, currency, and portal layout settings. These can be disabled but may affect functionality",
//           "Analytics Cookies — Collect anonymised data about how you use our portal to help us improve the experience. We use privacy-first analytics tools that do not track individuals across sites",
//           "Marketing Cookies — Only used if you have opted in to receive marketing communications. These track email open rates and link clicks in our newsletters",
//         ],
//       },
//       {
//         type: "p",
//         text: "You can manage your cookie preferences at any time through the Cookie Settings panel accessible from the footer of our website. Blocking strictly necessary cookies will prevent the portal from functioning correctly.",
//       },
//       {
//         type: "highlight",
//         text: "We do not use third-party advertising cookies or share browsing data with advertising networks. Our analytics are configured with IP anonymisation enabled and data retention set to a maximum of 14 months.",
//       },
//     ],
//   },
//   {
//     id: "children",
//     icon: Users,
//     title: "Children's Privacy",
//     content: [
//       {
//         type: "p",
//         text: "PearlDMC's B2B Portal and services are intended exclusively for travel industry professionals and are not directed at individuals under the age of 18. We do not knowingly collect personal data directly from children.",
//       },
//       {
//         type: "p",
//         text: "Where traveller bookings include minors, the personal data of those minors is shared with us by the partner agency acting as the responsible adult or legal guardian. Such data is processed solely for the purpose of fulfilling the travel arrangements and is subject to the same security standards as adult traveller data.",
//       },
//       {
//         type: "p",
//         text: "Partner agencies are responsible for ensuring they have appropriate parental or guardian consent before sharing minor traveller data with PearlDMC. If you become aware that a minor has directly submitted personal data to us, please contact privacy@pearldmc.com immediately.",
//       },
//     ],
//   },
//   {
//     id: "changes",
//     icon: RefreshCw,
//     title: "Changes to This Policy",
//     content: [
//       {
//         type: "p",
//         text: "PearlDMC reviews and updates this Privacy Policy periodically to reflect changes in our data processing activities, applicable law, or industry best practice. The most current version of this Policy is always available on this page.",
//       },
//       {
//         type: "p",
//         text: "We will notify registered partner agencies of material changes to this Policy by email to the registered contact address and/or via a prominent notice on the B2B Portal login page. We will provide at least 14 days' notice before material changes take effect.",
//       },
//       {
//         type: "p",
//         text: "Continued use of our services after the effective date of any changes constitutes your acceptance of the revised Policy. If you do not agree with the changes, you may close your partner account by notifying us in writing at partners@pearldmc.com.",
//       },
//       {
//         type: "highlight",
//         text: "This Privacy Policy was last updated on 1 January 2025 and replaces all previous versions. Previous versions are available on request from our Data Protection Officer.",
//       },
//     ],
//   },
//   {
//     id: "contact-dpo",
//     icon: Mail,
//     title: "Contact & Data Protection Officer",
//     content: [
//       {
//         type: "p",
//         text: "For all privacy-related enquiries, data subject rights requests, or concerns about how we handle your personal data, please contact our Data Protection Officer:",
//       },
//       {
//         type: "contact",
//         items: [
//           { label: "Data Protection Officer", value: "privacy@pearldmc.com" },
//           { label: "General Privacy Queries", value: "privacy@pearldmc.com" },
//           {
//             label: "Postal Address",
//             value:
//               "Data Protection Officer, PearlDMC, 32F Ayala Avenue Tower, Makati City, Metro Manila 1226, Philippines",
//           },
//           {
//             label: "Response Timeframe",
//             value:
//               "Within 5 business days for acknowledgement; 30 days for full response",
//           },
//         ],
//       },
//       {
//         type: "subheading",
//         text: "Supervisory Authorities",
//       },
//       {
//         type: "p",
//         text: "If you are based in the Philippines, you have the right to lodge a complaint with the National Privacy Commission (NPC) at privacy.gov.ph. If you are based in the EU or EEA, you may contact your national Data Protection Authority. UK-based partners may contact the Information Commissioner's Office (ICO) at ico.org.uk.",
//       },
//       {
//         type: "p",
//         text: "We encourage you to contact us first before escalating to a supervisory authority, as we are committed to resolving all privacy concerns promptly and fairly.",
//       },
//     ],
//   },
// ];

// // ─── Block renderers ──────────────────────────────────────────────────────────
// const rightIcons: Record<string, typeof Eye> = {
//   Eye,
//   RefreshCw,
//   Trash2,
//   AlertCircle,
//   Share2,
//   Bell,
//   CheckCircle,
//   Shield,
// };

// function SectionContent({ content }: { content: any[] }) {
//   return (
//     <div className="space-y-4">
//       {content.map((block, i) => {
//         if (block.type === "p") {
//           return (
//             <p
//               key={i}
//               className="text-sm text-muted-foreground leading-relaxed"
//             >
//               {block.text}
//             </p>
//           );
//         }
//         if (block.type === "subheading") {
//           return (
//             <h4
//               key={i}
//               className="font-serif font-bold text-base text-foreground mt-6 mb-2"
//             >
//               {block.text}
//             </h4>
//           );
//         }
//         if (block.type === "list") {
//           return (
//             <ul key={i} className="space-y-2 ml-1">
//               {block.items.map((item: string, j: number) => (
//                 <li
//                   key={j}
//                   className="flex items-start gap-3 text-sm text-muted-foreground"
//                 >
//                   <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
//                   <span className="leading-relaxed">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           );
//         }
//         if (block.type === "highlight") {
//           return (
//             <div
//               key={i}
//               className="flex items-start gap-3 p-4 rounded-xl bg-accent/8 border border-accent/20 my-5"
//             >
//               <Info className="w-4 h-4 text-accent mt-0.5 shrink-0" />
//               <p className="text-sm text-foreground leading-relaxed font-medium">
//                 {block.text}
//               </p>
//             </div>
//           );
//         }
//         if (block.type === "contact") {
//           return (
//             <div key={i} className="grid sm:grid-cols-2 gap-3 my-4">
//               {block.items.map(
//                 (item: { label: string; value: string }, j: number) => (
//                   <div
//                     key={j}
//                     className="p-4 rounded-xl bg-muted border border-border"
//                   >
//                     <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
//                       {item.label}
//                     </p>
//                     <p className="text-sm font-medium text-foreground leading-relaxed">
//                       {item.value}
//                     </p>
//                   </div>
//                 ),
//               )}
//             </div>
//           );
//         }
//         if (block.type === "table") {
//           return (
//             <div
//               key={i}
//               className="overflow-hidden rounded-xl border border-border my-4"
//             >
//               <div className="grid grid-cols-2 bg-muted px-4 py-2.5 border-b border-border">
//                 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
//                   Processing Purpose
//                 </p>
//                 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
//                   Legal Basis
//                 </p>
//               </div>
//               {block.rows.map(
//                 (row: { purpose: string; basis: string }, j: number) => (
//                   <div
//                     key={j}
//                     className={`grid grid-cols-2 px-4 py-3 gap-4 text-sm border-b border-border last:border-b-0 ${j % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
//                   >
//                     <p className="text-muted-foreground leading-relaxed">
//                       {row.purpose}
//                     </p>
//                     <p className="font-medium text-foreground">{row.basis}</p>
//                   </div>
//                 ),
//               )}
//             </div>
//           );
//         }
//         if (block.type === "rights") {
//           return (
//             <div key={i} className="grid sm:grid-cols-2 gap-3 my-4">
//               {block.items.map((right: any, j: number) => {
//                 const Icon = rightIcons[right.icon] ?? Shield;
//                 return (
//                   <div
//                     key={j}
//                     className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200"
//                   >
//                     <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
//                       <Icon className="w-4 h-4 text-primary" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-foreground mb-0.5">
//                         {right.title}
//                       </p>
//                       <p className="text-xs text-muted-foreground leading-relaxed">
//                         {right.desc}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function PrivacyPage() {
//   const [activeSection, setActiveSection] = useState("overview");
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 400);
//       let current = sections[0].id;
//       for (const s of sections) {
//         const el = sectionRefs.current[s.id];
//         if (el && el.getBoundingClientRect().top <= 120) current = s.id;
//       }
//       setActiveSection(current);
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollTo = (id: string) => {
//     const el = sectionRefs.current[id];
//     if (el) {
//       window.scrollTo({
//         top: el.getBoundingClientRect().top + window.scrollY - 100,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <main className="min-h-screen bg-background text-foreground">
//       <Header />

//       {/* ── HERO ─────────────────────────────────────────────────────────── */}
//       <section className="relative py-16 px-4 overflow-hidden bg-foreground">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 rounded-full blur-3xl opacity-10 pointer-events-none bg-accent" />
//         <div
//           className="absolute inset-0 opacity-[0.04] pointer-events-none"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle, oklch(0.75 0.12 85) 1px, transparent 1px)",
//             backgroundSize: "36px 36px",
//           }}
//         />
//         <div className="relative z-10 max-w-4xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-5 border border-accent/25 bg-accent/10 text-accent">
//             <Lock className="w-3.5 h-3.5" />
//             Legal Documents
//           </div>
//           <h1 className="font-serif text-4xl md:text-5xl font-bold text-card leading-tight mb-4 text-balance">
//             Privacy <em className="text-accent not-italic">Policy</em>
//           </h1>
//           <p className="text-card/55 text-base max-w-xl mx-auto leading-relaxed mb-8">
//             We are committed to protecting your data. This Policy explains
//             exactly what we collect, why we collect it, and how you can control
//             it.
//           </p>
//           <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-card/40">
//             <span className="flex items-center gap-1.5">
//               <CalendarDays className="w-3.5 h-3.5 text-accent/60" />
//               Last updated: 1 January 2025
//             </span>
//             <span className="text-card/20">·</span>
//             <span className="flex items-center gap-1.5">
//               <Globe className="w-3.5 h-3.5 text-accent/60" />
//               GDPR · UK GDPR · PH DPA 2012
//             </span>
//             <span className="text-card/20">·</span>
//             <span className="flex items-center gap-1.5">
//               <Shield className="w-3.5 h-3.5 text-accent/60" />
//               DPO Designated
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* ── QUICK LINKS BAR ──────────────────────────────────────────────── */}
//       <div className="bg-card border-b border-border">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <div className="flex items-center gap-2 flex-wrap text-xs">
//             <span className="text-muted-foreground font-medium shrink-0">
//               Also see:
//             </span>
//             <Link
//               href="/terms"
//               className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
//             >
//               <FileText className="w-3 h-3" /> Terms of Service
//             </Link>
//             <Link
//               href="/contact"
//               className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
//             >
//               <Mail className="w-3 h-3" /> Contact DPO
//             </Link>
//             <a
//               href="mailto:privacy@pearldmc.com"
//               className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
//             >
//               <UserCheck className="w-3 h-3" /> Exercise Your Rights
//             </a>
//             <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all ml-auto">
//               <Download className="w-3 h-3" /> Download PDF
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── AT A GLANCE STRIP ────────────────────────────────────────────── */}
//       <div className="bg-muted/50 border-b border-border">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
//           <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
//             Privacy at a Glance
//           </p>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
//             {[
//               {
//                 icon: Shield,
//                 title: "We don't sell your data",
//                 desc: "Personal data is never sold, rented, or shared with advertisers.",
//               },
//               {
//                 icon: Lock,
//                 title: "Encrypted & secure",
//                 desc: "256-bit SSL + AES-256 at rest. Passwords are hashed, never stored plain.",
//               },
//               {
//                 icon: UserCheck,
//                 title: "Your rights are respected",
//                 desc: "Access, rectify, erase, or port your data at any time on request.",
//               },
//               {
//                 icon: Globe,
//                 title: "Multi-jurisdiction compliant",
//                 desc: "GDPR, UK GDPR, and Philippine Data Privacy Act compliance.",
//               },
//             ].map(({ icon: Icon, title, desc }) => (
//               <div
//                 key={title}
//                 className="flex items-start gap-3 bg-card rounded-xl border border-border p-4"
//               >
//                 <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                   <Icon className="w-4 h-4 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold text-foreground mb-0.5">
//                     {title}
//                   </p>
//                   <p className="text-xs text-muted-foreground leading-relaxed">
//                     {desc}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN LAYOUT ──────────────────────────────────────────────────── */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
//         <div className="grid lg:grid-cols-[260px_1fr] gap-12 items-start">
//           {/* ── STICKY TOC ───────────────────────────────────────────────── */}
//           <aside className="lg:sticky lg:top-8 space-y-1">
//             <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-1">
//               Table of Contents
//             </p>
//             <nav className="space-y-0.5">
//               {sections.map((s, i) => {
//                 const Icon = s.icon;
//                 const isActive = activeSection === s.id;
//                 return (
//                   <button
//                     key={s.id}
//                     onClick={() => scrollTo(s.id)}
//                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group border ${
//                       isActive
//                         ? "bg-primary border-primary text-primary-foreground shadow-sm"
//                         : "bg-transparent border-transparent hover:bg-card hover:border-border"
//                     }`}
//                   >
//                     <span
//                       className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors text-xs font-bold ${
//                         isActive
//                           ? "bg-primary-foreground/15 text-primary-foreground"
//                           : "bg-muted text-muted-foreground"
//                       }`}
//                     >
//                       {i + 1}
//                     </span>
//                     <span
//                       className={`text-xs font-medium leading-tight flex-1 ${
//                         isActive
//                           ? "text-primary-foreground"
//                           : "text-muted-foreground group-hover:text-foreground"
//                       }`}
//                     >
//                       {s.title}
//                     </span>
//                     <ChevronRight
//                       className={`w-3 h-3 shrink-0 transition-transform ${
//                         isActive
//                           ? "text-primary-foreground translate-x-0.5"
//                           : "text-muted-foreground/30"
//                       }`}
//                     />
//                   </button>
//                 );
//               })}
//             </nav>

//             {/* DPO contact card */}
//             <div className="mt-6 pt-5 border-t border-border">
//               <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
//                 <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
//                   <Shield className="w-4 h-4 text-primary" />
//                 </div>
//                 <p className="font-serif font-bold text-sm text-foreground mb-1">
//                   Data Protection Officer
//                 </p>
//                 <p className="text-xs text-muted-foreground leading-relaxed mb-3">
//                   For rights requests and privacy concerns — responded to within
//                   5 business days.
//                 </p>
//                 <a
//                   href="mailto:privacy@pearldmc.com"
//                   className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
//                 >
//                   <Mail className="w-3 h-3" />
//                   Contact DPO
//                 </a>
//               </div>
//             </div>
//           </aside>

//           {/* ── CONTENT ──────────────────────────────────────────────────── */}
//           <div className="space-y-2">
//             {/* Intro card */}
//             <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-8">
//               <div className="flex items-start gap-4">
//                 <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
//                   <Lock className="w-5 h-5 text-primary" />
//                 </div>
//                 <div>
//                   <h2 className="font-serif font-bold text-lg text-foreground mb-2">
//                     Our Privacy Commitment
//                   </h2>
//                   <p className="text-sm text-muted-foreground leading-relaxed">
//                     This Privacy Policy applies to Pearl Destination Management
//                     Company and describes our practices for all personal data we
//                     collect through our website at pearldmc.com, the B2B Partner
//                     Portal, and in the course of providing destination
//                     management services. It should be read alongside our{" "}
//                     <Link
//                       href="/terms"
//                       className="text-primary hover:underline"
//                     >
//                       Terms of Service
//                     </Link>
//                     .
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Sections */}
//             {sections.map((section, idx) => {
//               const Icon = section.icon;
//               return (
//                 <div
//                   key={section.id}
//                   id={section.id}
//                   ref={(el) => {
//                     sectionRefs.current[section.id] = el;
//                   }}
//                   className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden scroll-mt-24"
//                 >
//                   <div className="flex items-center gap-4 px-7 py-5 border-b border-border bg-muted/30">
//                     <span className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
//                       <Icon className="w-5 h-5 text-secondary-foreground" />
//                     </span>
//                     <div className="flex-1">
//                       <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-0.5">
//                         Section {idx + 1}
//                       </p>
//                       <h3 className="font-serif font-bold text-lg text-foreground leading-tight">
//                         {section.title}
//                       </h3>
//                     </div>
//                   </div>
//                   <div className="px-7 py-6">
//                     <SectionContent content={section.content} />
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Footer acknowledgement */}
//             <div className="bg-muted/50 rounded-2xl border border-border p-6 mt-4">
//               <div className="flex items-start gap-3">
//                 <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
//                 <div>
//                   <p className="font-serif font-bold text-base text-foreground mb-2">
//                     Your Data, Your Rights
//                   </p>
//                   <p className="text-sm text-muted-foreground leading-relaxed">
//                     If you have questions about this Privacy Policy or wish to
//                     exercise any of your data protection rights, contact our
//                     Data Protection Officer at{" "}
//                     <a
//                       href="mailto:privacy@pearldmc.com"
//                       className="text-primary hover:underline font-medium"
//                     >
//                       privacy@pearldmc.com
//                     </a>
//                     . We respond to all privacy requests within 5 business days
//                     and fulfil valid requests within 30 days.
//                   </p>
//                   <div className="flex flex-wrap gap-3 mt-4">
//                     <a
//                       href="mailto:privacy@pearldmc.com"
//                       className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 group"
//                     >
//                       <UserCheck className="w-4 h-4" />
//                       Exercise Your Rights
//                     </a>
//                     <Link
//                       href="/terms"
//                       className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-border text-foreground hover:border-primary/30 hover:bg-muted/50 transition-all"
//                     >
//                       <ExternalLink className="w-3.5 h-3.5" />
//                       Terms of Service
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── SCROLL TO TOP ────────────────────────────────────────────────── */}
//       {showScrollTop && (
//         <button
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp className="w-4 h-4" />
//         </button>
//       )}

//       {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
//       <section className="py-16 px-4 text-center bg-primary">
//         <div className="max-w-2xl mx-auto">
//           <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-primary-foreground/15 bg-primary-foreground/8 text-secondary">
//             <Handshake className="w-3.5 h-3.5" />
//             Trusted B2B Partner
//           </div>
//           <h2 className="font-serif text-3xl font-bold mb-4 text-primary-foreground text-balance">
//             Your data is safe with PearlDMC
//           </h2>
//           <p className="text-base leading-relaxed mb-8 max-w-lg mx-auto text-primary-foreground/60">
//             We are committed to transparent, lawful data handling. Register as a
//             partner with confidence — your data is protected by
//             industry-standard security and your rights are always respected.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/register"
//               className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase bg-background text-foreground hover:bg-background/90 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group"
//             >
//               Register as Partner
//               <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//             </Link>
//             <a
//               href="mailto:privacy@pearldmc.com"
//               className="px-8 py-4 rounded-xl text-sm font-medium tracking-wide uppercase border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 transition-all inline-flex items-center justify-center gap-2"
//             >
//               <Mail className="w-4 h-4" />
//               Contact DPO
//             </a>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  Mail,
  FileText,
  ChevronRight,
  ArrowUp,
  Users,
  Server,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Handshake,
  Download,
  CalendarDays,
  Phone,
  Info,
  UserCheck,
  Trash2,
  Share2,
  Cookie,
  BarChart3,
  ExternalLink,
  Bell,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// ─── Sections ────────────────────────────────────────────────────────────────
const sections = [
  {
    id: "overview",
    icon: Shield,
    title: "Overview & Commitment",
    content: [
      {
        type: "p",
        text: 'Pearl Destination Management Company ("PearlDMC", "we", "us", or "our") is committed to protecting the privacy and personal data of our B2B partners, their employees, and the end travellers whose data we process on their behalf. This Privacy Policy explains how we collect, use, store, share, and protect personal data in connection with our services, website, and B2B Partner Portal.',
      },
      {
        type: "p",
        text: "This Policy applies to all individuals whose data PearlDMC processes, including: registered partner agency contacts, individual users of the B2B portal, and travellers whose personal information is shared with us by partner agencies to facilitate bookings.",
      },
      {
        type: "highlight",
        text: "PearlDMC operates as both a Data Controller (for partner registration and portal data) and a Data Processor (for traveller data shared by partner agencies to fulfil bookings). Our obligations differ in each capacity and are set out clearly in this Policy.",
      },
      {
        type: "p",
        text: "We comply with applicable data protection laws including the Digital Personal Data Protection Act, 2023 (India), the European Union General Data Protection Regulation (GDPR) for data subjects in the EEA, the UK GDPR for UK data subjects, and other applicable national privacy frameworks.",
      },
    ],
  },
  {
    id: "data-we-collect",
    icon: Database,
    title: "Data We Collect",
    content: [
      {
        type: "subheading",
        text: "Partner Registration & Account Data",
      },
      {
        type: "p",
        text: "When you register as a B2B partner, we collect the following information about your agency and its designated contact persons:",
      },
      {
        type: "list",
        items: [
          "Agency name, registered address, country, city, and website",
          "Agency type, trade membership details, and IATA or ABTA number",
          "Full name, job title, business email address, and phone number of the contact person",
          "WhatsApp or mobile number (optional, for operational communication)",
          "Annual booking volume range and typical group size",
          "Destinations of interest and how you heard about PearlDMC",
          "Portal login credentials (password stored in hashed, salted form — never in plain text)",
        ],
      },
      {
        type: "subheading",
        text: "Booking & Traveller Data",
      },
      {
        type: "p",
        text: "When partner agencies submit bookings or quotation requests, we process personal data of the travellers to be served. This data is shared with us by you as the partner agency and may include:",
      },
      {
        type: "list",
        items: [
          "Traveller full names as they appear on passports",
          "Nationality, date of birth, and passport number (where required for visa processing or hotel check-in)",
          "Dietary requirements, medical conditions, or accessibility needs relevant to the travel arrangements",
          "Flight details and travel dates",
          "Emergency contact information",
          "Special occasion details (e.g., honeymoon, anniversary) where disclosed for service personalisation",
        ],
      },
      {
        type: "subheading",
        text: "Technical & Usage Data",
      },
      {
        type: "list",
        items: [
          "IP address, browser type, and device type when accessing our website or portal",
          "Pages visited, time spent, and click behaviour for portal usability analytics",
          "Login timestamps and session activity for security monitoring",
          "Cookies and similar tracking technologies (see Cookie Policy section below)",
        ],
      },
      {
        type: "subheading",
        text: "Communications Data",
      },
      {
        type: "p",
        text: "We retain records of communications between your agency and PearlDMC, including emails, inquiry forms, chat messages, and telephone call logs, to the extent required for service delivery, dispute resolution, and legal compliance.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: BarChart3,
    title: "How We Use Your Data",
    content: [
      {
        type: "p",
        text: "PearlDMC processes personal data only for specific, legitimate purposes and only to the extent necessary for those purposes. We do not use personal data for automated decision-making or profiling that produces legal or similarly significant effects.",
      },
      {
        type: "subheading",
        text: "Partner Data — Purposes & Legal Bases",
      },
      {
        type: "table",
        rows: [
          {
            purpose: "Processing partner registration and account creation",
            basis: "Contract performance",
          },
          {
            purpose: "Providing access to the B2B Portal and net rate cards",
            basis: "Contract performance",
          },
          {
            purpose: "Sending booking confirmations, vouchers, and documents",
            basis: "Contract performance",
          },
          {
            purpose:
              "Invoicing, payment processing, and financial record-keeping",
            basis: "Legal obligation",
          },
          {
            purpose: "Fraud prevention and account security monitoring",
            basis: "Legitimate interests",
          },
          {
            purpose: "Sending product updates, new destination announcements",
            basis: "Consent (opt-in)",
          },
          {
            purpose:
              "Conducting partner satisfaction surveys and FAM trip invitations",
            basis: "Legitimate interests",
          },
          {
            purpose:
              "Improving our portal and services through usage analytics",
            basis: "Legitimate interests",
          },
        ],
      },
      {
        type: "subheading",
        text: "Traveller Data — Purposes & Legal Bases",
      },
      {
        type: "list",
        items: [
          "Fulfilling hotel reservations, transfers, tours, and other booked services — Contract performance",
          "Processing visa assistance requests and immigration documentation — Legal obligation / Contract",
          "Providing on-ground emergency support during travel — Vital interests",
          "Sharing with suppliers strictly necessary to fulfil the booking — Contract performance",
        ],
      },
      {
        type: "highlight",
        text: "We do not sell, rent, or trade personal data to any third party for their own marketing or commercial purposes. This includes traveller data shared by partner agencies.",
      },
    ],
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Data Sharing & Third Parties",
    content: [
      {
        type: "p",
        text: "PearlDMC shares personal data with third parties only when strictly necessary and under appropriate contractual protections. We maintain a record of all third-party processors with whom we share data.",
      },
      {
        type: "subheading",
        text: "Categories of Recipients",
      },
      {
        type: "list",
        items: [
          "Hotels, resorts, and accommodation providers — to fulfil room reservations (traveller names, check-in dates, special requests)",
          "Ground transportation operators — to coordinate airport transfers and vehicle bookings (flight details, pax names)",
          "Tour guides and activity operators — to deliver booked excursions (names, group size)",
          "Visa processing authorities and government departments — where legally required for entry documentation",
          "Payment processors and banking institutions — to process invoices and payments (financial data only)",
          "Cloud infrastructure providers — to host and operate the B2B Portal securely",
          "Email and communication service providers — to send booking confirmations and support messages",
          "Legal and accounting advisors — under strict professional confidentiality obligations",
        ],
      },
      {
        type: "p",
        text: "All third-party suppliers and processors engaged by PearlDMC are contractually required to process data only for the specified purpose, maintain appropriate technical and organisational security measures, and comply with applicable data protection laws.",
      },
      {
        type: "subheading",
        text: "International Data Transfers",
      },
      {
        type: "p",
        text: "As a global DMC operating across multiple regions, data may be transferred to countries outside your home jurisdiction. Where data is transferred outside the EEA or UK to countries without an adequacy decision, we rely on Standard Contractual Clauses (SCCs) or other approved transfer mechanisms. Transfers within India are governed by the Digital Personal Data Protection Act, 2023 and the rules issued by the Data Protection Board of India.",
      },
    ],
  },
  {
    id: "retention",
    icon: Server,
    title: "Data Retention",
    content: [
      {
        type: "p",
        text: "We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, to comply with legal obligations, and to resolve disputes or enforce agreements.",
      },
      {
        type: "subheading",
        text: "Retention Periods",
      },
      {
        type: "list",
        items: [
          "Partner account and registration data: Duration of the active partnership plus 5 years after termination",
          "Booking records and transaction data: 7 years from the date of travel (financial record-keeping requirement)",
          "Traveller personal data: 2 years from the travel date, unless retained longer for legal or insurance purposes",
          "Marketing communication preferences and opt-in records: Duration of consent plus 3 years",
          "Security logs and access records: 12 months on a rolling basis",
          "Correspondence and email records: 3 years from the date of last communication",
          "Legal claims and dispute records: Until the claim is fully resolved plus applicable limitation period",
        ],
      },
      {
        type: "p",
        text: "Upon expiry of the applicable retention period, personal data is securely deleted or anonymised. Anonymised data (which can no longer identify any individual) may be retained indefinitely for statistical and analytical purposes.",
      },
      {
        type: "highlight",
        text: "Partner agencies requesting early deletion of their data should note that some data must be retained to comply with financial, legal, and regulatory obligations and cannot be deleted on request.",
      },
    ],
  },
  {
    id: "security",
    icon: Lock,
    title: "Security Measures",
    content: [
      {
        type: "p",
        text: "PearlDMC implements a comprehensive set of technical and organisational security measures to protect personal data against unauthorised access, loss, alteration, disclosure, or destruction.",
      },
      {
        type: "subheading",
        text: "Technical Safeguards",
      },
      {
        type: "list",
        items: [
          "256-bit SSL/TLS encryption for all data transmitted between users and our portal",
          "AES-256 encryption for sensitive data fields stored at rest",
          "Bcrypt password hashing with individual salts — passwords are never stored in plain text",
          "Multi-factor authentication (MFA) available and strongly recommended for all portal accounts",
          "Regular penetration testing and vulnerability assessments by independent security firms",
          "Automated intrusion detection and real-time security monitoring of portal infrastructure",
          "Role-based access controls — staff access data only on a strict need-to-know basis",
        ],
      },
      {
        type: "subheading",
        text: "Organisational Safeguards",
      },
      {
        type: "list",
        items: [
          "Annual data protection training mandatory for all staff with access to personal data",
          "Designated Data Protection Officer (DPO) responsible for compliance oversight",
          "Data Processing Agreements (DPAs) in place with all third-party processors",
          "Documented incident response procedures with 72-hour breach notification capability",
          "Regular internal audits of data handling practices and access logs",
        ],
      },
      {
        type: "p",
        text: "Despite our robust security measures, no system can guarantee absolute security. In the event of a data breach that poses a risk to your rights and freedoms, we will notify affected parties and relevant supervisory authorities within the timeframes required by applicable law.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "Your Rights",
    content: [
      {
        type: "p",
        text: "Depending on your location and the applicable data protection law, you may have the following rights regarding your personal data held by PearlDMC. We will respond to all valid requests within 30 days, or within the shorter timeframe required by applicable law.",
      },
      {
        type: "rights",
        items: [
          {
            icon: "Eye",
            title: "Right of Access",
            desc: "Request a copy of the personal data we hold about you and information about how we process it.",
          },
          {
            icon: "RefreshCw",
            title: "Right to Rectification",
            desc: "Request correction of inaccurate or incomplete personal data we hold about you.",
          },
          {
            icon: "Trash2",
            title: "Right to Erasure",
            desc: "Request deletion of your personal data where it is no longer necessary for the purpose it was collected, subject to legal retention requirements.",
          },
          {
            icon: "AlertCircle",
            title: "Right to Restrict Processing",
            desc: "Request that we limit how we use your data in certain circumstances, such as while a dispute is being resolved.",
          },
          {
            icon: "Share2",
            title: "Right to Data Portability",
            desc: "Receive your personal data in a structured, machine-readable format and transfer it to another controller (applies to GDPR jurisdictions).",
          },
          {
            icon: "Bell",
            title: "Right to Object",
            desc: "Object to processing based on legitimate interests or for direct marketing purposes. We will cease processing unless we have compelling legitimate grounds.",
          },
          {
            icon: "CheckCircle",
            title: "Right to Withdraw Consent",
            desc: "Withdraw consent at any time for processing based on consent, without affecting the lawfulness of prior processing.",
          },
          {
            icon: "Shield",
            title: "Right to Lodge a Complaint",
            desc: "Lodge a complaint with your national data protection authority if you believe we have not handled your data in accordance with applicable law.",
          },
        ],
      },
      {
        type: "p",
        text: "To exercise any of these rights, please submit a written request to privacy@pearldmc.com. We may need to verify your identity before processing your request. There is no charge for exercising your rights, though we may charge a reasonable fee for manifestly unfounded or excessive requests.",
      },
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Tracking",
    content: [
      {
        type: "p",
        text: "PearlDMC uses cookies and similar technologies on our website and B2B Portal to ensure proper functionality, improve user experience, and analyse usage patterns. A cookie is a small text file placed on your device by our website.",
      },
      {
        type: "subheading",
        text: "Types of Cookies We Use",
      },
      {
        type: "list",
        items: [
          "Strictly Necessary Cookies — Required for the portal to function. These cannot be disabled (e.g., session authentication, CSRF protection tokens, load balancing)",
          "Functional Cookies — Remember your preferences such as language, currency, and portal layout settings. These can be disabled but may affect functionality",
          "Analytics Cookies — Collect anonymised data about how you use our portal to help us improve the experience. We use privacy-first analytics tools that do not track individuals across sites",
          "Marketing Cookies — Only used if you have opted in to receive marketing communications. These track email open rates and link clicks in our newsletters",
        ],
      },
      {
        type: "p",
        text: "You can manage your cookie preferences at any time through the Cookie Settings panel accessible from the footer of our website. Blocking strictly necessary cookies will prevent the portal from functioning correctly.",
      },
      {
        type: "highlight",
        text: "We do not use third-party advertising cookies or share browsing data with advertising networks. Our analytics are configured with IP anonymisation enabled and data retention set to a maximum of 14 months.",
      },
    ],
  },
  {
    id: "children",
    icon: Users,
    title: "Children's Privacy",
    content: [
      {
        type: "p",
        text: "PearlDMC's B2B Portal and services are intended exclusively for travel industry professionals and are not directed at individuals under the age of 18. We do not knowingly collect personal data directly from children.",
      },
      {
        type: "p",
        text: "Where traveller bookings include minors, the personal data of those minors is shared with us by the partner agency acting as the responsible adult or legal guardian. Such data is processed solely for the purpose of fulfilling the travel arrangements and is subject to the same security standards as adult traveller data.",
      },
      {
        type: "p",
        text: "Partner agencies are responsible for ensuring they have appropriate parental or guardian consent before sharing minor traveller data with PearlDMC. If you become aware that a minor has directly submitted personal data to us, please contact privacy@pearldmc.com immediately.",
      },
    ],
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Changes to This Policy",
    content: [
      {
        type: "p",
        text: "PearlDMC reviews and updates this Privacy Policy periodically to reflect changes in our data processing activities, applicable law, or industry best practice. The most current version of this Policy is always available on this page.",
      },
      {
        type: "p",
        text: "We will notify registered partner agencies of material changes to this Policy by email to the registered contact address and/or via a prominent notice on the B2B Portal login page. We will provide at least 14 days' notice before material changes take effect.",
      },
      {
        type: "p",
        text: "Continued use of our services after the effective date of any changes constitutes your acceptance of the revised Policy. If you do not agree with the changes, you may close your partner account by notifying us in writing at b2b@pearldmc.com.",
      },
      {
        type: "highlight",
        text: "This Privacy Policy was last updated on 1 January 2025 and replaces all previous versions. Previous versions are available on request from our Data Protection Officer.",
      },
    ],
  },
  {
    id: "contact-dpo",
    icon: Mail,
    title: "Contact & Data Protection Officer",
    content: [
      {
        type: "p",
        text: "For all privacy-related enquiries, data subject rights requests, or concerns about how we handle your personal data, please contact our Data Protection Officer:",
      },
      {
        type: "contact",
        items: [
          { label: "Data Protection Officer", value: "privacy@pearldmc.com" },
          { label: "General Privacy Queries", value: "privacy@pearldmc.com" },
          {
            label: "Postal Address",
            value:
              "Data Protection Officer, PearlDMC, Level 12, Crescenzo Building, G Block BKC, Bandra Kurla Complex, Mumbai 400 051, India",
          },
          {
            label: "Response Timeframe",
            value:
              "Within 5 business days for acknowledgement; 30 days for full response",
          },
        ],
      },
      {
        type: "subheading",
        text: "Supervisory Authorities",
      },
      {
        type: "p",
        text: "If you are based in India, you have the right to lodge a complaint with the Data Protection Board of India (DPBI) once it is constituted under the Digital Personal Data Protection Act, 2023. If you are based in the EU or EEA, you may contact your national Data Protection Authority. UK-based partners may contact the Information Commissioner's Office (ICO) at ico.org.uk.",
      },
      {
        type: "p",
        text: "We encourage you to contact us first before escalating to a supervisory authority, as we are committed to resolving all privacy concerns promptly and fairly.",
      },
    ],
  },
];

// ─── Block renderers ──────────────────────────────────────────────────────────
const rightIcons: Record<string, typeof Eye> = {
  Eye,
  RefreshCw,
  Trash2,
  AlertCircle,
  Share2,
  Bell,
  CheckCircle,
  Shield,
};

function SectionContent({ content }: { content: any[] }) {
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
              className="overflow-hidden rounded-xl border border-border my-4"
            >
              <div className="grid grid-cols-2 bg-muted px-4 py-2.5 border-b border-border">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Processing Purpose
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Legal Basis
                </p>
              </div>
              {block.rows.map(
                (row: { purpose: string; basis: string }, j: number) => (
                  <div
                    key={j}
                    className={`grid grid-cols-2 px-4 py-3 gap-4 text-sm border-b border-border last:border-b-0 ${j % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {row.purpose}
                    </p>
                    <p className="font-medium text-foreground">{row.basis}</p>
                  </div>
                ),
              )}
            </div>
          );
        }
        if (block.type === "rights") {
          return (
            <div key={i} className="grid sm:grid-cols-2 gap-3 my-4">
              {block.items.map((right: any, j: number) => {
                const Icon = rightIcons[right.icon] ?? Shield;
                return (
                  <div
                    key={j}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-0.5">
                        {right.title}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {right.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  const scrollTo = (id: string) => {
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
            <Lock className="w-3.5 h-3.5" />
            Legal Documents
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-card leading-tight mb-4 text-balance">
            Privacy <em className="text-accent not-italic">Policy</em>
          </h1>
          <p className="text-card/55 text-base max-w-xl mx-auto leading-relaxed mb-8">
            We are committed to protecting your data. This Policy explains
            exactly what we collect, why we collect it, and how you can control
            it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-card/40">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-accent/60" />
              Last updated: 1 January 2025
            </span>
            <span className="text-card/20">·</span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-accent/60" />
              GDPR · UK GDPR · India DPDP Act 2023
            </span>
            <span className="text-card/20">·</span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-accent/60" />
              DPO Designated
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
              href="/terms"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
            >
              <FileText className="w-3 h-3" /> Terms of Service
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
            >
              <Mail className="w-3 h-3" /> Contact DPO
            </Link>
            <a
              href="mailto:privacy@pearldmc.com"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
            >
              <UserCheck className="w-3 h-3" /> Exercise Your Rights
            </a>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all ml-auto">
              <Download className="w-3 h-3" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── AT A GLANCE STRIP ────────────────────────────────────────────── */}
      <div className="bg-muted/50 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Privacy at a Glance
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                icon: Shield,
                title: "We don't sell your data",
                desc: "Personal data is never sold, rented, or shared with advertisers.",
              },
              {
                icon: Lock,
                title: "Encrypted & secure",
                desc: "256-bit SSL + AES-256 at rest. Passwords are hashed, never stored plain.",
              },
              {
                icon: UserCheck,
                title: "Your rights are respected",
                desc: "Access, rectify, erase, or port your data at any time on request.",
              },
              {
                icon: Globe,
                title: "Multi-jurisdiction compliant",
                desc: "GDPR, UK GDPR, and India's Digital Personal Data Protection Act, 2023 compliance.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 bg-card rounded-xl border border-border p-4"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    {title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
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

            {/* DPO contact card */}
            <div className="mt-6 pt-5 border-t border-border">
              <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <p className="font-serif font-bold text-sm text-foreground mb-1">
                  Data Protection Officer
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  For rights requests and privacy concerns — responded to within
                  5 business days.
                </p>
                <a
                  href="mailto:privacy@pearldmc.com"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  Contact DPO
                </a>
              </div>
            </div>
          </aside>

          {/* ── CONTENT ──────────────────────────────────────────────────── */}
          <div className="space-y-2">
            {/* Intro card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-foreground mb-2">
                    Our Privacy Commitment
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This Privacy Policy applies to Pearl Destination Management
                    Company and describes our practices for all personal data we
                    collect through our website at pearldmc.com, the B2B Partner
                    Portal, and in the course of providing destination
                    management services. It should be read alongside our{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
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
                    <SectionContent content={section.content} />
                  </div>
                </div>
              );
            })}

            {/* Footer acknowledgement */}
            <div className="bg-muted/50 rounded-2xl border border-border p-6 mt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-serif font-bold text-base text-foreground mb-2">
                    Your Data, Your Rights
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If you have questions about this Privacy Policy or wish to
                    exercise any of your data protection rights, contact our
                    Data Protection Officer at{" "}
                    <a
                      href="mailto:privacy@pearldmc.com"
                      className="text-primary hover:underline font-medium"
                    >
                      privacy@pearldmc.com
                    </a>
                    . We respond to all privacy requests within 5 business days
                    and fulfil valid requests within 30 days.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <a
                      href="mailto:privacy@pearldmc.com"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 group"
                    >
                      <UserCheck className="w-4 h-4" />
                      Exercise Your Rights
                    </a>
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
            Trusted B2B Partner
          </div>
          <h2 className="font-serif text-3xl font-bold mb-4 text-primary-foreground text-balance">
            Your data is safe with PearlDMC
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-lg mx-auto text-primary-foreground/60">
            We are committed to transparent, lawful data handling. Register as a
            partner with confidence — your data is protected by
            industry-standard security and your rights are always respected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/agent/auth/signup"
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
