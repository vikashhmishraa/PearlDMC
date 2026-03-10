'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InquiryModal } from '@/components/inquiry-modal';
import { UnsplashMainImage } from '@/components/unsplash-main-image';
import { destinations, getDestinationById } from '@/lib/destinations-data';
import {
  MapPin, Calendar, Clock, DollarSign, Users, CheckCircle, X,
  ChevronDown, ChevronUp, ArrowLeft, Share2, Heart, Download
} from 'lucide-react';

interface PackagePageProps {
  params: Promise<{
    slug: string;
    packageId: string;
  }>;
}

const categoryIcons: Record<string, string> = {
  cultural: '🏛️',
  adventure: '🏔️',
  beach: '🏖️',
  luxury: '✨',
  honeymoon: '💑',
  group: '👥'
};

const categoryLabels: Record<string, string> = {
  cultural: 'Cultural',
  adventure: 'Adventure',
  beach: 'Beach & Relax',
  luxury: 'Luxury',
  honeymoon: 'Honeymoon',
  group: 'Group/Family'
};

export default function PackageDetailPage({ params }: PackagePageProps) {
  const { slug, packageId } = use(params);
  const destination = getDestinationById(slug);
  const pkg = destination?.packages.find(p => p.id === packageId);
  
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2]);

  if (!destination || !pkg) {
    return (
      <main>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Package not found</h1>
          <Link href="/destinations">
            <Button>Back to Destinations</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const toggleDay = (day: number) => {
    setExpandedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const expandAll = () => {
    setExpandedDays(pkg.itinerary.map(d => d.day));
  };

  const collapseAll = () => {
    setExpandedDays([]);
  };

  return (
    <main>
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/destinations" className="text-primary hover:underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Destinations
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/destinations/${slug}`} className="text-primary hover:underline">
              {destination.name}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{pkg.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {categoryIcons[pkg.category]} {categoryLabels[pkg.category]}
                </Badge>
                {pkg.rating && (
                  <div className="flex items-center gap-1">
                    {'⭐'.repeat(pkg.rating)}
                    <span className="text-sm text-muted-foreground">({pkg.rating}/5)</span>
                  </div>
                )}
              </div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-4">{pkg.name}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{pkg.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" title="Share">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" title="Save">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Key Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Duration</span>
              </div>
              <p className="text-lg font-bold text-foreground">{pkg.duration}</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Starting Price</span>
              </div>
              <p className="text-lg font-bold text-foreground">${pkg.startingPrice.toLocaleString()}</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Group Size</span>
              </div>
              <p className="text-lg font-bold text-foreground">2-20 Persons</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Destination</span>
              </div>
              <p className="text-lg font-bold text-foreground">{destination.name}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Highlights</h2>
              <div className="grid grid-cols-2 gap-4">
                {pkg.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Main Package Image */}
            <UnsplashMainImage
              packageName={pkg.name}
              destinationName={destination.name}
              className="w-full h-96 mb-8"
            />

            {/* Itinerary */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-foreground">Detailed Itinerary</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={expandAll}>Expand All</Button>
                  <Button variant="outline" size="sm" onClick={collapseAll}>Collapse All</Button>
                </div>
              </div>

              <div className="space-y-3">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full bg-primary/5 hover:bg-primary/10 transition-colors p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{day.title}</h3>
                          <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                        </div>
                      </div>
                      {expandedDays.includes(day.day) ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      )}
                    </button>

                    {expandedDays.includes(day.day) && (
                      <div className="bg-background p-6 border-t space-y-4">
                        <p className="text-muted-foreground">{day.description}</p>

                        {day.activities.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Activities</h4>
                            <ul className="space-y-2">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {day.meals.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Meals</h4>
                            <p className="text-muted-foreground">{day.meals.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {pkg.inclusions.map((inclusion, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Exclusions */}
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <X className="w-5 h-5 text-destructive" />
                  What's Not Included
                </h3>
                <ul className="space-y-3">
                  {pkg.exclusions.map((exclusion, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{exclusion}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-8 sticky top-4 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">${pkg.startingPrice}</span>
                  <span className="text-muted-foreground">per person</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setInquiryOpen(true)}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6"
                >
                  Send Inquiry
                </Button>
                <Button variant="outline" size="lg" className="w-full py-6">
                  Download Itinerary
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="bg-background/50 rounded p-4 text-center">
                <p className="text-sm font-semibold text-foreground mb-1">Response Guarantee</p>
                <p className="text-xs text-muted-foreground">Within 24 hours</p>
              </div>

              <div className="pt-4 border-t space-y-4">
                <div>
                  <p                     className="text-xs font-semibold text-muted-foreground uppercase mb-2">Destination</p>
                  <Link href={`/destinations/${slug}`} className="text-primary hover:underline text-sm">
                    {destination.name}
                  </Link>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Category</p>
                  <p className="text-sm text-foreground">{categoryLabels[pkg.category]}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Best For</p>
                  <p className="text-sm text-foreground">{pkg.duration}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Packages */}
        <section className="mt-16 pt-16 border-t">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Similar Packages in {destination.name}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {destination.packages
              .filter(p => p.id !== pkg.id && p.category === pkg.category)
              .slice(0, 3)
              .map(similar => (
                <Link key={similar.id} href={`/destinations/${slug}/packages/${similar.id}`}>
                  <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="bg-primary/5 p-4 h-32 flex items-center justify-center">
                      <h3 className="font-semibold text-foreground text-center">{similar.name}</h3>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">{similar.duration}</p>
                          <p className="font-bold text-primary">${similar.startingPrice}</p>
                        </div>
                        <Badge variant="secondary">{categoryLabels[similar.category]}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {similar.highlights.length} highlights
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>

      <Footer />

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        destinationName={destination.name}
        packageName={pkg.name}
        packagePrice={pkg.startingPrice}
      />
    </main>
  );
}
