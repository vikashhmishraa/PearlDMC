'use client';

import Link from 'next/link';
import Image from 'next/image';
import { destinations, type Destination } from '@/lib/destinations-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

interface RelatedDestinationsProps {
  currentDestinationId: string;
  currentRegion: Destination['region'];
  limit?: number;
}

export function RelatedDestinations({ 
  currentDestinationId, 
  currentRegion,
  limit = 3 
}: RelatedDestinationsProps) {
  const relatedDests = destinations
    .filter(d => d.region === currentRegion && d.id !== currentDestinationId)
    .slice(0, limit);

  if (relatedDests.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
          Explore More in {currentRegion === 'asia-pacific' ? 'Asia Pacific' : 
                          currentRegion === 'indian-ocean' ? 'Indian Ocean' :
                          currentRegion === 'africa' ? 'Africa' : 'Caribbean'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedDests.map((dest) => (
            <Link key={dest.id} href={`/destinations/${dest.id}`}>
              <div className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3" />
                    {dest.country}
                  </p>
                  <p className="text-sm text-foreground mb-4 line-clamp-2">
                    {dest.tagline}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:border-primary group-hover:text-primary"
                  >
                    Explore
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
