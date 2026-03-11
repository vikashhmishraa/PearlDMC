"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  Globe,
  Users,
  Plane,
  Star,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InquiryModal } from "@/components/inquiry-modal";
import { RelatedDestinations } from "@/components/related-destinations";
import { getDestinationById, type TourPackage } from "@/lib/destinations-data";

const categoryLabels: Record<string, { label: string; color: string }> = {
  cultural: { label: "Cultural", color: "bg-blue-100 text-blue-700" },
  adventure: { label: "Adventure", color: "bg-orange-100 text-orange-700" },
  beach: { label: "Beach & Relax", color: "bg-cyan-100 text-cyan-700" },
  luxury: { label: "Luxury", color: "bg-amber-100 text-amber-700" },
  honeymoon: { label: "Honeymoon", color: "bg-pink-100 text-pink-700" },
  group: { label: "Group/Family", color: "bg-green-100 text-green-700" },
};

function PackageCard({
  pkg,
  destinationName,
  onInquiry,
  destinationSlug,
}: {
  pkg: TourPackage;
  destinationName: string;
  destinationSlug: string;
  onInquiry: (pkgName: string, price: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const category = categoryLabels[pkg.category];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="grid md:grid-cols-[280px_1fr]">
        {/* Image */}
        <div className="relative h-48 md:h-full min-h-[200px]">
          <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
          <div className="absolute top-3 left-3">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${category.color}`}
            >
              {category.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                {pkg.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {pkg.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {destinationName}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold text-primary">
                ${pkg.startingPrice.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground mb-2">
              Tour Highlights:
            </p>
            <div className="flex flex-wrap gap-2">
              {pkg.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Expandable Inclusions */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-between w-full text-sm text-foreground hover:text-primary transition-colors"
            >
              <span className="font-medium">Package Inclusions</span>
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expanded && (
              <ul className="mt-3 space-y-2">
                {pkg.inclusions.map((inclusion) => (
                  <li
                    key={inclusion}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    {inclusion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-4 border-t border-border">
            <Link
              href={`/destinations/${destinationSlug}/packages/${pkg.id}`}
              className="flex-1"
            >
              <Button variant="outline" className="w-full">
                View Full Details
              </Button>
            </Link>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onInquiry(pkg.name, pkg.startingPrice)}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const destination = getDestinationById(slug);

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  if (!destination) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Destination Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The destination you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/destinations">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Destinations
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleInquiry = (pkgName: string, price: number) => {
    setSelectedPackage({ name: pkgName, price });
    setInquiryOpen(true);
  };

  const handleGeneralInquiry = () => {
    setSelectedPackage(null);
    setInquiryOpen(true);
  };

  const categories = [...new Set(destination.packages.map((p) => p.category))];
  const filteredPackages = filterCategory
    ? destination.packages.filter((p) => p.category === filterCategory)
    : destination.packages;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Breadcrumb */}
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-background/80 hover:text-background text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Destinations
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <Badge className="bg-accent text-accent-foreground mb-3">
                <Globe className="h-3 w-3 mr-1" />
                {destination.region === "asia-pacific"
                  ? "Asia Pacific"
                  : destination.region === "indian-ocean"
                    ? "Indian Ocean"
                    : destination.region === "africa"
                      ? "Africa"
                      : "Caribbean"}
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-2">
                {destination.name}
              </h1>
              <p className="flex items-center gap-2 text-background/80 text-lg">
                <MapPin className="h-5 w-5" />
                {destination.country}
              </p>
              <p className="text-accent font-medium text-xl mt-2">
                {destination.tagline}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleGeneralInquiry}
              >
                Get B2B Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-transparent hover:border-white hover:text-white transition"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Best Time to Visit
                </p>
                <p className="text-sm font-medium text-foreground">
                  {destination.bestTimeToVisit}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Currency</p>
                <p className="text-sm font-medium text-foreground">
                  {destination.currency}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Language</p>
                <p className="text-sm font-medium text-foreground">
                  {destination.language}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Timezone</p>
                <p className="text-sm font-medium text-foreground">
                  {destination.timezone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Highlights */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                About {destination.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {destination.description}
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-muted-foreground">
                  Highly rated destination by our partners
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Destination Highlights
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {destination.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-2 bg-card rounded-lg px-3 py-2 border border-border"
                  >
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-16" id="packages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                Tour Packages
              </h2>
              <p className="text-muted-foreground">
                {destination.packages.length} packages available for{" "}
                {destination.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/destinations/${slug}/packages`}>
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  View All Packages
                </Button>
              </Link>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(null)}
                  className={
                    filterCategory === null
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  All ({destination.packages.length})
                </Button>
                {categories.map((cat) => {
                  const catInfo = categoryLabels[cat];
                  const count = destination.packages.filter(
                    (p) => p.category === cat,
                  ).length;
                  return (
                    <Button
                      key={cat}
                      variant={filterCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory(cat)}
                      className={
                        filterCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      {catInfo.label} ({count})
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                destinationName={destination.name}
                destinationSlug={slug}
                onInquiry={handleInquiry}
              />
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No packages found for this category.
              </p>
              <Button
                variant="link"
                onClick={() => setFilterCategory(null)}
                className="mt-2"
              >
                View all packages
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary-foreground" />
            <Plane className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Don't see exactly what you need? Our team specializes in creating
            tailor-made itineraries for {destination.name}. From FIT to large
            groups, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
              onClick={handleGeneralInquiry}
            >
              Request Custom Itinerary
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-white"
            >
              Contact Our {destination.name} Team
            </Button>
          </div>
        </div>
      </section>

      {/* Other Destinations */}
      <RelatedDestinations
        currentDestinationId={destination.id}
        currentRegion={destination.region}
        limit={3}
      />

      <Footer />

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        destinationName={destination.name}
        packageName={selectedPackage?.name}
        packagePrice={selectedPackage?.price}
      />
    </main>
  );
}
