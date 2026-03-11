// // "use client";

// // import React, { useState } from "react";
// // import Link from "next/link";
// // import {
// //   MapPin,
// //   Calendar,
// //   Clock,
// //   DollarSign,
// //   CheckCircle,
// //   XCircle,
// //   Globe,
// //   Users,
// //   Plane,
// //   Star,
// //   ChevronDown,
// //   Send,
// //   ArrowRight,
// //   Compass,
// //   Shield,
// //   Download,
// //   Share2,
// //   Heart,
// //   Eye,
// //   ArrowLeft,
// //   Waves,
// //   Sun,
// //   Camera,
// //   Utensils,
// //   Fish,
// //   Mountain,
// //   Anchor,
// // } from "lucide-react";
// // import { Header } from "@/components/header";
// // import { Footer } from "@/components/footer";

// // // ─── Types ────────────────────────────────────────────────────────────────────

// // interface TourPackage {
// //   id: string;
// //   name: string;
// //   category:
// //     | "beach"
// //     | "adventure"
// //     | "cultural"
// //     | "luxury"
// //     | "honeymoon"
// //     | "group";
// //   duration: string;
// //   startingPrice: number;
// //   rating: number;
// //   description: string;
// //   highlights: string[];
// //   inclusions: string[];
// //   exclusions: string[];
// //   image: string;
// // }

// // interface InquiryState {
// //   open: boolean;
// //   packageName?: string;
// //   price?: number;
// // }

// // // ─── Category config ──────────────────────────────────────────────────────────

// // const categoryConfig: Record<
// //   string,
// //   { label: string; bg: string; text: string; dot: string }
// // > = {
// //   cultural: {
// //     label: "Cultural",
// //     bg: "bg-blue-50",
// //     text: "text-blue-700",
// //     dot: "bg-blue-500",
// //   },
// //   adventure: {
// //     label: "Adventure",
// //     bg: "bg-orange-50",
// //     text: "text-orange-700",
// //     dot: "bg-orange-500",
// //   },
// //   beach: {
// //     label: "Beach & Relax",
// //     bg: "bg-cyan-50",
// //     text: "text-cyan-700",
// //     dot: "bg-cyan-500",
// //   },
// //   luxury: {
// //     label: "Luxury",
// //     bg: "bg-amber-50",
// //     text: "text-amber-700",
// //     dot: "bg-amber-500",
// //   },
// //   honeymoon: {
// //     label: "Honeymoon",
// //     bg: "bg-pink-50",
// //     text: "text-pink-700",
// //     dot: "bg-pink-500",
// //   },
// //   group: {
// //     label: "Group/Family",
// //     bg: "bg-green-50",
// //     text: "text-green-700",
// //     dot: "bg-green-500",
// //   },
// // };

// // // ─── Destination data ─────────────────────────────────────────────────────────

// // const destination = {
// //   id: "philippines",
// //   name: "Philippines",
// //   country: "Republic of the Philippines",
// //   region: "asia-pacific" as const,
// //   tagline:
// //     "7,641 islands of paradise — pristine beaches, world-class diving & vibrant culture",
// //   description:
// //     "The Philippines is Southeast Asia's hidden crown jewel — an archipelago of more than 7,600 islands stretching across turquoise seas, each with its own distinct personality. From the chocolate hills of Bohol to the dramatic limestone karsts of Palawan, from the heritage streets of Vigan to the underground river of Puerto Princesa, the Philippines delivers extraordinary diversity in one destination. For Indian B2B partners, the Philippines offers a competitive visa-on-arrival policy, direct connectivity from Mumbai and Delhi, and exceptional value across all accommodation categories. Our Manila ground team has operated since 2007, providing partners with the deepest supplier relationships and most reliable on-ground support in the market.",
// //   heroImage: "/images/destinations/philippines-hero.jpg",
// //   bestTimeToVisit: "Nov – May",
// //   currency: "PHP (₱)",
// //   language: "Filipino, English",
// //   timezone: "PHT (UTC+8)",
// //   visaInfo: "Visa on arrival — 30 days, extendable",
// //   flightTime: "~5h from Mumbai",
// //   highlights: [
// //     "Palawan — World's Best Island 2024",
// //     "Tubbataha Reef — UNESCO World Heritage dive site",
// //     "Boracay White Beach — Asia's #1 beach",
// //     "Chocolate Hills of Bohol",
// //     "Intramuros — Spanish colonial walled city",
// //     "Puerto Princesa Underground River",
// //     "Whale shark encounters in Oslob",
// //     "Rice terraces of Banaue (UNESCO Heritage)",
// //     "Coron island-hopping & wreck diving",
// //     "Vibrant Manila food & nightlife scene",
// //   ],
// //   packages: [
// //     {
// //       id: "ph-palawan-explorer",
// //       name: "Palawan Island Explorer",
// //       category: "beach" as const,
// //       duration: "7 Nights / 8 Days",
// //       startingPrice: 850,
// //       rating: 4.9,
// //       description:
// //         "The ultimate Palawan circuit — Puerto Princesa Underground River, El Nido island-hopping, and Coron's crystal lagoons. This flagship itinerary consistently tops partner feedback with its seamless logistics and hand-picked properties.",
// //       highlights: [
// //         "Puerto Princesa Underground River UNESCO tour",
// //         "El Nido island-hopping Tours A, B & C",
// //         "Coron twin lagoon & Kayangan Lake",
// //         "Wreck diving at Barracuda Lake",
// //         "Private sunset dinner, El Nido clifftop",
// //       ],
// //       inclusions: [
// //         "Return economy airfare Manila–Puerto Princesa–El Nido–Coron",
// //         "7 nights accommodation (3★ to 4★ options available)",
// //         "All island-hopping tours with licensed guides",
// //         "Underground River permit & boat transfer",
// //         "All mentioned meals (breakfast daily, 2 dinners)",
// //         "Private airport transfers throughout",
// //         "Travel insurance coverage",
// //         "Dedicated 24/7 on-ground guide",
// //       ],
// //       exclusions: [
// //         "International airfare to/from Manila",
// //         "Personal expenses and tips",
// //         "Optional activities not in itinerary",
// //         "Alcoholic beverages",
// //       ],
// //       image: "/images/packages/palawan-explorer.jpg",
// //     },
// //     {
// //       id: "ph-boracay-luxury",
// //       name: "Boracay Luxury Escape",
// //       category: "luxury" as const,
// //       duration: "5 Nights / 6 Days",
// //       startingPrice: 1200,
// //       rating: 4.8,
// //       description:
// //         "An ultra-refined Boracay experience — private beachfront villa, sunset sailing, and curated dining at the island's most exclusive restaurants. Ideal for luxury FIT clients and honeymooners seeking the Caribbean of Asia.",
// //       highlights: [
// //         "5-star beachfront villa, Station 1",
// //         "Private sunset sailing aboard catamaran",
// //         "Paraw sailboat sunrise excursion",
// //         "Exclusive spa day at Mandala Spa",
// //         "Chef's table dinner experience",
// //       ],
// //       inclusions: [
// //         "5 nights luxury villa/resort (The Lind, Shangri-La, or Movenpick)",
// //         "Return flights Manila–Caticlan (Boracay gateway)",
// //         "All meals included (breakfast, lunch, dinner)",
// //         "Private motorised paraw sailboat experience",
// //         "Airport transfers in luxury vehicles",
// //         "Spa credit (₱5,000 per person)",
// //         "In-room welcome amenity for couples",
// //       ],
// //       exclusions: [
// //         "International airfare to/from Manila",
// //         "Alcoholic beverages beyond included package",
// //         "Optional motorised water sports",
// //         "Personal shopping",
// //       ],
// //       image: "/images/packages/boracay-luxury.jpg",
// //     },
// //     {
// //       id: "ph-bohol-adventure",
// //       name: "Bohol Nature & Adventure",
// //       category: "adventure" as const,
// //       duration: "4 Nights / 5 Days",
// //       startingPrice: 520,
// //       rating: 4.7,
// //       description:
// //         "Bohol's iconic Chocolate Hills, the world's smallest primate (Philippine tarsier), river cruises, and world-class snorkelling at Balicasag Island. A compact yet immensely rewarding itinerary that works brilliantly as a Manila add-on.",
// //       highlights: [
// //         "Chocolate Hills viewpoint sunrise",
// //         "Philippine tarsier sanctuary",
// //         "Loboc River floating lunch cruise",
// //         "Balicasag Island diving/snorkelling",
// //         "Panglao Beach sunset chill",
// //       ],
// //       inclusions: [
// //         "4 nights accommodation Tagbilaran/Panglao (3★)",
// //         "Return airfare Manila–Tagbilaran",
// //         "Guided Chocolate Hills & tarsier tour",
// //         "Loboc River cruise with lunch",
// //         "Balicasag Island snorkelling trip",
// //         "All mentioned meals",
// //         "Airport and hotel transfers",
// //       ],
// //       exclusions: [
// //         "International airfare",
// //         "Scuba diving (available as add-on)",
// //         "Personal expenses",
// //       ],
// //       image: "/images/packages/bohol-adventure.jpg",
// //     },
// //     {
// //       id: "ph-manila-cultural",
// //       name: "Manila Heritage & Culture Trail",
// //       category: "cultural" as const,
// //       duration: "3 Nights / 4 Days",
// //       startingPrice: 380,
// //       rating: 4.6,
// //       description:
// //         "A curated deep-dive into the Philippines' rich colonial and contemporary heritage — Intramuros walking tours, the Rizal Monument, BGC's street art, and day trips to Tagaytay and Taal Volcano. Perfect as a standalone city break or pre/post add-on.",
// //       highlights: [
// //         "Intramuros guided walking tour",
// //         "Fort Santiago & Rizal Shrine",
// //         "BGC street art & contemporary galleries",
// //         "Tagaytay Ridge & Taal Volcano day trip",
// //         "Filipino cuisine tasting journey",
// //       ],
// //       inclusions: [
// //         "3 nights 4★ hotel Manila (BGC or Makati)",
// //         "All guided tours with licensed heritage guide",
// //         "Tagaytay & Taal full-day tour with lunch",
// //         "Filipino food tasting dinner (5 restaurants)",
// //         "Daily breakfast",
// //         "Luxury air-conditioned transfers throughout",
// //       ],
// //       exclusions: [
// //         "International/domestic airfare",
// //         "Personal expenses",
// //         "Optional museum entrance fees",
// //       ],
// //       image: "/images/packages/manila-cultural.jpg",
// //     },
// //     {
// //       id: "ph-honeymoon-island",
// //       name: "Island Honeymoon Romance",
// //       category: "honeymoon" as const,
// //       duration: "8 Nights / 9 Days",
// //       startingPrice: 1650,
// //       rating: 4.9,
// //       description:
// //         "The Philippines' most romantic circuit — three islands, one seamless romantic journey. Manila arrival, Palawan for dramatic scenery, and a Boracay finale with white sand, sunsets, and five-star pampering. Exclusively curated for couples.",
// //       highlights: [
// //         "Couples' spa ritual, El Nido clifftop",
// //         "Private island picnic, Palawan lagoon",
// //         "Sunset sailing with champagne",
// //         "Overwater breakfast, Boracay",
// //         "His & hers villa butler service",
// //       ],
// //       inclusions: [
// //         "8 nights accommodation (4★–5★, sea-view rooms throughout)",
// //         "All domestic flights (Manila–Palawan–Boracay–Manila)",
// //         "Couples' spa treatment per destination",
// //         "Private island picnic (Palawan)",
// //         "All meals (breakfast daily, 4 romantic dinners)",
// //         "Honeymoon room decorations & welcome gifts",
// //         "Dedicated honeymoon concierge throughout",
// //         "All transfers in private vehicles",
// //       ],
// //       exclusions: [
// //         "International airfare",
// //         "Additional spa treatments beyond inclusions",
// //         "Personal shopping",
// //       ],
// //       image: "/images/packages/ph-honeymoon.jpg",
// //     },
// //     {
// //       id: "ph-group-family",
// //       name: "Philippines Family Island Hop",
// //       category: "group" as const,
// //       duration: "9 Nights / 10 Days",
// //       startingPrice: 720,
// //       rating: 4.7,
// //       description:
// //         "A perfectly paced family itinerary across Manila, Bohol, and Boracay — combining city sightseeing, wildlife encounters, island-hopping, and beach relaxation. Designed for groups of 8–40 pax with kid-friendly logistics throughout.",
// //       highlights: [
// //         "Manila city sightseeing & SM Mall of Asia",
// //         "Bohol Chocolate Hills & tarsier encounter",
// //         "Boracay White Beach & water activities",
// //         "Group island-hopping with barbecue lunch",
// //         "Snorkelling & banana boat fun",
// //       ],
// //       inclusions: [
// //         "9 nights accommodation (family rooms, 3★–4★)",
// //         "All domestic group airfares",
// //         "Group guided tours all destinations",
// //         "Family-friendly island-hopping with BBQ",
// //         "All meals (breakfast daily, 3 group dinners)",
// //         "Group airport transfers (coach)",
// //         "Dedicated group tour manager",
// //         "Group discount rates from 8 pax",
// //       ],
// //       exclusions: [
// //         "International airfares",
// //         "Optional water sports beyond inclusions",
// //         "Personal expenses",
// //       ],
// //       image: "/images/packages/ph-group-family.jpg",
// //     },
// //   ] as TourPackage[],
// // };

// // // ─── Package Card ─────────────────────────────────────────────────────────────

// // interface PackageCardProps {
// //   pkg: TourPackage;
// //   onInquiry: (name: string, price: number) => void;
// //   index: number;
// // }

// // function PackageCard({ pkg, onInquiry, index }: PackageCardProps) {
// //   const [showInclusions, setShowInclusions] = useState<boolean>(false);
// //   const [saved, setSaved] = useState<boolean>(false);
// //   const cat = categoryConfig[pkg.category] ?? categoryConfig.cultural;

// //   return (
// //     <div
// //       className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300"
// //       style={{ animationDelay: `${index * 80}ms` }}
// //     >
// //       <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr]">
// //         {/* ── Image placeholder ──────────────────────────────────────────── */}
// //         <div className="relative h-56 md:h-full min-h-[240px] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center">
// //           {/* Decorative pattern */}
// //           <div
// //             className="absolute inset-0 opacity-10"
// //             style={{
// //               backgroundImage:
// //                 "radial-gradient(circle, oklch(0.35 0.08 180) 1px, transparent 1px)",
// //               backgroundSize: "24px 24px",
// //             }}
// //           />
// //           <Compass className="w-16 h-16 text-primary/20" />

// //           {/* Category badge */}
// //           <div className="absolute top-3 left-3">
// //             <span
// //               className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 ${cat.bg} ${cat.text}`}
// //             >
// //               <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
// //               {cat.label}
// //             </span>
// //           </div>

// //           {/* Save button */}
// //           <button
// //             onClick={(e: React.MouseEvent) => {
// //               e.stopPropagation();
// //               setSaved(!saved);
// //             }}
// //             className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-background"
// //           >
// //             <Heart
// //               className={`w-4 h-4 transition-colors ${saved ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`}
// //             />
// //           </button>

// //           {/* Duration badge */}
// //           <div className="absolute bottom-3 left-3">
// //             <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm text-foreground">
// //               <Clock className="w-3 h-3 text-primary" />
// //               {pkg.duration}
// //             </span>
// //           </div>

// //           {/* Rating badge */}
// //           <div className="absolute bottom-3 right-3">
// //             <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm text-foreground">
// //               <Star className="w-3 h-3 fill-accent text-accent" />
// //               {pkg.rating}
// //             </span>
// //           </div>
// //         </div>

// //         {/* ── Content panel ──────────────────────────────────────────────── */}
// //         <div className="p-6 lg:p-7 flex flex-col">
// //           {/* Header row */}
// //           <div className="flex items-start justify-between gap-4 mb-4">
// //             <div className="flex-1 min-w-0">
// //               <h3 className="font-serif text-xl lg:text-2xl font-bold text-foreground mb-1.5 leading-tight">
// //                 {pkg.name}
// //               </h3>
// //               <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
// //                 <span className="flex items-center gap-1.5">
// //                   <Clock className="h-3.5 w-3.5 text-primary/60" />
// //                   {pkg.duration}
// //                 </span>
// //                 <span className="flex items-center gap-1.5">
// //                   <MapPin className="h-3.5 w-3.5 text-primary/60" />
// //                   Philippines
// //                 </span>
// //                 <span className="flex items-center gap-1">
// //                   <Star className="h-3.5 w-3.5 fill-accent text-accent" />
// //                   <span className="font-medium text-foreground">
// //                     {pkg.rating}
// //                   </span>
// //                   <span className="text-muted-foreground/60">/ 5</span>
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Price block */}
// //             <div className="shrink-0 text-right bg-muted rounded-xl px-4 py-3">
// //               <p className="text-xs text-muted-foreground font-medium mb-0.5">
// //                 Starting from
// //               </p>
// //               <p className="text-2xl font-bold text-primary leading-none">
// //                 ${pkg.startingPrice.toLocaleString()}
// //               </p>
// //               <p className="text-xs text-muted-foreground mt-0.5">per person</p>
// //             </div>
// //           </div>

// //           {/* Description */}
// //           <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
// //             {pkg.description}
// //           </p>

// //           {/* Highlights */}
// //           <div className="mb-4">
// //             <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
// //               Tour Highlights
// //             </p>
// //             <div className="flex flex-wrap gap-1.5">
// //               {pkg.highlights.slice(0, 5).map((h) => (
// //                 <span
// //                   key={h}
// //                   className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground border border-border/60 hover:border-primary/30 hover:text-foreground transition-colors"
// //                 >
// //                   {h}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Inclusions accordion */}
// //           <div className="border-t border-border pt-4 mt-auto">
// //             <button
// //               onClick={() => setShowInclusions(!showInclusions)}
// //               className="flex items-center justify-between w-full text-sm group/btn mb-0"
// //             >
// //               <span className="flex items-center gap-2 font-semibold text-foreground group-hover/btn:text-primary transition-colors">
// //                 <CheckCircle className="w-4 h-4 text-primary/60" />
// //                 Package Inclusions
// //                 <span className="text-xs font-normal text-muted-foreground">
// //                   ({pkg.inclusions.length} items)
// //                 </span>
// //               </span>
// //               <span
// //                 className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${showInclusions ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"}`}
// //               >
// //                 <ChevronDown className="w-3.5 h-3.5" />
// //               </span>
// //             </button>

// //             <div
// //               className="overflow-hidden transition-all duration-300 ease-in-out"
// //               style={{
// //                 maxHeight: showInclusions ? "400px" : "0px",
// //                 marginTop: showInclusions ? "12px" : "0px",
// //               }}
// //             >
// //               <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 pb-1">
// //                 {pkg.inclusions.map((inc) => (
// //                   <div key={inc} className="flex items-start gap-2">
// //                     <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
// //                     <span className="text-xs text-muted-foreground leading-relaxed">
// //                       {inc}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //               {pkg.exclusions.length > 0 && (
// //                 <div className="mt-3 pt-3 border-t border-border/60">
// //                   <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
// //                     Not Included
// //                   </p>
// //                   <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
// //                     {pkg.exclusions.map((exc) => (
// //                       <div key={exc} className="flex items-start gap-2">
// //                         <XCircle className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0 mt-0.5" />
// //                         <span className="text-xs text-muted-foreground/60 leading-relaxed">
// //                           {exc}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* CTA row */}
// //           <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-4 border-t border-border">
// //             <Link
// //               href={`/destinations/philippines/packages/${pkg.id}`}
// //               className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all group/link"
// //             >
// //               <Eye className="w-4 h-4 text-muted-foreground group-hover/link:text-primary transition-colors" />
// //               Full Itinerary
// //               <ArrowRight className="w-3.5 h-3.5 ml-auto text-muted-foreground/40 group-hover/link:translate-x-0.5 group-hover/link:text-primary transition-all" />
// //             </Link>
// //             <button
// //               onClick={() => onInquiry(pkg.name, pkg.startingPrice)}
// //               className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors group/send"
// //             >
// //               <Send className="h-4 w-4 group-hover/send:translate-x-0.5 transition-transform" />
// //               Send Inquiry
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Simple Inquiry Modal ─────────────────────────────────────────────────────

// // function InquiryModal({
// //   state,
// //   onClose,
// // }: {
// //   state: InquiryState;
// //   onClose: () => void;
// // }) {
// //   const [submitted, setSubmitted] = useState<boolean>(false);
// //   const [name, setName] = useState<string>("");
// //   const [email, setEmail] = useState<string>("");
// //   const [agency, setAgency] = useState<string>("");

// //   if (!state.open) return null;

// //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setSubmitted(true);
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
// //       <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md overflow-hidden">
// //         <div className="px-6 py-5 border-b border-border bg-muted/40 flex items-center justify-between">
// //           <div>
// //             <h3 className="font-serif font-bold text-lg text-foreground">
// //               Request B2B Rates
// //             </h3>
// //             <p className="text-xs text-muted-foreground mt-0.5">
// //               {state.packageName
// //                 ? `Re: ${state.packageName}`
// //                 : "Philippines — General Inquiry"}
// //             </p>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="w-8 h-8 rounded-full bg-muted hover:bg-border flex items-center justify-center text-muted-foreground transition-colors text-lg leading-none"
// //           >
// //             ×
// //           </button>
// //         </div>

// //         {submitted ? (
// //           <div className="px-6 py-12 text-center">
// //             <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
// //               <CheckCircle className="w-7 h-7 text-primary" />
// //             </div>
// //             <h4 className="font-serif font-bold text-xl text-foreground mb-2">
// //               Inquiry Received!
// //             </h4>
// //             <p className="text-sm text-muted-foreground leading-relaxed mb-6">
// //               Our Philippines specialist will respond within 4 business hours
// //               with B2B net rates.
// //             </p>
// //             <button
// //               onClick={onClose}
// //               className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         ) : (
// //           <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
// //             <div>
// //               <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
// //                 Full Name <span className="text-accent">*</span>
// //               </label>
// //               <input
// //                 type="text"
// //                 value={name}
// //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                   setName(e.target.value)
// //                 }
// //                 required
// //                 placeholder="Jane Smith"
// //                 className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
// //                 Agency / Company <span className="text-accent">*</span>
// //               </label>
// //               <input
// //                 type="text"
// //                 value={agency}
// //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                   setAgency(e.target.value)
// //                 }
// //                 required
// //                 placeholder="Sunrise Travel Pvt. Ltd."
// //                 className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
// //                 Business Email <span className="text-accent">*</span>
// //               </label>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                   setEmail(e.target.value)
// //                 }
// //                 required
// //                 placeholder="jane@agency.com"
// //                 className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
// //               />
// //             </div>
// //             {state.packageName && (
// //               <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/[0.06] border border-primary/15">
// //                 <Compass className="w-4 h-4 text-primary shrink-0" />
// //                 <div>
// //                   <p className="text-xs font-semibold text-foreground">
// //                     {state.packageName}
// //                   </p>
// //                   <p className="text-xs text-muted-foreground">
// //                     From ${state.price?.toLocaleString()} per person
// //                   </p>
// //                 </div>
// //               </div>
// //             )}
// //             <button
// //               type="submit"
// //               className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
// //             >
// //               Send Inquiry
// //               <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
// //             </button>
// //             <p className="text-xs text-center text-muted-foreground">
// //               We respond within 4 business hours.{" "}
// //               <Link href="/privacy" className="text-primary hover:underline">
// //                 Privacy Policy
// //               </Link>
// //             </p>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Page ─────────────────────────────────────────────────────────────────────

// // export default function PhilippinesPage() {
// //   const [inquiry, setInquiry] = useState<InquiryState>({ open: false });
// //   const [filterCategory, setFilterCategory] = useState<string | null>(null);

// //   const handleInquiry = (packageName: string, price: number): void => {
// //     setInquiry({ open: true, packageName, price });
// //   };

// //   const handleGeneralInquiry = (): void => {
// //     setInquiry({ open: true });
// //   };

// //   const categories = [...new Set(destination.packages.map((p) => p.category))];
// //   const filteredPackages = filterCategory
// //     ? destination.packages.filter((p) => p.category === filterCategory)
// //     : destination.packages;

// //   const minPrice = Math.min(
// //     ...destination.packages.map((p) => p.startingPrice),
// //   );

// //   return (
// //     <>
// //       <Header />
// //       <main className="min-h-screen bg-background text-foreground">
// //         {/* ── HERO ─────────────────────────────────────────────────────────── */}
// //         <section className="relative h-[70vh] min-h-[560px] flex items-end overflow-hidden">
// //           {/* Hero background — gradient stand-in until real image is added */}
// //           <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.20_0.08_200)] via-[oklch(0.25_0.06_190)] to-[oklch(0.15_0.04_210)]">
// //             {/* Dot texture */}
// //             <div
// //               className="absolute inset-0 opacity-[0.07]"
// //               style={{
// //                 backgroundImage:
// //                   "radial-gradient(circle, oklch(0.75 0.12 85) 1px, transparent 1px)",
// //                 backgroundSize: "36px 36px",
// //               }}
// //             />
// //             {/* Accent glow */}
// //             <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 bg-accent pointer-events-none" />
// //             <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 bg-primary pointer-events-none" />
// //           </div>

// //           {/* Gradient overlays */}
// //           <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
// //           <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 to-transparent" />

// //           <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
// //             {/* Breadcrumb */}
// //             <Link
// //               href="/destinations"
// //               className="inline-flex items-center gap-2 text-card/70 hover:text-card text-sm mb-6 transition-colors group"
// //             >
// //               <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
// //               All Destinations
// //             </Link>

// //             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
// //               <div className="max-w-2xl">
// //                 {/* Region badge */}
// //                 <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest uppercase mb-4 border border-accent/30 bg-accent/15 text-accent backdrop-blur-sm">
// //                   <Globe className="h-3 w-3" />
// //                   Asia Pacific
// //                 </div>

// //                 <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-card leading-[1.05] mb-3">
// //                   Philippines
// //                 </h1>

// //                 <div className="flex items-center gap-2 text-card/70 text-base mb-3">
// //                   <MapPin className="h-4 w-4" />
// //                   Republic of the Philippines
// //                 </div>

// //                 <p className="text-accent font-medium text-xl mb-4">
// //                   {destination.tagline}
// //                 </p>

// //                 <div className="flex items-center gap-3">
// //                   <div className="flex gap-0.5">
// //                     {Array.from({ length: 5 }).map((_, i) => (
// //                       <Star
// //                         key={i}
// //                         className="w-4 h-4 fill-accent text-accent"
// //                       />
// //                     ))}
// //                   </div>
// //                   <span className="text-card/60 text-sm">
// //                     Partner-rated destination
// //                   </span>
// //                   <span className="text-card/30">·</span>
// //                   <span className="text-card/60 text-sm">
// //                     {destination.packages.length} packages from{" "}
// //                     <strong className="text-card">
// //                       ${minPrice.toLocaleString()}
// //                     </strong>
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* Action cluster */}
// //               <div className="flex flex-col gap-3 shrink-0">
// //                 <button
// //                   onClick={handleGeneralInquiry}
// //                   className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-semibold transition-all hover:-translate-y-0.5 group"
// //                 >
// //                   Get B2B Quote
// //                   <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
// //                 </button>
// //                 <div className="flex gap-2">
// //                   <Link
// //                     href="/brochures"
// //                     className="flex-1 flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl border border-card/30 text-card bg-transparent hover:bg-card/10 text-xs font-medium transition-all"
// //                   >
// //                     <Download className="h-3.5 w-3.5" />
// //                     Brochure
// //                   </Link>
// //                   <button className="flex-1 flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl border border-card/30 text-card bg-transparent hover:bg-card/10 text-xs font-medium transition-all">
// //                     <Share2 className="h-3.5 w-3.5" />
// //                     Share
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* ── QUICK INFO BAR ───────────────────────────────────────────────── */}
// //         <section className="bg-card border-b border-border shadow-sm sticky top-[80px] z-20">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
// //               {(
// //                 [
// //                   {
// //                     icon: Calendar,
// //                     label: "Best Time",
// //                     value: destination.bestTimeToVisit,
// //                   },
// //                   {
// //                     icon: DollarSign,
// //                     label: "Currency",
// //                     value: destination.currency,
// //                   },
// //                   {
// //                     icon: Globe,
// //                     label: "Language",
// //                     value: destination.language,
// //                   },
// //                   {
// //                     icon: Clock,
// //                     label: "Timezone",
// //                     value: destination.timezone,
// //                   },
// //                 ] as { icon: React.ElementType; label: string; value: string }[]
// //               ).map(({ icon: Icon, label, value }) => (
// //                 <div
// //                   key={label}
// //                   className="flex items-center gap-3 py-4 px-4 md:px-6"
// //                 >
// //                   <div className="w-9 h-9 rounded-xl bg-primary/[0.08] flex items-center justify-center shrink-0">
// //                     <Icon className="h-4 w-4 text-primary" />
// //                   </div>
// //                   <div className="min-w-0">
// //                     <p className="text-xs text-muted-foreground font-medium">
// //                       {label}
// //                     </p>
// //                     <p className="text-sm font-semibold text-foreground truncate">
// //                       {value}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* ── WHY PHILIPPINES (B2B PITCH) ───────────────────────────────────── */}
// //         <section className="py-12 px-4 bg-muted/30 border-b border-border">
// //           <div className="max-w-7xl mx-auto">
// //             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //               {(
// //                 [
// //                   {
// //                     icon: Plane,
// //                     title: "Direct Flights",
// //                     desc: "Daily connections Mumbai & Delhi to Manila via Philippine Airlines, Air India, IndiGo",
// //                   },
// //                   {
// //                     icon: Globe,
// //                     title: "Visa on Arrival",
// //                     desc: "30-day VOA for Indian passport holders — no pre-approval needed. Extendable to 59 days.",
// //                   },
// //                   {
// //                     icon: Fish,
// //                     title: "World-Class Diving",
// //                     desc: "Tubbataha, Apo Island & Coron offer some of the planet's top dive sites, rated #1 in Asia",
// //                   },
// //                   {
// //                     icon: Anchor,
// //                     title: "7,641 Islands",
// //                     desc: "Unmatched island diversity from Luzon to Mindanao — new experiences for every client",
// //                   },
// //                 ] as { icon: React.ElementType; title: string; desc: string }[]
// //               ).map(({ icon: Icon, title, desc }) => (
// //                 <div
// //                   key={title}
// //                   className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
// //                 >
// //                   <span className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
// //                     <Icon className="w-5 h-5 text-primary" />
// //                   </span>
// //                   <h3 className="font-serif font-bold text-sm text-foreground mb-1.5">
// //                     {title}
// //                   </h3>
// //                   <p className="text-xs text-muted-foreground leading-relaxed">
// //                     {desc}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* ── ABOUT + HIGHLIGHTS ───────────────────────────────────────────── */}
// //         <section className="py-16 px-4">
// //           <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-12 items-start">
// //             {/* About */}
// //             <div>
// //               <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
// //                 About the Destination
// //               </p>
// //               <h2 className="font-serif text-3xl font-bold text-foreground mb-5">
// //                 Discover the Philippines
// //               </h2>
// //               <p className="text-muted-foreground leading-relaxed text-base mb-5">
// //                 {destination.description}
// //               </p>

// //               {/* Additional stats */}
// //               <div className="grid sm:grid-cols-3 gap-4 mt-6">
// //                 {(
// //                   [
// //                     { icon: Waves, value: "7,641", label: "Islands" },
// //                     { icon: Mountain, value: "~5h", label: "From Mumbai" },
// //                     { icon: Camera, value: "9", label: "UNESCO Sites" },
// //                   ] as {
// //                     icon: React.ElementType;
// //                     value: string;
// //                     label: string;
// //                   }[]
// //                 ).map(({ icon: Icon, value, label }) => (
// //                   <div
// //                     key={label}
// //                     className="bg-muted/50 rounded-xl border border-border p-4 text-center"
// //                   >
// //                     <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
// //                     <p className="font-serif text-2xl font-bold text-foreground">
// //                       {value}
// //                     </p>
// //                     <p className="text-xs text-muted-foreground mt-0.5">
// //                       {label}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Travel essentials */}
// //               <div className="mt-6 grid sm:grid-cols-2 gap-3">
// //                 {[
// //                   { label: "Visa", value: destination.visaInfo },
// //                   { label: "Flight Time", value: destination.flightTime },
// //                   {
// //                     label: "Best Season",
// //                     value: "November to May (dry season)",
// //                   },
// //                   { label: "Local Time", value: "UTC+8 (IST +2:30)" },
// //                 ].map(({ label, value }) => (
// //                   <div
// //                     key={label}
// //                     className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border"
// //                   >
// //                     <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
// //                     <div>
// //                       <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
// //                         {label}
// //                       </p>
// //                       <p className="text-sm text-foreground font-medium mt-0.5">
// //                         {value}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               <a
// //                 href="#packages"
// //                 className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 group"
// //               >
// //                 Browse all packages
// //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //               </a>
// //             </div>

// //             {/* Highlights card */}
// //             <div className="bg-muted/50 rounded-2xl border border-border p-6">
// //               <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
// //                 Destination Highlights
// //               </p>
// //               <div className="space-y-2">
// //                 {destination.highlights.map((highlight, i) => (
// //                   <div
// //                     key={highlight}
// //                     className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200"
// //                     style={{ animationDelay: `${i * 50}ms` }}
// //                   >
// //                     <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
// //                       <CheckCircle className="h-3.5 w-3.5 text-primary" />
// //                     </div>
// //                     <span className="text-sm text-foreground font-medium">
// //                       {highlight}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //               <button
// //                 onClick={handleGeneralInquiry}
// //                 className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors group"
// //               >
// //                 Request B2B Rates
// //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
// //               </button>
// //             </div>
// //           </div>
// //         </section>

// //         {/* ── ISLAND REGIONS ───────────────────────────────────────────────── */}
// //         <section className="py-12 px-4 bg-muted/30 border-t border-border">
// //           <div className="max-w-7xl mx-auto">
// //             <div className="text-center mb-8">
// //               <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
// //                 Destination Zones
// //               </p>
// //               <h2 className="font-serif text-2xl font-bold text-foreground">
// //                 Key Island Regions
// //               </h2>
// //             </div>
// //             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //               {[
// //                 {
// //                   name: "Palawan",
// //                   tag: "Best for Nature & Diving",
// //                   desc: "El Nido, Coron, Puerto Princesa. World's best island — dramatic limestone karsts, crystal lagoons.",
// //                   emoji: "🏝️",
// //                 },
// //                 {
// //                   name: "Boracay",
// //                   tag: "Best for Beach & Nightlife",
// //                   desc: "White Beach, Station 1–3. Asia's top beach — powdery white sand, water sports, vibrant dining.",
// //                   emoji: "🌅",
// //                 },
// //                 {
// //                   name: "Bohol",
// //                   tag: "Best for Wildlife & Culture",
// //                   desc: "Chocolate Hills, tarsiers, Loboc River. Compact island perfect as a Cebu or Manila add-on.",
// //                   emoji: "🦎",
// //                 },
// //                 {
// //                   name: "Manila",
// //                   tag: "Best for City & History",
// //                   desc: "Intramuros, BGC, Tagaytay. Gateway city with colonial heritage, food scene, and day trip options.",
// //                   emoji: "🏙️",
// //                 },
// //               ].map(({ name, tag, desc, emoji }) => (
// //                 <div
// //                   key={name}
// //                   className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
// //                 >
// //                   <span className="text-3xl block mb-3">{emoji}</span>
// //                   <h3 className="font-serif font-bold text-base text-foreground">
// //                     {name}
// //                   </h3>
// //                   <p className="text-xs text-accent font-semibold mb-2">
// //                     {tag}
// //                   </p>
// //                   <p className="text-xs text-muted-foreground leading-relaxed">
// //                     {desc}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* ── TOUR PACKAGES ────────────────────────────────────────────────── */}
// //         <section className="py-16 px-4 border-t border-border" id="packages">
// //           <div className="max-w-7xl mx-auto">
// //             {/* Section header */}
// //             <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
// //               <div>
// //                 <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
// //                   B2B Packages
// //                 </p>
// //                 <h2 className="font-serif text-3xl font-bold text-foreground">
// //                   Tour Packages for Philippines
// //                 </h2>
// //                 <p className="text-muted-foreground mt-1.5 text-sm">
// //                   {filteredPackages.length} package
// //                   {filteredPackages.length !== 1 ? "s" : ""} available
// //                   {filterCategory
// //                     ? ` in ${categoryConfig[filterCategory]?.label}`
// //                     : ""}{" "}
// //                   — all with B2B net rates
// //                 </p>
// //               </div>

// //               {/* Category filters */}
// //               <div className="flex flex-wrap gap-2">
// //                 <button
// //                   onClick={() => setFilterCategory(null)}
// //                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
// //                     filterCategory === null
// //                       ? "bg-primary text-primary-foreground border-primary shadow-sm"
// //                       : "bg-card text-foreground border-border hover:border-primary/40"
// //                   }`}
// //                 >
// //                   All ({destination.packages.length})
// //                 </button>
// //                 {categories.map((cat) => {
// //                   const cfg = categoryConfig[cat];
// //                   const count = destination.packages.filter(
// //                     (p) => p.category === cat,
// //                   ).length;
// //                   return (
// //                     <button
// //                       key={cat}
// //                       onClick={() => setFilterCategory(cat)}
// //                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
// //                         filterCategory === cat
// //                           ? "bg-primary text-primary-foreground border-primary shadow-sm"
// //                           : "bg-card text-foreground border-border hover:border-primary/40"
// //                       }`}
// //                     >
// //                       {cfg?.label} ({count})
// //                     </button>
// //                   );
// //                 })}
// //               </div>
// //             </div>

// //             {/* Package list */}
// //             <div className="space-y-5">
// //               {filteredPackages.map((pkg, i) => (
// //                 <PackageCard
// //                   key={pkg.id}
// //                   pkg={pkg}
// //                   onInquiry={handleInquiry}
// //                   index={i}
// //                 />
// //               ))}
// //             </div>

// //             {filteredPackages.length === 0 && (
// //               <div className="bg-card rounded-2xl border border-border p-14 text-center shadow-sm">
// //                 <Compass className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
// //                 <p className="font-serif font-bold text-foreground mb-1">
// //                   No packages found
// //                 </p>
// //                 <p className="text-sm text-muted-foreground mb-4">
// //                   Try clearing the category filter to see all packages.
// //                 </p>
// //                 <button
// //                   onClick={() => setFilterCategory(null)}
// //                   className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 transition-all"
// //                 >
// //                   Show all packages
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </section>

// //         {/* ── CUSTOM PACKAGE CTA ───────────────────────────────────────────── */}
// //         <section className="py-20 px-4 bg-primary">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-primary-foreground/15 bg-primary-foreground/8 text-secondary">
// //               <Shield className="h-3.5 w-3.5" />
// //               Custom Itinerary Service
// //             </div>
// //             <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
// //               Need a tailor-made Philippines package?
// //             </h2>
// //             <p className="text-primary-foreground/65 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
// //               Our Manila ground team builds bespoke FIT itineraries,
// //               island-hopping circuits, MICE programmes, and honeymoon escapes
// //               from scratch — delivered within 24 hours of your request.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <button
// //                 onClick={handleGeneralInquiry}
// //                 className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl bg-background text-foreground hover:bg-background/90 text-sm font-semibold transition-all hover:-translate-y-0.5 group"
// //               >
// //                 Request Custom Itinerary
// //                 <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
// //               </button>
// //               <Link
// //                 href="/contact"
// //                 className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 text-sm font-medium transition-all"
// //               >
// //                 <Users className="h-4 w-4" />
// //                 Talk to Our Philippines Team
// //               </Link>
// //             </div>
// //           </div>
// //         </section>

// //         {/* ── RELATED DESTINATIONS ─────────────────────────────────────────── */}
// //         <section className="py-16 px-4 border-t border-border">
// //           <div className="max-w-7xl mx-auto">
// //             <div className="text-center mb-10">
// //               <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
// //                 Explore More
// //               </p>
// //               <h2 className="font-serif text-3xl font-bold text-foreground">
// //                 Other Asia Pacific Destinations
// //               </h2>
// //             </div>
// //             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
// //               {[
// //                 {
// //                   name: "Bali, Indonesia",
// //                   slug: "bali",
// //                   tagline: "Gods, temples & world-class surf",
// //                   emoji: "🌺",
// //                   price: 540,
// //                 },
// //                 {
// //                   name: "Japan",
// //                   slug: "japan",
// //                   tagline: "Ancient traditions meets modern wonder",
// //                   emoji: "⛩️",
// //                   price: 1260,
// //                 },
// //                 {
// //                   name: "Thailand",
// //                   slug: "thailand",
// //                   tagline: "Temples, street food & tropical beaches",
// //                   emoji: "🐘",
// //                   price: 380,
// //                 },
// //               ].map(({ name, slug, tagline, emoji, price }) => (
// //                 <Link
// //                   key={slug}
// //                   href={`/destinations/${slug}`}
// //                   className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200"
// //                 >
// //                   <div className="h-40 bg-gradient-to-br from-primary/15 via-primary/8 to-accent/10 flex items-center justify-center relative">
// //                     <span className="text-5xl">{emoji}</span>
// //                     <div className="absolute top-3 right-3">
// //                       <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm text-foreground">
// //                         From ${price.toLocaleString()}
// //                       </span>
// //                     </div>
// //                   </div>
// //                   <div className="p-5">
// //                     <h3 className="font-serif font-bold text-base text-foreground mb-1">
// //                       {name}
// //                     </h3>
// //                     <p className="text-xs text-muted-foreground leading-relaxed mb-3">
// //                       {tagline}
// //                     </p>
// //                     <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
// //                       View packages <ArrowRight className="w-3.5 h-3.5" />
// //                     </span>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //       <Footer />

// //       {/* Inquiry modal */}
// //       <InquiryModal
// //         state={inquiry}
// //         onClose={() => setInquiry({ open: false })}
// //       />
// //     </>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   MapPin,
//   Calendar,
//   Clock,
//   DollarSign,
//   CheckCircle,
//   XCircle,
//   Globe,
//   Users,
//   Plane,
//   Star,
//   ChevronDown,
//   Send,
//   ArrowRight,
//   Compass,
//   Shield,
//   Download,
//   Share2,
//   Heart,
//   Eye,
//   ArrowLeft,
//   Waves,
//   Sun,
//   Camera,
//   Utensils,
//   Fish,
//   Mountain,
//   Anchor,
// } from "lucide-react";
// import { Header } from "@/components/header";
// import { Footer } from "@/components/footer";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface TourPackage {
//   id: string;
//   name: string;
//   category:
//     | "beach"
//     | "adventure"
//     | "cultural"
//     | "luxury"
//     | "honeymoon"
//     | "group";
//   duration: string;
//   startingPrice: number;
//   rating: number;
//   description: string;
//   highlights: string[];
//   inclusions: string[];
//   exclusions: string[];
//   image: string;
// }

// interface InquiryState {
//   open: boolean;
//   packageName?: string;
//   price?: number;
// }

// // ─── Category config ──────────────────────────────────────────────────────────

// const categoryConfig: Record<
//   string,
//   { label: string; bg: string; text: string; dot: string }
// > = {
//   cultural: {
//     label: "Cultural",
//     bg: "bg-blue-50",
//     text: "text-blue-700",
//     dot: "bg-blue-500",
//   },
//   adventure: {
//     label: "Adventure",
//     bg: "bg-orange-50",
//     text: "text-orange-700",
//     dot: "bg-orange-500",
//   },
//   beach: {
//     label: "Beach & Relax",
//     bg: "bg-cyan-50",
//     text: "text-cyan-700",
//     dot: "bg-cyan-500",
//   },
//   luxury: {
//     label: "Luxury",
//     bg: "bg-amber-50",
//     text: "text-amber-700",
//     dot: "bg-amber-500",
//   },
//   honeymoon: {
//     label: "Honeymoon",
//     bg: "bg-pink-50",
//     text: "text-pink-700",
//     dot: "bg-pink-500",
//   },
//   group: {
//     label: "Group/Family",
//     bg: "bg-green-50",
//     text: "text-green-700",
//     dot: "bg-green-500",
//   },
// };

// // ─── Destination data ─────────────────────────────────────────────────────────

// const destination = {
//   id: "philippines",
//   name: "Philippines",
//   country: "Republic of the Philippines",
//   region: "asia-pacific" as const,
//   tagline:
//     "7,641 islands of paradise — pristine beaches, world-class diving & vibrant culture",
//   description:
//     "The Philippines is Southeast Asia's hidden crown jewel — an archipelago of more than 7,600 islands stretching across turquoise seas, each with its own distinct personality. From the chocolate hills of Bohol to the dramatic limestone karsts of Palawan, from the heritage streets of Vigan to the underground river of Puerto Princesa, the Philippines delivers extraordinary diversity in one destination. For Indian B2B partners, the Philippines offers a competitive visa-on-arrival policy, direct connectivity from Mumbai and Delhi, and exceptional value across all accommodation categories. Our Manila ground team has operated since 2007, providing partners with the deepest supplier relationships and most reliable on-ground support in the market.",
//   heroImage: "/images/destinations/philippines-hero.jpg",
//   bestTimeToVisit: "Nov – May",
//   currency: "PHP (₱)",
//   language: "Filipino, English",
//   timezone: "PHT (UTC+8)",
//   visaInfo: "Visa on arrival — 30 days, extendable",
//   flightTime: "~5h from Mumbai",
//   highlights: [
//     "Palawan — World's Best Island 2024",
//     "Tubbataha Reef — UNESCO World Heritage dive site",
//     "Boracay White Beach — Asia's #1 beach",
//     "Chocolate Hills of Bohol",
//     "Intramuros — Spanish colonial walled city",
//     "Puerto Princesa Underground River",
//     "Whale shark encounters in Oslob",
//     "Rice terraces of Banaue (UNESCO Heritage)",
//     "Coron island-hopping & wreck diving",
//     "Vibrant Manila food & nightlife scene",
//   ],
//   packages: [
//     {
//       id: "ph-palawan-explorer",
//       name: "Palawan Island Explorer",
//       category: "beach" as const,
//       duration: "7 Nights / 8 Days",
//       startingPrice: 850,
//       rating: 4.9,
//       description:
//         "The ultimate Palawan circuit — Puerto Princesa Underground River, El Nido island-hopping, and Coron's crystal lagoons. This flagship itinerary consistently tops partner feedback with its seamless logistics and hand-picked properties.",
//       highlights: [
//         "Puerto Princesa Underground River UNESCO tour",
//         "El Nido island-hopping Tours A, B & C",
//         "Coron twin lagoon & Kayangan Lake",
//         "Wreck diving at Barracuda Lake",
//         "Private sunset dinner, El Nido clifftop",
//       ],
//       inclusions: [
//         "Return economy airfare Manila–Puerto Princesa–El Nido–Coron",
//         "7 nights accommodation (3★ to 4★ options available)",
//         "All island-hopping tours with licensed guides",
//         "Underground River permit & boat transfer",
//         "All mentioned meals (breakfast daily, 2 dinners)",
//         "Private airport transfers throughout",
//         "Travel insurance coverage",
//         "Dedicated 24/7 on-ground guide",
//       ],
//       exclusions: [
//         "International airfare to/from Manila",
//         "Personal expenses and tips",
//         "Optional activities not in itinerary",
//         "Alcoholic beverages",
//       ],
//       image: "/images/packages/palawan-explorer.jpg",
//     },
//     {
//       id: "ph-boracay-luxury",
//       name: "Boracay Luxury Escape",
//       category: "luxury" as const,
//       duration: "5 Nights / 6 Days",
//       startingPrice: 1200,
//       rating: 4.8,
//       description:
//         "An ultra-refined Boracay experience — private beachfront villa, sunset sailing, and curated dining at the island's most exclusive restaurants. Ideal for luxury FIT clients and honeymooners seeking the Caribbean of Asia.",
//       highlights: [
//         "5-star beachfront villa, Station 1",
//         "Private sunset sailing aboard catamaran",
//         "Paraw sailboat sunrise excursion",
//         "Exclusive spa day at Mandala Spa",
//         "Chef's table dinner experience",
//       ],
//       inclusions: [
//         "5 nights luxury villa/resort (The Lind, Shangri-La, or Movenpick)",
//         "Return flights Manila–Caticlan (Boracay gateway)",
//         "All meals included (breakfast, lunch, dinner)",
//         "Private motorised paraw sailboat experience",
//         "Airport transfers in luxury vehicles",
//         "Spa credit (₱5,000 per person)",
//         "In-room welcome amenity for couples",
//       ],
//       exclusions: [
//         "International airfare to/from Manila",
//         "Alcoholic beverages beyond included package",
//         "Optional motorised water sports",
//         "Personal shopping",
//       ],
//       image: "/images/packages/boracay-luxury.jpg",
//     },
//     {
//       id: "ph-bohol-adventure",
//       name: "Bohol Nature & Adventure",
//       category: "adventure" as const,
//       duration: "4 Nights / 5 Days",
//       startingPrice: 520,
//       rating: 4.7,
//       description:
//         "Bohol's iconic Chocolate Hills, the world's smallest primate (Philippine tarsier), river cruises, and world-class snorkelling at Balicasag Island. A compact yet immensely rewarding itinerary that works brilliantly as a Manila add-on.",
//       highlights: [
//         "Chocolate Hills viewpoint sunrise",
//         "Philippine tarsier sanctuary",
//         "Loboc River floating lunch cruise",
//         "Balicasag Island diving/snorkelling",
//         "Panglao Beach sunset chill",
//       ],
//       inclusions: [
//         "4 nights accommodation Tagbilaran/Panglao (3★)",
//         "Return airfare Manila–Tagbilaran",
//         "Guided Chocolate Hills & tarsier tour",
//         "Loboc River cruise with lunch",
//         "Balicasag Island snorkelling trip",
//         "All mentioned meals",
//         "Airport and hotel transfers",
//       ],
//       exclusions: [
//         "International airfare",
//         "Scuba diving (available as add-on)",
//         "Personal expenses",
//       ],
//       image: "/images/packages/bohol-adventure.jpg",
//     },
//     {
//       id: "ph-manila-cultural",
//       name: "Manila Heritage & Culture Trail",
//       category: "cultural" as const,
//       duration: "3 Nights / 4 Days",
//       startingPrice: 380,
//       rating: 4.6,
//       description:
//         "A curated deep-dive into the Philippines' rich colonial and contemporary heritage — Intramuros walking tours, the Rizal Monument, BGC's street art, and day trips to Tagaytay and Taal Volcano. Perfect as a standalone city break or pre/post add-on.",
//       highlights: [
//         "Intramuros guided walking tour",
//         "Fort Santiago & Rizal Shrine",
//         "BGC street art & contemporary galleries",
//         "Tagaytay Ridge & Taal Volcano day trip",
//         "Filipino cuisine tasting journey",
//       ],
//       inclusions: [
//         "3 nights 4★ hotel Manila (BGC or Makati)",
//         "All guided tours with licensed heritage guide",
//         "Tagaytay & Taal full-day tour with lunch",
//         "Filipino food tasting dinner (5 restaurants)",
//         "Daily breakfast",
//         "Luxury air-conditioned transfers throughout",
//       ],
//       exclusions: [
//         "International/domestic airfare",
//         "Personal expenses",
//         "Optional museum entrance fees",
//       ],
//       image: "/images/packages/manila-cultural.jpg",
//     },
//     {
//       id: "ph-honeymoon-island",
//       name: "Island Honeymoon Romance",
//       category: "honeymoon" as const,
//       duration: "8 Nights / 9 Days",
//       startingPrice: 1650,
//       rating: 4.9,
//       description:
//         "The Philippines' most romantic circuit — three islands, one seamless romantic journey. Manila arrival, Palawan for dramatic scenery, and a Boracay finale with white sand, sunsets, and five-star pampering. Exclusively curated for couples.",
//       highlights: [
//         "Couples' spa ritual, El Nido clifftop",
//         "Private island picnic, Palawan lagoon",
//         "Sunset sailing with champagne",
//         "Overwater breakfast, Boracay",
//         "His & hers villa butler service",
//       ],
//       inclusions: [
//         "8 nights accommodation (4★–5★, sea-view rooms throughout)",
//         "All domestic flights (Manila–Palawan–Boracay–Manila)",
//         "Couples' spa treatment per destination",
//         "Private island picnic (Palawan)",
//         "All meals (breakfast daily, 4 romantic dinners)",
//         "Honeymoon room decorations & welcome gifts",
//         "Dedicated honeymoon concierge throughout",
//         "All transfers in private vehicles",
//       ],
//       exclusions: [
//         "International airfare",
//         "Additional spa treatments beyond inclusions",
//         "Personal shopping",
//       ],
//       image: "/images/packages/ph-honeymoon.jpg",
//     },
//     {
//       id: "ph-group-family",
//       name: "Philippines Family Island Hop",
//       category: "group" as const,
//       duration: "9 Nights / 10 Days",
//       startingPrice: 720,
//       rating: 4.7,
//       description:
//         "A perfectly paced family itinerary across Manila, Bohol, and Boracay — combining city sightseeing, wildlife encounters, island-hopping, and beach relaxation. Designed for groups of 8–40 pax with kid-friendly logistics throughout.",
//       highlights: [
//         "Manila city sightseeing & SM Mall of Asia",
//         "Bohol Chocolate Hills & tarsier encounter",
//         "Boracay White Beach & water activities",
//         "Group island-hopping with barbecue lunch",
//         "Snorkelling & banana boat fun",
//       ],
//       inclusions: [
//         "9 nights accommodation (family rooms, 3★–4★)",
//         "All domestic group airfares",
//         "Group guided tours all destinations",
//         "Family-friendly island-hopping with BBQ",
//         "All meals (breakfast daily, 3 group dinners)",
//         "Group airport transfers (coach)",
//         "Dedicated group tour manager",
//         "Group discount rates from 8 pax",
//       ],
//       exclusions: [
//         "International airfares",
//         "Optional water sports beyond inclusions",
//         "Personal expenses",
//       ],
//       image: "/images/packages/ph-group-family.jpg",
//     },
//   ] as TourPackage[],
// };

// // ─── Package Card ─────────────────────────────────────────────────────────────

// interface PackageCardProps {
//   pkg: TourPackage;
//   onInquiry: (name: string, price: number) => void;
//   index: number;
// }

// function PackageCard({ pkg, onInquiry, index }: PackageCardProps) {
//   const [showInclusions, setShowInclusions] = useState<boolean>(false);
//   const [saved, setSaved] = useState<boolean>(false);
//   const cat = categoryConfig[pkg.category] ?? categoryConfig.cultural;

//   return (
//     <div
//       className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300"
//       style={{ animationDelay: `${index * 80}ms` }}
//     >
//       <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr]">
//         {/* ── Image placeholder ──────────────────────────────────────────── */}
//         <div className="relative h-56 md:h-full min-h-[240px] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center">
//           {/* Decorative pattern */}
//           <div
//             className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle, oklch(0.35 0.08 180) 1px, transparent 1px)",
//               backgroundSize: "24px 24px",
//             }}
//           />
//           <Compass className="w-16 h-16 text-primary/20" />

//           {/* Category badge */}
//           <div className="absolute top-3 left-3">
//             <span
//               className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 ${cat.bg} ${cat.text}`}
//             >
//               <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
//               {cat.label}
//             </span>
//           </div>

//           {/* Save button */}
//           <button
//             onClick={(e: React.MouseEvent) => {
//               e.stopPropagation();
//               setSaved(!saved);
//             }}
//             className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-background"
//           >
//             <Heart
//               className={`w-4 h-4 transition-colors ${saved ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`}
//             />
//           </button>

//           {/* Duration badge */}
//           <div className="absolute bottom-3 left-3">
//             <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm text-foreground">
//               <Clock className="w-3 h-3 text-primary" />
//               {pkg.duration}
//             </span>
//           </div>

//           {/* Rating badge */}
//           <div className="absolute bottom-3 right-3">
//             <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm text-foreground">
//               <Star className="w-3 h-3 fill-accent text-accent" />
//               {pkg.rating}
//             </span>
//           </div>
//         </div>

//         {/* ── Content panel ──────────────────────────────────────────────── */}
//         <div className="p-6 lg:p-7 flex flex-col">
//           {/* Header row */}
//           <div className="flex items-start justify-between gap-4 mb-4">
//             <div className="flex-1 min-w-0">
//               <h3 className="font-serif text-xl lg:text-2xl font-bold text-foreground mb-1.5 leading-tight">
//                 {pkg.name}
//               </h3>
//               <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
//                 <span className="flex items-center gap-1.5">
//                   <Clock className="h-3.5 w-3.5 text-primary/60" />
//                   {pkg.duration}
//                 </span>
//                 <span className="flex items-center gap-1.5">
//                   <MapPin className="h-3.5 w-3.5 text-primary/60" />
//                   Philippines
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Star className="h-3.5 w-3.5 fill-accent text-accent" />
//                   <span className="font-medium text-foreground">
//                     {pkg.rating}
//                   </span>
//                   <span className="text-muted-foreground/60">/ 5</span>
//                 </span>
//               </div>
//             </div>

//             {/* Price block */}
//             <div className="shrink-0 text-right bg-muted rounded-xl px-4 py-3">
//               <p className="text-xs text-muted-foreground font-medium mb-0.5">
//                 Starting from
//               </p>
//               <p className="text-2xl font-bold text-primary leading-none">
//                 ${pkg.startingPrice.toLocaleString()}
//               </p>
//               <p className="text-xs text-muted-foreground mt-0.5">per person</p>
//             </div>
//           </div>

//           {/* Description */}
//           <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
//             {pkg.description}
//           </p>

//           {/* Highlights */}
//           <div className="mb-4">
//             <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
//               Tour Highlights
//             </p>
//             <div className="flex flex-wrap gap-1.5">
//               {pkg.highlights.slice(0, 5).map((h) => (
//                 <span
//                   key={h}
//                   className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground border border-border/60 hover:border-primary/30 hover:text-foreground transition-colors"
//                 >
//                   {h}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Inclusions accordion */}
//           <div className="border-t border-border pt-4 mt-auto">
//             <button
//               onClick={() => setShowInclusions(!showInclusions)}
//               className="flex items-center justify-between w-full text-sm group/btn mb-0"
//             >
//               <span className="flex items-center gap-2 font-semibold text-foreground group-hover/btn:text-primary transition-colors">
//                 <CheckCircle className="w-4 h-4 text-primary/60" />
//                 Package Inclusions
//                 <span className="text-xs font-normal text-muted-foreground">
//                   ({pkg.inclusions.length} items)
//                 </span>
//               </span>
//               <span
//                 className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${showInclusions ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"}`}
//               >
//                 <ChevronDown className="w-3.5 h-3.5" />
//               </span>
//             </button>

//             <div
//               className="overflow-hidden transition-all duration-300 ease-in-out"
//               style={{
//                 maxHeight: showInclusions ? "400px" : "0px",
//                 marginTop: showInclusions ? "12px" : "0px",
//               }}
//             >
//               <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 pb-1">
//                 {pkg.inclusions.map((inc) => (
//                   <div key={inc} className="flex items-start gap-2">
//                     <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
//                     <span className="text-xs text-muted-foreground leading-relaxed">
//                       {inc}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               {pkg.exclusions.length > 0 && (
//                 <div className="mt-3 pt-3 border-t border-border/60">
//                   <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
//                     Not Included
//                   </p>
//                   <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
//                     {pkg.exclusions.map((exc) => (
//                       <div key={exc} className="flex items-start gap-2">
//                         <XCircle className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0 mt-0.5" />
//                         <span className="text-xs text-muted-foreground/60 leading-relaxed">
//                           {exc}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* CTA row */}
//           <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-4 border-t border-border">
//             <Link
//               href={`/destinations/philippines/packages/${pkg.id}`}
//               className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all group/link"
//             >
//               <Eye className="w-4 h-4 text-muted-foreground group-hover/link:text-primary transition-colors" />
//               Full Itinerary
//               <ArrowRight className="w-3.5 h-3.5 ml-auto text-muted-foreground/40 group-hover/link:translate-x-0.5 group-hover/link:text-primary transition-all" />
//             </Link>
//             <button
//               onClick={() => onInquiry(pkg.name, pkg.startingPrice)}
//               className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors group/send"
//             >
//               <Send className="h-4 w-4 group-hover/send:translate-x-0.5 transition-transform" />
//               Send Inquiry
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Simple Inquiry Modal ─────────────────────────────────────────────────────

// function InquiryModal({
//   state,
//   onClose,
// }: {
//   state: InquiryState;
//   onClose: () => void;
// }) {
//   const [submitted, setSubmitted] = useState<boolean>(false);
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [agency, setAgency] = useState<string>("");

//   if (!state.open) return null;

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
//       <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md overflow-hidden">
//         <div className="px-6 py-5 border-b border-border bg-muted/40 flex items-center justify-between">
//           <div>
//             <h3 className="font-serif font-bold text-lg text-foreground">
//               Request B2B Rates
//             </h3>
//             <p className="text-xs text-muted-foreground mt-0.5">
//               {state.packageName
//                 ? `Re: ${state.packageName}`
//                 : "Philippines — General Inquiry"}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-muted hover:bg-border flex items-center justify-center text-muted-foreground transition-colors text-lg leading-none"
//           >
//             ×
//           </button>
//         </div>

//         {submitted ? (
//           <div className="px-6 py-12 text-center">
//             <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
//               <CheckCircle className="w-7 h-7 text-primary" />
//             </div>
//             <h4 className="font-serif font-bold text-xl text-foreground mb-2">
//               Inquiry Received!
//             </h4>
//             <p className="text-sm text-muted-foreground leading-relaxed mb-6">
//               Our Philippines specialist will respond within 4 business hours
//               with B2B net rates.
//             </p>
//             <button
//               onClick={onClose}
//               className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
//             <div>
//               <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
//                 Full Name <span className="text-accent">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   setName(e.target.value)
//                 }
//                 required
//                 placeholder="Jane Smith"
//                 className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
//                 Agency / Company <span className="text-accent">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={agency}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   setAgency(e.target.value)
//                 }
//                 required
//                 placeholder="Sunrise Travel Pvt. Ltd."
//                 className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
//                 Business Email <span className="text-accent">*</span>
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   setEmail(e.target.value)
//                 }
//                 required
//                 placeholder="jane@agency.com"
//                 className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
//               />
//             </div>
//             {state.packageName && (
//               <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/[0.06] border border-primary/15">
//                 <Compass className="w-4 h-4 text-primary shrink-0" />
//                 <div>
//                   <p className="text-xs font-semibold text-foreground">
//                     {state.packageName}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     From ${state.price?.toLocaleString()} per person
//                   </p>
//                 </div>
//               </div>
//             )}
//             <button
//               type="submit"
//               className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
//             >
//               Send Inquiry
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//             </button>
//             <p className="text-xs text-center text-muted-foreground">
//               We respond within 4 business hours.{" "}
//               <Link href="/privacy" className="text-primary hover:underline">
//                 Privacy Policy
//               </Link>
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default function PhilippinesPage() {
//   const [inquiry, setInquiry] = useState<InquiryState>({ open: false });
//   const [filterCategory, setFilterCategory] = useState<string | null>(null);

//   const handleInquiry = (packageName: string, price: number): void => {
//     setInquiry({ open: true, packageName, price });
//   };

//   const handleGeneralInquiry = (): void => {
//     setInquiry({ open: true });
//   };

//   const categories = [...new Set(destination.packages.map((p) => p.category))];
//   const filteredPackages = filterCategory
//     ? destination.packages.filter((p) => p.category === filterCategory)
//     : destination.packages;

//   const minPrice = Math.min(
//     ...destination.packages.map((p) => p.startingPrice),
//   );

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-background text-foreground">
//         {/* ── HERO ─────────────────────────────────────────────────────────── */}
//         <section className="relative h-[70vh] min-h-[560px] flex items-end overflow-hidden">
//           {/* Hero background — gradient stand-in until real image is added */}
//           <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.20_0.08_200)] via-[oklch(0.25_0.06_190)] to-[oklch(0.15_0.04_210)]">
//             {/* Dot texture */}
//             <div
//               className="absolute inset-0 opacity-[0.07]"
//               style={{
//                 backgroundImage:
//                   "radial-gradient(circle, oklch(0.75 0.12 85) 1px, transparent 1px)",
//                 backgroundSize: "36px 36px",
//               }}
//             />
//             {/* Accent glow */}
//             <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 bg-accent pointer-events-none" />
//             <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 bg-primary pointer-events-none" />
//           </div>

//           {/* Gradient overlays */}
//           <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
//           <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 to-transparent" />

//           <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
//             {/* Breadcrumb */}
//             <Link
//               href="/destinations"
//               className="inline-flex items-center gap-2 text-card/70 hover:text-card text-sm mb-6 transition-colors group"
//             >
//               <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
//               All Destinations
//             </Link>

//             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
//               <div className="max-w-2xl">
//                 {/* Region badge */}
//                 <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest uppercase mb-4 border border-accent/30 bg-accent/15 text-accent backdrop-blur-sm">
//                   <Globe className="h-3 w-3" />
//                   Asia Pacific
//                 </div>

//                 <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-card leading-[1.05] mb-3">
//                   Philippines
//                 </h1>

//                 <div className="flex items-center gap-2 text-card/70 text-base mb-3">
//                   <MapPin className="h-4 w-4" />
//                   Republic of the Philippines
//                 </div>

//                 <p className="text-accent font-medium text-xl mb-4">
//                   {destination.tagline}
//                 </p>

//                 <div className="flex items-center gap-3">
//                   <div className="flex gap-0.5">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star
//                         key={i}
//                         className="w-4 h-4 fill-accent text-accent"
//                       />
//                     ))}
//                   </div>
//                   <span className="text-card/60 text-sm">
//                     Partner-rated destination
//                   </span>
//                   <span className="text-card/30">·</span>
//                   <span className="text-card/60 text-sm">
//                     {destination.packages.length} packages from{" "}
//                     <strong className="text-card">
//                       ${minPrice.toLocaleString()}
//                     </strong>
//                   </span>
//                 </div>
//               </div>

//               {/* Action cluster */}
//               <div className="flex flex-col gap-3 shrink-0">
//                 <button
//                   onClick={handleGeneralInquiry}
//                   className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-semibold transition-all hover:-translate-y-0.5 group"
//                 >
//                   Get B2B Quote
//                   <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
//                 </button>
//                 <div className="flex gap-2">
//                   <Link
//                     href="/brochures"
//                     className="flex-1 flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl border border-card/30 text-card bg-transparent hover:bg-card/10 text-xs font-medium transition-all"
//                   >
//                     <Download className="h-3.5 w-3.5" />
//                     Brochure
//                   </Link>
//                   <button className="flex-1 flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl border border-card/30 text-card bg-transparent hover:bg-card/10 text-xs font-medium transition-all">
//                     <Share2 className="h-3.5 w-3.5" />
//                     Share
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── QUICK INFO BAR ───────────────────────────────────────────────── */}
//         <section className="bg-card border-b border-border shadow-sm sticky top-[80px] z-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
//               {(
//                 [
//                   {
//                     icon: Calendar,
//                     label: "Best Time",
//                     value: destination.bestTimeToVisit,
//                   },
//                   {
//                     icon: DollarSign,
//                     label: "Currency",
//                     value: destination.currency,
//                   },
//                   {
//                     icon: Globe,
//                     label: "Language",
//                     value: destination.language,
//                   },
//                   {
//                     icon: Clock,
//                     label: "Timezone",
//                     value: destination.timezone,
//                   },
//                 ] as { icon: React.ElementType; label: string; value: string }[]
//               ).map(({ icon: Icon, label, value }) => (
//                 <div
//                   key={label}
//                   className="flex items-center gap-3 py-4 px-4 md:px-6"
//                 >
//                   <div className="w-9 h-9 rounded-xl bg-primary/[0.08] flex items-center justify-center shrink-0">
//                     <Icon className="h-4 w-4 text-primary" />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-xs text-muted-foreground font-medium">
//                       {label}
//                     </p>
//                     <p className="text-sm font-semibold text-foreground truncate">
//                       {value}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── WHY PHILIPPINES (B2B PITCH) ───────────────────────────────────── */}
//         <section className="py-12 px-4 bg-muted/30 border-b border-border">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {(
//                 [
//                   {
//                     icon: Plane,
//                     title: "Direct Flights",
//                     desc: "Daily connections Mumbai & Delhi to Manila via Philippine Airlines, Air India, IndiGo",
//                   },
//                   {
//                     icon: Globe,
//                     title: "Visa on Arrival",
//                     desc: "30-day VOA for Indian passport holders — no pre-approval needed. Extendable to 59 days.",
//                   },
//                   {
//                     icon: Fish,
//                     title: "World-Class Diving",
//                     desc: "Tubbataha, Apo Island & Coron offer some of the planet's top dive sites, rated #1 in Asia",
//                   },
//                   {
//                     icon: Anchor,
//                     title: "7,641 Islands",
//                     desc: "Unmatched island diversity from Luzon to Mindanao — new experiences for every client",
//                   },
//                 ] as { icon: React.ElementType; title: string; desc: string }[]
//               ).map(({ icon: Icon, title, desc }) => (
//                 <div
//                   key={title}
//                   className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
//                 >
//                   <span className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
//                     <Icon className="w-5 h-5 text-primary" />
//                   </span>
//                   <h3 className="font-serif font-bold text-sm text-foreground mb-1.5">
//                     {title}
//                   </h3>
//                   <p className="text-xs text-muted-foreground leading-relaxed">
//                     {desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── ABOUT + HIGHLIGHTS ───────────────────────────────────────────── */}
//         <section className="py-16 px-4">
//           <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-12 items-start">
//             {/* About */}
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
//                 About the Destination
//               </p>
//               <h2 className="font-serif text-3xl font-bold text-foreground mb-5">
//                 Discover the Philippines
//               </h2>
//               <p className="text-muted-foreground leading-relaxed text-base mb-5">
//                 {destination.description}
//               </p>

//               {/* Additional stats */}
//               <div className="grid sm:grid-cols-3 gap-4 mt-6">
//                 {(
//                   [
//                     { icon: Waves, value: "7,641", label: "Islands" },
//                     { icon: Mountain, value: "~5h", label: "From Mumbai" },
//                     { icon: Camera, value: "9", label: "UNESCO Sites" },
//                   ] as {
//                     icon: React.ElementType;
//                     value: string;
//                     label: string;
//                   }[]
//                 ).map(({ icon: Icon, value, label }) => (
//                   <div
//                     key={label}
//                     className="bg-muted/50 rounded-xl border border-border p-4 text-center"
//                   >
//                     <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
//                     <p className="font-serif text-2xl font-bold text-foreground">
//                       {value}
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-0.5">
//                       {label}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Travel essentials */}
//               <div className="mt-6 grid sm:grid-cols-2 gap-3">
//                 {[
//                   { label: "Visa", value: destination.visaInfo },
//                   { label: "Flight Time", value: destination.flightTime },
//                   {
//                     label: "Best Season",
//                     value: "November to May (dry season)",
//                   },
//                   { label: "Local Time", value: "UTC+8 (IST +2:30)" },
//                 ].map(({ label, value }) => (
//                   <div
//                     key={label}
//                     className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border"
//                   >
//                     <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                         {label}
//                       </p>
//                       <p className="text-sm text-foreground font-medium mt-0.5">
//                         {value}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <a
//                 href="#packages"
//                 className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 group"
//               >
//                 Browse all packages
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </a>
//             </div>

//             {/* Highlights card */}
//             <div className="bg-muted/50 rounded-2xl border border-border p-6">
//               <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
//                 Destination Highlights
//               </p>
//               <div className="space-y-2">
//                 {destination.highlights.map((highlight, i) => (
//                   <div
//                     key={highlight}
//                     className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200"
//                     style={{ animationDelay: `${i * 50}ms` }}
//                   >
//                     <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
//                       <CheckCircle className="h-3.5 w-3.5 text-primary" />
//                     </div>
//                     <span className="text-sm text-foreground font-medium">
//                       {highlight}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={handleGeneralInquiry}
//                 className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors group"
//               >
//                 Request B2B Rates
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* ── ISLAND REGIONS ───────────────────────────────────────────────── */}
//         <section className="py-12 px-4 bg-muted/30 border-t border-border">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-8">
//               <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
//                 Destination Zones
//               </p>
//               <h2 className="font-serif text-2xl font-bold text-foreground">
//                 Key Island Regions
//               </h2>
//             </div>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {[
//                 {
//                   name: "Palawan",
//                   tag: "Best for Nature & Diving",
//                   desc: "El Nido, Coron, Puerto Princesa. World's best island — dramatic limestone karsts, crystal lagoons.",
//                   emoji: "🏝️",
//                 },
//                 {
//                   name: "Boracay",
//                   tag: "Best for Beach & Nightlife",
//                   desc: "White Beach, Station 1–3. Asia's top beach — powdery white sand, water sports, vibrant dining.",
//                   emoji: "🌅",
//                 },
//                 {
//                   name: "Bohol",
//                   tag: "Best for Wildlife & Culture",
//                   desc: "Chocolate Hills, tarsiers, Loboc River. Compact island perfect as a Cebu or Manila add-on.",
//                   emoji: "🦎",
//                 },
//                 {
//                   name: "Manila",
//                   tag: "Best for City & History",
//                   desc: "Intramuros, BGC, Tagaytay. Gateway city with colonial heritage, food scene, and day trip options.",
//                   emoji: "🏙️",
//                 },
//               ].map(({ name, tag, desc, emoji }) => (
//                 <div
//                   key={name}
//                   className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
//                 >
//                   <span className="text-3xl block mb-3">{emoji}</span>
//                   <h3 className="font-serif font-bold text-base text-foreground">
//                     {name}
//                   </h3>
//                   <p className="text-xs text-accent font-semibold mb-2">
//                     {tag}
//                   </p>
//                   <p className="text-xs text-muted-foreground leading-relaxed">
//                     {desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── TOUR PACKAGES ────────────────────────────────────────────────── */}
//         <section className="py-16 px-4 border-t border-border" id="packages">
//           <div className="max-w-7xl mx-auto">
//             {/* Section header */}
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
//                   B2B Packages
//                 </p>
//                 <h2 className="font-serif text-3xl font-bold text-foreground">
//                   Tour Packages for Philippines
//                 </h2>
//                 <p className="text-muted-foreground mt-1.5 text-sm">
//                   {filteredPackages.length} package
//                   {filteredPackages.length !== 1 ? "s" : ""} available
//                   {filterCategory
//                     ? ` in ${categoryConfig[filterCategory]?.label}`
//                     : ""}{" "}
//                   — all with B2B net rates
//                 </p>
//               </div>

//               {/* Category filters */}
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => setFilterCategory(null)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
//                     filterCategory === null
//                       ? "bg-primary text-primary-foreground border-primary shadow-sm"
//                       : "bg-card text-foreground border-border hover:border-primary/40"
//                   }`}
//                 >
//                   All ({destination.packages.length})
//                 </button>
//                 {categories.map((cat) => {
//                   const cfg = categoryConfig[cat];
//                   const count = destination.packages.filter(
//                     (p) => p.category === cat,
//                   ).length;
//                   return (
//                     <button
//                       key={cat}
//                       onClick={() => setFilterCategory(cat)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
//                         filterCategory === cat
//                           ? "bg-primary text-primary-foreground border-primary shadow-sm"
//                           : "bg-card text-foreground border-border hover:border-primary/40"
//                       }`}
//                     >
//                       {cfg?.label} ({count})
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Package list */}
//             <div className="space-y-5">
//               {filteredPackages.map((pkg, i) => (
//                 <PackageCard
//                   key={pkg.id}
//                   pkg={pkg}
//                   onInquiry={handleInquiry}
//                   index={i}
//                 />
//               ))}
//             </div>

//             {filteredPackages.length === 0 && (
//               <div className="bg-card rounded-2xl border border-border p-14 text-center shadow-sm">
//                 <Compass className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
//                 <p className="font-serif font-bold text-foreground mb-1">
//                   No packages found
//                 </p>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   Try clearing the category filter to see all packages.
//                 </p>
//                 <button
//                   onClick={() => setFilterCategory(null)}
//                   className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 transition-all"
//                 >
//                   Show all packages
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ── CUSTOM PACKAGE CTA ───────────────────────────────────────────── */}
//         <section className="py-20 px-4 bg-primary">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-primary-foreground/15 bg-primary-foreground/8 text-secondary">
//               <Shield className="h-3.5 w-3.5" />
//               Custom Itinerary Service
//             </div>
//             <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
//               Need a tailor-made Philippines package?
//             </h2>
//             <p className="text-primary-foreground/65 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
//               Our Manila ground team builds bespoke FIT itineraries,
//               island-hopping circuits, MICE programmes, and honeymoon escapes
//               from scratch — delivered within 24 hours of your request.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={handleGeneralInquiry}
//                 className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl bg-background text-foreground hover:bg-background/90 text-sm font-semibold transition-all hover:-translate-y-0.5 group"
//               >
//                 Request Custom Itinerary
//                 <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
//               </button>
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 text-sm font-medium transition-all"
//               >
//                 <Users className="h-4 w-4" />
//                 Talk to Our Philippines Team
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* ── RELATED DESTINATIONS ─────────────────────────────────────────── */}
//         <section className="py-16 px-4 border-t border-border">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-10">
//               <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
//                 Explore More
//               </p>
//               <h2 className="font-serif text-3xl font-bold text-foreground">
//                 Other Asia Pacific Destinations
//               </h2>
//             </div>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//               {[
//                 {
//                   name: "Bali, Indonesia",
//                   slug: "bali",
//                   tagline: "Gods, temples & world-class surf",
//                   emoji: "🌺",
//                   price: 540,
//                 },
//                 {
//                   name: "Japan",
//                   slug: "japan",
//                   tagline: "Ancient traditions meets modern wonder",
//                   emoji: "⛩️",
//                   price: 1260,
//                 },
//                 {
//                   name: "Thailand",
//                   slug: "thailand",
//                   tagline: "Temples, street food & tropical beaches",
//                   emoji: "🐘",
//                   price: 380,
//                 },
//               ].map(({ name, slug, tagline, emoji, price }) => (
//                 <Link
//                   key={slug}
//                   href={`/destinations/${slug}`}
//                   className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200"
//                 >
//                   <div className="h-40 bg-gradient-to-br from-primary/15 via-primary/8 to-accent/10 flex items-center justify-center relative">
//                     <span className="text-5xl">{emoji}</span>
//                     <div className="absolute top-3 right-3">
//                       <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm text-foreground">
//                         From ${price.toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="p-5">
//                     <h3 className="font-serif font-bold text-base text-foreground mb-1">
//                       {name}
//                     </h3>
//                     <p className="text-xs text-muted-foreground leading-relaxed mb-3">
//                       {tagline}
//                     </p>
//                     <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
//                       View packages <ArrowRight className="w-3.5 h-3.5" />
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />

//       {/* Inquiry modal */}
//       <InquiryModal
//         state={inquiry}
//         onClose={() => setInquiry({ open: false })}
//       />
//     </>
//   );
// }

"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Drop into:  app/destinations/philippines/page.tsx
//
// Uses your existing globals.css design tokens (--primary, --accent, etc.)
// Imports: @/components/header, @/components/footer, lucide-react, next/image, next/link
// No new dependencies needed.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  Star,
  Clock,
  MapPin,
  Shield,
  Globe,
  Plane,
  Users,
  CheckCircle,
  XCircle,
  Heart,
  Send,
  ChevronDown,
  Award,
  Phone,
  Mail,
  MessageCircle,
  Camera,
  ChevronRight,
  Waves,
  Sun,
  Fish,
  Mountain,
  Download,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Package {
  id: string;
  slug: string;
  category:
    | "beach"
    | "luxury"
    | "adventure"
    | "honeymoon"
    | "cultural"
    | "group";
  name: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  badge?: string;
  tagline: string;
  desc: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  islands: string[];
  image: string;
  imageAlt: string;
}

interface GalleryPhoto {
  src: string;
  alt: string;
  label: string;
}
interface IslandZone {
  name: string;
  tag: string;
  emoji: string;
  desc: string;
  bestFor: string[];
  image: string;
  imageAlt: string;
}
interface Testimonial {
  quote: string;
  author: string;
  agency: string;
  city: string;
}
interface ModalState {
  open: boolean;
  packageName: string;
  price: number | null;
}

// ─── Category config ──────────────────────────────────────────────────────────

const CAT: Record<string, { label: string; dot: string }> = {
  beach: { label: "Beach & Island", dot: "bg-cyan-400" },
  luxury: { label: "Luxury", dot: "bg-amber-400" },
  adventure: { label: "Adventure", dot: "bg-orange-400" },
  honeymoon: { label: "Honeymoon", dot: "bg-pink-400" },
  cultural: { label: "Cultural", dot: "bg-blue-400" },
  group: { label: "Group / MICE", dot: "bg-green-400" },
};

// ─── Static data ──────────────────────────────────────────────────────────────

const PACKAGES: Package[] = [
  {
    id: "palawan-explorer",
    slug: "palawan-explorer",
    category: "beach",
    name: "Palawan Island Explorer",
    duration: "7 Nights / 8 Days",
    price: 850,
    rating: 4.9,
    reviews: 214,
    badge: "Best Seller",
    tagline: "UNESCO rivers · El Nido lagoons · Coron dive wrecks",
    desc: "The definitive Palawan circuit — Puerto Princesa Underground River (UNESCO), El Nido island-hopping Tours A–C, and Coron's legendary twin lagoon and Kayangan Lake. Our #1 seller for Indian travel agents.",
    highlights: [
      "Puerto Princesa Underground River — UNESCO",
      "El Nido island-hopping Tours A, B & C",
      "Coron Twin Lagoon & Kayangan Lake",
      "Private sunset dinner on El Nido clifftop",
    ],
    inclusions: [
      "Return flights Manila–Puerto Princesa–El Nido–Coron",
      "7 nights accommodation (3★–4★ sea-view)",
      "All island-hopping tours with licensed guides",
      "Underground River permit & boat transfer",
      "Breakfast daily + 2 dinners",
      "All private transfers",
      "24/7 PearlDMC on-ground support",
      "Travel insurance",
    ],
    exclusions: [
      "International airfare Mumbai/Delhi–Manila",
      "Optional scuba diving upgrade",
      "Personal expenses",
    ],
    islands: ["Puerto Princesa", "El Nido", "Coron"],
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
    imageAlt:
      "Palawan El Nido limestone karsts turquoise lagoon Philippines — PearlDMC best seller B2B",
  },
  {
    id: "boracay-luxury",
    slug: "boracay-luxury",
    category: "luxury",
    name: "Boracay Luxury Beach Escape",
    duration: "5 Nights / 6 Days",
    price: 1200,
    rating: 4.8,
    reviews: 156,
    badge: "Top Rated",
    tagline: "Asia's finest white sand · 5-star resort · private sailing",
    desc: "Ultra-refined Boracay at Asia's finest beach — 5-star beachfront villa, private sunset sailing, full-day Mandala Spa immersion, and curated chef's table dining. Our most-reviewed Philippines product.",
    highlights: [
      "5-star villa at Station 1, White Beach",
      "Private catamaran sunset sailing",
      "Full-day Mandala Spa + ₱5,000 spa credit",
      "Chef's table dinner with island views",
    ],
    inclusions: [
      "5 nights 5★ resort (Shangri-La, The Lind or Mövenpick)",
      "Return flights Manila–Caticlan",
      "Full board — all meals included",
      "Private paraw sailboat excursion",
      "Luxury vehicle transfers",
    ],
    exclusions: [
      "International airfare",
      "Additional spa treatments",
      "Motorised water sports",
    ],
    islands: ["Manila", "Boracay"],
    image:
      "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800&q=80",
    imageAlt:
      "Boracay White Beach luxury resort sunset Philippines — PearlDMC B2B luxury package",
  },
  {
    id: "bohol-adventure",
    slug: "bohol-adventure",
    category: "adventure",
    name: "Bohol Nature & Adventure",
    duration: "4 Nights / 5 Days",
    price: 520,
    rating: 4.7,
    reviews: 98,
    badge: "Great Value",
    tagline: "Chocolate Hills · world's smallest primate · Loboc river",
    desc: "Chocolate Hills geological wonder, the Philippine tarsier (world's smallest primate), Loboc River floating lunch, and Balicasag Island snorkelling. Perfect standalone or Cebu add-on.",
    highlights: [
      "Chocolate Hills — Bohol's geological wonder",
      "Philippine Tarsier Conservation Area",
      "Loboc River floating lunch cruise",
      "Balicasag Island marine sanctuary",
    ],
    inclusions: [
      "4 nights accommodation (3★, Panglao)",
      "Return airfare Manila–Tagbilaran",
      "Guided full-day tour",
      "Loboc cruise with buffet",
      "Snorkelling with equipment",
      "Breakfast daily + 2 meals",
    ],
    exclusions: [
      "International airfare",
      "Scuba diving (paid upgrade available)",
      "Personal expenses",
    ],
    islands: ["Bohol", "Panglao"],
    image:
      "https://images.unsplash.com/photo-1534294228306-bd54eb9a7ba8?w=800&q=80",
    imageAlt:
      "Bohol Philippines island adventure Chocolate Hills tarsier Loboc river",
  },
  {
    id: "honeymoon-circuit",
    slug: "honeymoon-circuit",
    category: "honeymoon",
    name: "Philippines Island Honeymoon",
    duration: "8 Nights / 9 Days",
    price: 1650,
    rating: 4.9,
    reviews: 187,
    badge: "Most Popular",
    tagline: "3 islands · couples spa · champagne sunsets · concierge",
    desc: "Three islands, one seamless romance — Manila gateway, Palawan's dramatic scenery, Boracay grand finale. Dedicated honeymoon concierge, private island picnic, and couples spa at every stop.",
    highlights: [
      "Private island picnic in Palawan's secret lagoon",
      "Couples spa at each destination (3 total)",
      "Sunset catamaran sailing with champagne",
      "Dedicated honeymoon concierge end-to-end",
    ],
    inclusions: [
      "8 nights sea-view rooms (4★–5★)",
      "All domestic flights",
      "3 couples spa treatments",
      "Private island picnic with champagne",
      "Breakfast daily + 4 romantic dinners",
      "Rose petal turndown & welcome gifts",
    ],
    exclusions: [
      "International airfare",
      "Additional spa treatments",
      "Personal shopping",
    ],
    islands: ["Manila", "El Nido", "Boracay"],
    image:
      "https://images.unsplash.com/photo-1551524164-6cf7ab604b06?w=800&q=80",
    imageAlt:
      "Philippines honeymoon island paradise turquoise water — PearlDMC honeymoon packages",
  },
  {
    id: "manila-cultural",
    slug: "manila-cultural",
    category: "cultural",
    name: "Manila Heritage & Culture",
    duration: "3 Nights / 4 Days",
    price: 380,
    rating: 4.6,
    reviews: 72,
    tagline: "Intramuros · Taal Volcano · BGC art · Filipino food trail",
    desc: "Colonial Intramuros, Fort Santiago, BGC contemporary art, and a full-day Tagaytay/Taal Volcano trip. Perfect standalone city break or pre/post island add-on.",
    highlights: [
      "Intramuros guided heritage tour",
      "Tagaytay Ridge & Taal Volcano day trip",
      "BGC street art & galleries",
      "5-stop Filipino cuisine tasting",
    ],
    inclusions: [
      "3 nights 4★ hotel (BGC or Makati)",
      "All guided tours",
      "Tagaytay excursion with lunch",
      "Food tasting dinner",
      "Breakfast daily",
      "All transfers",
    ],
    exclusions: [
      "Domestic/international airfare",
      "Optional museum fees",
      "Personal expenses",
    ],
    islands: ["Manila", "Tagaytay"],
    image:
      "https://images.unsplash.com/photo-1569974498991-d3d12a4d8cf5?w=800&q=80",
    imageAlt:
      "Manila Philippines Intramuros colonial heritage BGC city cultural tour",
  },
  {
    id: "group-island-hop",
    slug: "group-island-hop",
    category: "group",
    name: "Philippines Family Island Hop",
    duration: "9 Nights / 10 Days",
    price: 720,
    rating: 4.7,
    reviews: 63,
    tagline: "3 islands · BBQ beach lunch · group discounts · 8–40 pax",
    desc: "Perfectly paced family and group circuit — Manila sightseeing, Bohol wildlife, Boracay beach. Progressive group discount tiers from 8 pax, with a dedicated tour manager.",
    highlights: [
      "Manila city sightseeing & Ocean Park",
      "Bohol Chocolate Hills & tarsier",
      "Boracay island-hopping with BBQ lunch",
      "Group discounts from 8 pax",
    ],
    inclusions: [
      "9 nights family rooms (3★–4★)",
      "All domestic group airfares",
      "Guided tours at every destination",
      "Island-hopping with beach BBQ",
      "Breakfast daily + 3 dinners",
      "Group coach transfers",
    ],
    exclusions: [
      "International airfares",
      "Additional water sports",
      "Personal expenses",
    ],
    islands: ["Manila", "Bohol", "Boracay"],
    image:
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    imageAlt:
      "Philippines family group MICE island hopping snorkelling packages",
  },
];

const GALLERY: GalleryPhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=700&q=80",
    alt: "Palawan El Nido turquoise lagoon limestone karsts",
    label: "Palawan",
  },
  {
    src: "https://images.unsplash.com/photo-1534294228306-bd54eb9a7ba8?w=700&q=80",
    alt: "El Nido island hopping hidden lagoon Philippines",
    label: "El Nido",
  },
  {
    src: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=700&q=80",
    alt: "Boracay White Beach sunset luxury resort",
    label: "Boracay",
  },
  {
    src: "https://images.unsplash.com/photo-1551524164-6cf7ab604b06?w=700&q=80",
    alt: "Philippines tropical island aerial paradise",
    label: "Philippines",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
    alt: "Tropical white sand beach crystal clear water Philippines",
    label: "Island Life",
  },
  {
    src: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=700&q=80",
    alt: "Philippines scuba diving coral reef marine sanctuary",
    label: "Diving",
  },
];

const ISLANDS: IslandZone[] = [
  {
    name: "Palawan",
    tag: "World's #1 Island",
    emoji: "🏝️",
    desc: "El Nido's iconic limestone karsts, UNESCO Puerto Princesa Underground River, and Coron's legendary dive sites and twin lagoon. Consistently the world's most awarded island.",
    bestFor: [
      "Nature & eco-tourism",
      "Diving & snorkelling",
      "Luxury FIT",
      "Photography",
    ],
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=700&q=80",
    imageAlt: "Palawan El Nido Philippines best island UNESCO limestone karsts",
  },
  {
    name: "Boracay",
    tag: "Asia's #1 Beach",
    emoji: "🌅",
    desc: "4 km of powdery white sand, calm turquoise water, world-class kite-surfing, vibrant dining and nightlife. The Philippines' most popular destination for Indian luxury FIT and honeymoon clients.",
    bestFor: [
      "Honeymoon couples",
      "Beach & pool lovers",
      "Water sports",
      "Luxury FIT",
    ],
    image:
      "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=700&q=80",
    imageAlt: "Boracay White Beach Asia best beach sunset Philippines luxury",
  },
  {
    name: "Bohol",
    tag: "Wildlife & Wonder",
    emoji: "🦎",
    desc: "Chocolate Hills geological marvel, world's smallest primate, Loboc River floating restaurant, and Balicasag Island marine sanctuary. Perfect Cebu add-on for value-conscious clients.",
    bestFor: [
      "Families & groups",
      "Wildlife lovers",
      "Budget FIT",
      "Short breaks",
    ],
    image:
      "https://images.unsplash.com/photo-1534294228306-bd54eb9a7ba8?w=700&q=80",
    imageAlt: "Bohol Chocolate Hills tarsier Philippines adventure nature",
  },
  {
    name: "Manila",
    tag: "Heritage Gateway",
    emoji: "🏙️",
    desc: "Spanish colonial Intramuros, Rizal Monument, BGC contemporary art scene, and a Tagaytay volcanic Taal Lake day trip. Essential gateway for all Philippine itineraries and a compelling standalone city break.",
    bestFor: [
      "History & culture",
      "MICE / Business",
      "City breaks",
      "Pre/post island",
    ],
    image:
      "https://images.unsplash.com/photo-1569974498991-d3d12a4d8cf5?w=700&q=80",
    imageAlt:
      "Manila Philippines Intramuros colonial heritage BGC city skyline",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "PearlDMC's Philippines team is exceptional. The 4-hour quote turnaround is real — I tested it at 9 PM and had a full Palawan quote by midnight. Best Philippines DMC I've worked with in 12 years.",
    author: "Ananya Sharma",
    agency: "Bliss Holidays",
    city: "Mumbai",
  },
  {
    quote:
      "The Boracay luxury package sold our client on first presentation — inclusions are unbeatable at that price. INR invoicing and Hindi support make PearlDMC the obvious Philippines partner.",
    author: "Vikram Patel",
    agency: "Trident Vacations",
    city: "Ahmedabad",
  },
  {
    quote:
      "40+ Philippines bookings through PearlDMC this year. Zero ops issues, lightning-fast responses, clients rate the on-ground experience 5 stars every time.",
    author: "Priyanka Nair",
    agency: "Kerala Travel Point",
    city: "Kochi",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
      {children}
    </p>
  );
}

function PackageCard({
  pkg,
  index,
  onInquire,
}: {
  pkg: Package;
  index: number;
  onInquire: (name: string, price: number) => void;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const cfg = CAT[pkg.category];

  return (
    <article className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 group">
      <div className="grid md:grid-cols-[360px_1fr]">
        {/* Image */}
        <div className="relative h-64 md:h-auto min-h-[260px] overflow-hidden">
          <Image
            src={pkg.image}
            alt={pkg.imageAlt}
            fill
            sizes="(max-width:768px) 100vw, 360px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            loading={index < 2 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-foreground/[0.04]" />

          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm bg-background/80 text-foreground">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>
          {pkg.badge && (
            <div className="absolute top-3 right-10">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
                <Award className="w-3 h-3" />
                {pkg.badge}
              </span>
            </div>
          )}
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setSaved(!saved);
            }}
            aria-label={saved ? "Remove from saved" : "Save"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all"
          >
            <Heart
              className={`w-4 h-4 ${saved ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`}
            />
          </button>
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {pkg.islands.map((island) => (
              <span
                key={island}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background/85 backdrop-blur-sm text-foreground"
              >
                {island}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-7 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl lg:text-2xl font-bold text-foreground mb-1 leading-tight">
                {pkg.name}
              </h3>
              <p className="text-xs text-accent font-semibold tracking-wide mb-2">
                {pkg.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary/60" />
                  {pkg.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  Philippines
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <strong className="text-foreground">{pkg.rating}</strong>
                  <span className="text-muted-foreground/60">
                    ({pkg.reviews})
                  </span>
                </span>
              </div>
            </div>
            <div className="shrink-0 text-right bg-muted rounded-xl px-4 py-3 border border-border/60">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-0.5">
                B2B from
              </p>
              <p className="text-2xl font-bold text-primary leading-none">
                ${pkg.price.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                per person
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {pkg.desc}
          </p>

          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Highlights
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pkg.highlights.slice(0, 4).map((h) => (
                <span
                  key={h}
                  className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground border border-border/60 hover:border-primary/30 hover:text-foreground transition-colors"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Inclusions accordion */}
          <div className="border-t border-border pt-4 mt-auto">
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="flex items-center justify-between w-full text-sm group/btn"
            >
              <span className="flex items-center gap-2 font-semibold text-foreground group-hover/btn:text-primary transition-colors">
                <CheckCircle className="w-4 h-4 text-primary/60" />
                What&apos;s Included
                <span className="text-xs font-normal text-muted-foreground">
                  ({pkg.inclusions.length} items)
                </span>
              </span>
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${expanded ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"}`}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: expanded ? "600px" : "0px",
                marginTop: expanded ? "12px" : "0px",
              }}
            >
              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 pb-1">
                {pkg.inclusions.map((inc) => (
                  <div key={inc} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      {inc}
                    </span>
                  </div>
                ))}
              </div>
              {pkg.exclusions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Not Included
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {pkg.exclusions.map((exc) => (
                      <div key={exc} className="flex items-start gap-2">
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground/50 leading-relaxed">
                          {exc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-4 border-t border-border">
            <Link
              href={`/destinations/philippines/packages/${pkg.slug}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all group/link"
            >
              Full Itinerary
              <ArrowRight className="w-3.5 h-3.5 ml-auto text-muted-foreground/40 group-hover/link:translate-x-0.5 group-hover/link:text-primary transition-all" />
            </Link>
            <button
              onClick={() => onInquire(pkg.name, pkg.price)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors group/send"
            >
              <Send className="h-4 w-4 group-hover/send:translate-x-0.5 transition-transform" />
              Get B2B Rate
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function InquiryModal({
  state,
  onClose,
}: {
  state: ModalState;
  onClose: () => void;
}) {
  const [done, setDone] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [agency, setAgency] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (state.open) setDone(false);
  }, [state.open]);

  if (!state.open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-border bg-muted/40 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-foreground">
              Request Philippines B2B Rates
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {state.packageName
                ? `Re: ${state.packageName}${state.price ? ` · From $${state.price.toLocaleString()} pp` : ""}`
                : "Philippines — General Inquiry"}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-muted hover:bg-border flex items-center justify-center text-muted-foreground transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {done ? (
          <div className="px-6 py-14 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-serif font-bold text-xl text-foreground mb-2">
              Inquiry Received!
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-1 max-w-xs mx-auto">
              Our Philippines specialist will respond within{" "}
              <strong className="text-foreground">4 business hours</strong> with
              exclusive B2B net rates.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Confirmation sent to {email}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                  Agency <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  required
                  placeholder="Sunrise Travel Pvt. Ltd."
                  className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                  Business Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="jane@agency.com"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                  WhatsApp / Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 00000"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
            {state.packageName && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/[0.06] border border-primary/15">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {state.packageName}
                  </p>
                  {state.price && (
                    <p className="text-xs text-muted-foreground">
                      B2B net rate from ${state.price.toLocaleString()} per
                      person
                    </p>
                  )}
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              Send Inquiry — Get Rates in 4 Hours
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-xs text-center text-muted-foreground">
              By submitting you agree to our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              . We never share your data.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PhilippinesPage() {
  const [modal, setModal] = useState<ModalState>({
    open: false,
    packageName: "",
    price: null,
  });
  const [filterCat, setFilterCat] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openInquiry = (packageName: string = "", price: number | null = null) =>
    setModal({ open: true, packageName, price });

  const filtered =
    filterCat === "all"
      ? PACKAGES
      : PACKAGES.filter((p) => p.category === filterCat);
  const categories = [...new Set(PACKAGES.map((p) => p.category))];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        {/* ── HERO ── */}
        <section className="relative h-[88vh] min-h-[620px] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1800&q=85"
            alt="Palawan Philippines El Nido turquoise lagoon limestone karsts — PearlDMC Philippines DMC"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-foreground/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-card/60">
                <li>
                  <Link href="/" className="hover:text-card transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3 h-3" />
                </li>
                <li>
                  <Link
                    href="/destinations"
                    className="hover:text-card transition-colors"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3 h-3" />
                </li>
                <li className="text-card font-medium">Philippines</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-accent/30 bg-accent/[0.12] text-accent backdrop-blur-sm">
                  <Globe className="h-3 w-3" />
                  Asia Pacific · Philippines DMC
                </div>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-card leading-[1.05] mb-4">
                  Philippines <span className="text-accent">DMC</span>
                  <br className="hidden md:block" />
                  &amp; B2B Packages
                </h1>
                <p className="text-card/75 text-xl leading-relaxed mb-6 max-w-2xl">
                  India&apos;s most trusted Philippines Destination Management
                  Company since 2007. Exclusive B2B net rates on Palawan,
                  Boracay, Bohol &amp; Manila — with{" "}
                  <strong className="text-card">
                    Visa on Arrival for Indian passport holders
                  </strong>{" "}
                  and quotes in 4 hours.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {(
                    [
                      { icon: Award, text: "17+ Years Philippines DMC" },
                      { icon: Globe, text: "Visa on Arrival — Indians" },
                      { icon: Clock, text: "4-Hour Quote Guarantee" },
                      { icon: Shield, text: "IATA & TAAI Accredited" },
                    ] as { icon: React.ElementType; text: string }[]
                  ).map(({ icon: Icon, text }) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-2 text-sm text-card/80 bg-card/[0.08] backdrop-blur-sm border border-card/15 rounded-full px-3 py-1.5"
                    >
                      <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
                      {text}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <span className="text-card/70 text-sm">
                    4.8 average · 790+ partner reviews ·{" "}
                    <strong className="text-card">
                      {PACKAGES.length} packages from $
                      {Math.min(
                        ...PACKAGES.map((p) => p.price),
                      ).toLocaleString()}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0 min-w-[220px]">
                <button
                  onClick={() => openInquiry()}
                  className="w-full flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-bold tracking-wide uppercase transition-all hover:-translate-y-0.5 group shadow-lg"
                >
                  Get B2B Rates Now{" "}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#packages"
                  className="w-full flex items-center justify-center h-11 px-6 rounded-xl border border-card/30 text-card hover:bg-card/10 text-sm font-medium transition-all"
                >
                  Browse All Packages
                </a>
                <Link
                  href="/brochures"
                  className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-card/20 text-card/70 hover:bg-card/10 text-xs transition-all"
                >
                  <Download className="h-3.5 w-3.5" /> Download Brochure
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUICK FACTS BAR ── */}
        <div className="bg-card border-b border-border shadow-sm sticky top-[68px] z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-border">
              {(
                [
                  { icon: Sun, label: "Best Time", value: "Nov – May" },
                  { icon: Globe, label: "Visa", value: "On Arrival 🇮🇳" },
                  { icon: Plane, label: "From Mumbai", value: "~5 hrs direct" },
                  {
                    icon: Mountain,
                    label: "Language",
                    value: "English / Filipino",
                  },
                  { icon: Clock, label: "Time Zone", value: "PHT UTC+8" },
                ] as { icon: React.ElementType; label: string; value: string }[]
              ).map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 py-3.5 px-4 md:px-5"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-xs font-bold text-foreground truncate">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WHY PHILIPPINES ── */}
        <section className="py-16 px-4 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Eyebrow>Why Philippines</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Why travel agents choose Philippines &amp; PearlDMC
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                Hassle-free visa, direct flights, world-class beaches — the
                Philippines sells itself. We just make the B2B part effortless.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(
                [
                  {
                    icon: Globe,
                    title: "Visa on Arrival",
                    stat: "0 days",
                    statLbl: "processing",
                    desc: "Indian passport holders get 30-day VOA at Manila airport — no pre-approval, no embassy visit. Easiest Southeast Asian entry.",
                  },
                  {
                    icon: Plane,
                    title: "Direct Flights Daily",
                    stat: "~5 hrs",
                    statLbl: "from Mumbai",
                    desc: "Philippine Airlines, Air India & IndiGo fly Mumbai–Manila direct. No connections, no transit.",
                  },
                  {
                    icon: Waves,
                    title: "World's Best Island",
                    stat: "#1",
                    statLbl: "Condé Nast 2024",
                    desc: "Palawan ranked #1 island globally. Boracay White Beach rated Asia's finest. Guaranteed wow-factor.",
                  },
                  {
                    icon: Fish,
                    title: "Premier Diving",
                    stat: "3",
                    statLbl: "world top-10 sites",
                    desc: "Tubbataha Reef, Apo Island, Coron wrecks — 3 of the world's top 10 dive sites. Major upsell potential.",
                  },
                ] as {
                  icon: React.ElementType;
                  title: string;
                  stat: string;
                  statLbl: string;
                  desc: string;
                }[]
              ).map(({ icon: Icon, title, stat, statLbl, desc }) => (
                <div
                  key={title}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </span>
                    <div className="text-right">
                      <p className="font-serif text-2xl font-bold text-accent">
                        {stat}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {statLbl}
                      </p>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-base text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <Eyebrow>Photo Gallery</Eyebrow>
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Philippines in Pictures
                </h2>
              </div>
              <p className="text-sm text-muted-foreground hidden md:block">
                Click any photo to enlarge
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GALLERY.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  aria-label={`View ${photo.label}`}
                  className={`relative overflow-hidden rounded-2xl group ${i === 0 ? "md:row-span-2" : ""}`}
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width:768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-card font-semibold text-sm">
                      {photo.label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4 text-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden">
              <Image
                src={GALLERY[lightbox].src.replace("w=700", "w=1400")}
                alt={GALLERY[lightbox].alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              {[
                { dir: -1, label: "Previous", cls: "left-4" },
                { dir: 1, label: "Next", cls: "right-4" },
              ].map(({ dir, label, cls }) => (
                <button
                  key={label}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setLightbox(
                      (lightbox + dir + GALLERY.length) % GALLERY.length,
                    );
                  }}
                  aria-label={label}
                  className={`absolute ${cls} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors`}
                >
                  <ChevronRight
                    className={`w-5 h-5 text-foreground ${dir === -1 ? "rotate-180" : ""}`}
                  />
                </button>
              ))}
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors text-foreground text-xl"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-card text-sm font-semibold bg-foreground/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  {GALLERY[lightbox].label}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── ISLANDS ── */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Eyebrow>Destination Zones</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Key Philippines Islands &amp; Regions
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {ISLANDS.map((island) => (
                <div
                  key={island.name}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={island.image}
                      alt={island.imageAlt}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-2">
                      <span className="text-2xl">{island.emoji}</span>
                      <span className="font-serif text-xl font-bold text-card">
                        {island.name}
                      </span>
                      <span className="text-xs text-accent font-semibold ml-1">
                        {island.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {island.desc}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Best For
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {island.bestFor.map((b) => (
                        <span
                          key={b}
                          className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground border border-border/60"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="py-16 px-4" id="packages">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <Eyebrow>B2B Tour Packages</Eyebrow>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Philippines Packages for Travel Agents
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {filtered.length} package{filtered.length !== 1 ? "s" : ""} ·
                  B2B net rates · no minimum pax
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterCat("all")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${filterCat === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/40"}`}
                >
                  All ({PACKAGES.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${filterCat === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/40"}`}
                  >
                    {CAT[cat]?.label} (
                    {PACKAGES.filter((p) => p.category === cat).length})
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              {filtered.map((pkg, i) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  index={i}
                  onInquire={openInquiry}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Eyebrow>Partner Reviews</Eyebrow>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                What travel agents say about PearlDMC Philippines
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.author}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-serif font-bold text-primary text-sm">
                        {t.author[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {t.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.agency}, {t.city}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-20 px-4 bg-primary">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5 border border-primary-foreground/15 bg-primary-foreground/[0.08] text-secondary">
              <Shield className="h-3.5 w-3.5" />
              India&apos;s #1 Philippines DMC
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-foreground mb-5">
              Ready to offer Philippines packages to your clients?
            </h2>
            <p className="text-primary-foreground/65 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
              Register as a PearlDMC partner and unlock exclusive B2B net rates
              on all Philippines packages. Approval in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openInquiry()}
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl bg-background text-foreground hover:bg-background/90 text-sm font-bold tracking-wide uppercase transition-all hover:-translate-y-0.5 group shadow-lg"
              >
                Get Philippines B2B Rates{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 text-sm font-semibold transition-all"
              >
                <Users className="h-4 w-4" />
                Register as Partner
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-primary-foreground/50">
              {[
                "No minimum volume",
                "INR invoicing available",
                "4-hour quote guarantee",
                "Dedicated account manager",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT STRIP ── */}
        <section className="py-10 px-4 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-serif font-bold text-lg text-foreground">
                PearlDMC Philippines Desk
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Mumbai HQ · Mon–Fri, 9 AM – 6 PM IST
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+912269000000"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all"
              >
                <Phone className="w-4 h-4" />
                +91 22 6900 0000
              </a>
              <a
                href="mailto:philippines@pearldmc.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all"
              >
                <Mail className="w-4 h-4" />
                philippines@pearldmc.com
              </a>
              <a
                href="https://wa.me/912269000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20bc5a] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <InquiryModal
        state={modal}
        onClose={() => setModal({ open: false, packageName: "", price: null })}
      />
    </>
  );
}
